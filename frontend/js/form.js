  const form = document.getElementById('updateForm');
  const message = document.getElementById('message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      
    const res = await fetch('/api/updates', {
      method: 'POST',
      body: formData
      });

      const result = await res.json();

      if (res.ok) {
        message.textContent = result.message;
        message.classList.remove('text-danger');
        message.classList.add('text-success');
  form.reset();
      } else {
        message.textContent = result.error || 'Failed to submit update';
        message.classList.remove('text-success');
        message.classList.add('text-danger');
      }
    } catch (err) {
      console.error("Network error:", err);
      message.textContent = 'Network error. Check console.';
      message.classList.remove('text-success');
      message.classList.add('text-danger');
    }
  });