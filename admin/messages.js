import { db } from './firebase-config.js';
import { collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

// Function to format date
function formatDate(timestamp) {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Function to create message card
function createMessageCard(message) {
    return `
        <div class="card mb-3">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <h5 class="card-title">${message.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${message.email}</h6>
                    </div>
                    <small class="text-muted">${formatDate(message.timestamp)}</small>
                </div>
                <h6 class="mt-3">Subject: ${message.subject}</h6>
                <p class="card-text mt-2">${message.message}</p>
                <button class="btn btn-danger btn-sm" onclick="deleteMessage('${message.id}')">
                    Delete Message
                </button>
            </div>
        </div>
    `;
}

// Function to delete message
window.deleteMessage = async function(messageId) {
    if (confirm('Are you sure you want to delete this message?')) {
        try {
            await deleteDoc(doc(db, "contacts", messageId));
            loadMessages(); // Reload messages after deletion
        } catch (error) {
            console.error("Error deleting message:", error);
            alert("Error deleting message. Please try again.");
        }
    }
};

// Load and display messages
async function loadMessages() {
    try {
        const messagesList = document.getElementById('messagesList');
        const messagesSnapshot = await getDocs(collection(db, "contacts"));

        if (messagesSnapshot.empty) {
            messagesList.innerHTML = '<div class="alert alert-info">No messages found.</div>';
            return;
        }

        const messageCards = messagesSnapshot.docs.map(doc => {
            const message = { id: doc.id, ...doc.data() };
            return createMessageCard(message);
        });

        messagesList.innerHTML = messageCards.join('');
    } catch (error) {
        console.error("Error loading messages:", error);
        document.getElementById('messagesList').innerHTML = 
            '<div class="alert alert-danger">Error loading messages. Please try again later.</div>';
    }
}

// Load messages when page loads
document.addEventListener('DOMContentLoaded', loadMessages); 