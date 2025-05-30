// // Import necessary Firebase modules
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
// import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDd8uW-Ha1piTSR8o7gqBDsUlNe94aj0lI",
    authDomain: "unimentsolutionllp.firebaseapp.com",
    projectId: "unimentsolutionllp",
    storageBucket: "unimentsolutionllp.appspot.com",
    messagingSenderId: "441240718537",
    appId: "1:441240718537:web:8c47f31208fa6bc29cd118",
    measurementId: "G-JGB5E86ZY8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Event listener for form submission
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const name = form.querySelector('input[placeholder="Your Name"]').value;
        const email = form.querySelector('input[placeholder="Your Email"]').value;
        const subject = form.querySelector('input[placeholder="Subject"]').value;
        const message = form.querySelector('textarea[placeholder="Message"]').value;

        console.log("Form submitted with the following data:");
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Subject:", subject);
        console.log("Message:", message);

        try {
            // Add a new document with a generated ID
            const docRef = await addDoc(collection(db, "contacts"), {
                name: name,
                email: email,
                subject: subject,
                message: message,
                timestamp: new Date()
            });

            console.log("Document written with ID: ", docRef.id);
            alert("Message sent successfully!");
            form.reset(); // Reset the form
        } catch (e) {
            console.error("Error adding document: ", e);
            alert("Error sending message. Please try again.");
        }
    });
});
