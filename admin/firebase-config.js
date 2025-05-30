// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

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
const analytics = getAnalytics(app);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

// Authentication check function
const checkAuth = () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve(user);
            } else {
                reject(new Error('Not authenticated'));
            }
        });
    });
};

// Export the initialized services
export { db, auth, checkAuth };
