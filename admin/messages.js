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

// Function to create message table
function createMessageTable(messages) {
    return `
        <div class="card">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Subject</th>
                                <th>Message</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${messages.map(message => `
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <div class="avatar-circle bg-primary text-white me-2">
                                                ${message.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>${message.name}</div>
                                        </div>
                                    </td>
                                    <td>${message.email}</td>
                                    <td>${message.subject}</td>
                                    <td>${message.message}</td>
                                    <td>${formatDate(message.timestamp)}</td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-danger" 
                                                onclick="deleteMessage('${message.id}')">
                                            <i class="fas fa-trash"></i> Delete
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
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

        const messages = messagesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        messagesList.innerHTML = createMessageTable(messages);
    } catch (error) {
        console.error("Error loading messages:", error);
        document.getElementById('messagesList').innerHTML = 
            '<div class="alert alert-danger">Error loading messages. Please try again later.</div>';
    }
}

// Load messages when page loads
document.addEventListener('DOMContentLoaded', loadMessages); 