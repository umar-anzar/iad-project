document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact_form');
    const sendButton = document.getElementById('send_message');
    const nameInput = document.getElementById('nme');
    const emailInput = document.getElementById('email');
  
    // Regex pattern for name and email validation
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  
    sendButton.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent the default form submission
  
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
  
      // Validate name and email using regex patterns
      if (!emailPattern.test(email)) {
        alert('Invalid Email!');
      } else {
        // Submit the form
        form.submit();
      }
    });
});
  