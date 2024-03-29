// Send Post request

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contact_form");
    const sendButton = document.getElementById("send_message");
    const nameInput = document.getElementById("nme");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    // Regex pattern for name and email validation
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    sendButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default form submission

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!form.checkValidity()) {
            // If the form is not valid, let the browser handle the validation messages
            form.reportValidity();
            return;
        }

        // Validate name and email using regex patterns
        if (!emailPattern.test(email)) {
            alert("Invalid Email!");
            emailInput.focus();
            return;
        }

        // Submit the form
        fetch("/contact_form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message,
            }),
        })
            .then(function (response) {
                if (!(response.status == 429)) {
                    console.log("Success!");
                    displayImage();
                }
            })
            .catch(function (error) {
                console.log("Error!");
            });
    });



});



const tickMark = document.getElementById('tick');
const displayImage = () => {

    tickMark.classList.add('visible');
    setTimeout(hideImage, 3000);
};
const hideImage =() => (tickMark.classList.remove('visible'));