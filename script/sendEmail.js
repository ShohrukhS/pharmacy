emailjs.init("v-ZorPCycofbecZIm"); // Replace with your EmailJS User ID

const sendBtn = document.querySelector('#submit-appoint');
const message = document.querySelector('#message');

//for scrolling purposes
let menu = document.getElementById('menu-btn');
let navbar = document.querySelector('.navbar');

sendBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sendEmail()
});

function sendEmail() {
    // Get the form data
    const name = document.getElementById("name-appoint").value;
    const email = document.getElementById("email-appoint").value;
    const textArea = document.getElementById("textArea").value;
    

    // Send the email using EmailJS
    emailjs.send("service_xxyuska", "template_9g4pc47", {
        firstName: name,
        to_email: email,
        subject: textArea,
        message: message
    })
        .then(function () {
            message.innerHTML = "Email sent successfully!";
            message.style.opacity = 1;
          
        }, function (error) {
            message.innerHTML = "Email sending failed!";
            message.style.opacity = 1;
        });
}

menu.onclick = () => {
  menu.classList.toggle('fa-times')
  navbar.classList.toggle('active')
}

window.onscroll = () => {
  menu.classList.remove('fa-times')
  navbar.classList.remove('active')
}