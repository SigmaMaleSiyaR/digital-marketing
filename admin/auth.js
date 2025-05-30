import { checkAuth, auth } from './firebase-config.js';
import { signOut } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

// Check authentication status
const checkAuthentication = async () => {
    try {
        await checkAuth();
    } catch (error) {
        // Redirect to login page if not authenticated
        window.location.href = 'login.html';
    }
};

// Logout function
const logout = async () => {
    try {
        await signOut(auth);
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Error signing out:', error);
    }
};

// Add logout button to the page
const addLogoutButton = () => {
    const header = document.querySelector('header');
    if (header) {
        const logoutBtn = document.createElement('button');
        logoutBtn.textContent = 'Logout';
        logoutBtn.style.cssText = `
            padding: 8px 16px;
            background: #dc3545;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-left: auto;
        `;
        logoutBtn.addEventListener('click', logout);
        header.appendChild(logoutBtn);
    }
};

// Initialize authentication check
document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
    addLogoutButton();
}); 