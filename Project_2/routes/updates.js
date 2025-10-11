import express from "express";

const updates = [
  {
    _id: "1",
    title: "Purchase of our camera",
    gist: "We got our camera!",
    summary: `Thanks to your initial fundings, we were able to purchase the
              camera that we need to make our dream production possible, a Sony
              PXW-Z200, capable of shooting in 4k.`,
    image: "/Images/film-camera.jpg",
    modal_image: "/Images/camera-modal.jpg",
  },
  {
    _id: "2",
    title: "Finalized the set location",
    gist: "Set location is ready!",
    summary: `Principle photography concluded on our final location, this
              beutiful landscape that will provide the perfect backdrop and
              lightning for our climax.`,
    image: "/Images/scenary.jpg",
    modal_image: "/Images/scenary.jpg",
  },
  {
    _id: "3",
    title: "Full crew assembled",
    gist: "Full crew is ready!",
    summary: `Meet our entire crew! These are the people that have committed
            themselves, their time and their knowledge to make our dream
              project come to reality! Everyone is excited for the future, and
              very thankful to the continued support from all your pledges!`,
    image: "/Images/crew.jpg",
    modal_image: "/Images/crew.jpg",
  },
];

const router = express.Router();

router.get("/updates", (req, res) => {
  console.log("Received request from /api/listings");
  res.json({
    updates,
  });
});

export default router;
