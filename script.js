// Script for form submission alert
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Collect form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Simple form validation
    if (name === "" || email === "" || message === "") {
        alert("Please fill out all fields.");
        return;
    }

    // Show success message
    alert(`Thank you for reaching out, ${name}! We will get back to you at ${email} soon.`);

    // Reset form fields
    document.getElementById("contactForm").reset();
});

// Testimonial carousel autoplay
const carouselElement = document.querySelector('#testimonialCarousel');
const carousel = new bootstrap.Carousel(carouselElement, {
    interval: 5000,  // 5 seconds interval
    ride: 'carousel'
});
