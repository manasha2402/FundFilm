import express from "express";
import myMongoDB from "../db/myMongoDB.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

router.get("/updates", async (req, res) => {
  console.log("Received request from /api/listings");

  try {
    const updates = await myMongoDB().getUpdates();
    res.json({
      updates,
    });
  } catch (err) {
    console.error("Error in /api/updates:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post(
  "/updates",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "modal_image", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const updateData = {
        title: req.body.title,
        gist: req.body.gist,
        summary: req.body.summary,
        image: req.files?.image?.[0]?.filename
          ? `/uploads/${req.files.image[0].filename}`
          : "",
        modal_image: req.files?.modal_image?.[0]?.filename
          ? `/uploads/${req.files.modal_image[0].filename}`
          : "",
        createdAt: new Date(),
      };

      const db = myMongoDB();
      const result = await db.addUpdate(updateData);

      res
        .status(201)
        .json({ message: "Update added successfully", id: result.insertedId });
    } catch (err) {
      console.error("Error adding update with files:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.delete("/updates/:id", async (req, res) => {
  try {
    const adminKey = req.query.admin;
    if (adminKey !== "theSuperSecretAdminKey") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const { id } = req.params;

    const db = myMongoDB();
    const result = await db.deleteUpdate(id);

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Update not found" });
    }

    if (update?.image) {
      const imagePath = path.join("uploads", path.basename(update.image));
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image file:", err);
        } 
        
      });
    }
    if (update?.modal_image) {
      const modalImagePath = path.join(
        "uploads",
        path.basename(update.modal_image)
      );
      fs.unlink(modalImagePath, (err) => {
        if (err) {
          console.error("Error deleting modal image file:", err);
        }
      });
    }

    res.json({ message: "Update deleted successfully" });
  } catch (err) {
    console.error("Error deleting update:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
