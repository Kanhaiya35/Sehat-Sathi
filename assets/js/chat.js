/**
 * Chatbot Functionality
 * REAL n8n API integration and UI interactions
 */

// ⚠️ IMPORTANT: REPLACE THIS PLACEHOLDER URL ⚠️
// Use the "Test Webhook URL" from your n8n workflow, which includes '/webhook-test/'
const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/669c63ae-9c47-4bf6-8c03-e429ff731348'; 

let chatMessages = [];
let isTyping = false;

// Initialize chat on page load
document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const chatMessagesContainer = document.getElementById('chatMessages');
    
    // Add welcome message
    if (chatMessagesContainer && chatMessages.length === 0) {
        addBotMessage("Hello! I'm Sehat Saathi, your digital health companion. How can I help you today? You can ask me about symptoms, vaccinations, preventive care, or health schemes.");
    }
    
    // Send message on button click
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }
    
    // Send message on Enter key
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
});

/**
 * Send user message
 */
async function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput?.value.trim();
    
    if (!message || isTyping) return;
    
    // 1. Add user message and clear input
    addUserMessage(message);
    chatInput.value = '';
    
    // 2. Show typing indicator
    showTypingIndicator();
    
    try {
        // 3. Call the new function to fetch reply from n8n
        const botReply = await fetchN8nReply(message);
        
        // 4. Add bot reply
        addBotMessage(botReply);
        
    } catch (error) {
        console.error("n8n API call failed:", error);
        addBotMessage("Sorry, I could not connect to my AI brain. Please check your n8n instance and the webhook URL.");
    } finally {
        // 5. Hide typing indicator regardless of success or failure
        hideTypingIndicator();
    }
}

/**
 * ⚡️ CORE CHANGE: Fetch bot reply from n8n
 */
async function fetchN8nReply(userMessage) {
    // The payload uses 'chatInput' to allow your n8n Main Routing Agent to process it
    const payload = {
        chatInput: userMessage
    };

    const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // IMPORTANT for localhost/CORS issues: 
            // n8n should handle CORS with the HTTP Response node, 
            // but this header helps ensure the browser knows what to send.
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Assuming your n8n workflow ends with an HTTP Response node 
    // that returns the final chat reply as plain text or a simple JSON object like:
    // { "reply": "Your response here" }
    
   const text = await response.text();

try {
    const json = JSON.parse(text);

    // If it's a normal { reply: "text" }
    if (typeof json.reply === "string") {
        return json.reply;
    }

    // If the output is something like:
    // { "Hi there": [ { "output": "Hi there" } ] }
    const firstKey = Object.keys(json)[0];
    const firstValue = json[firstKey];

    if (Array.isArray(firstValue) && firstValue[0]?.output) {
        return firstValue[0].output;
    }

    // If it's any other structure, try flattening it
    if (typeof json === "object") {
        return Object.values(json).join("\n");
    }

    // Default fallback
    return text;

} catch {
    // Plain text fallback
    return text;
}


}


/**
 * Add user message to chat
 * (No changes below, standard UI logic)
 */
function addUserMessage(message) {
    const chatMessagesContainer = document.getElementById('chatMessages');
    if (!chatMessagesContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'flex justify-end mb-4 fade-in';
    messageDiv.innerHTML = `
        <div class="max-w-xs md:max-w-md lg:max-w-lg">
            <div class="bg-blue-600 dark:bg-blue-700 text-white rounded-2xl rounded-tr-none px-4 py-3 shadow-md">
                <p class="text-sm md:text-base">${escapeHtml(message)}</p>
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-400 mt-1 block text-right">Just now</span>
        </div>
    `;
    
    chatMessagesContainer.appendChild(messageDiv);
    scrollToBottom();
    chatMessages.push({ type: 'user', message });
}

/**
 * Add bot message to chat
 */
function addBotMessage(message) {
    const chatMessagesContainer = document.getElementById('chatMessages');
    if (!chatMessagesContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'flex justify-start mb-4 fade-in';
    messageDiv.innerHTML = `
        <div class="flex items-start space-x-3 max-w-xs md:max-w-md lg:max-w-lg">
            <div class="w-10 h-10 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="fas fa-robot text-white"></i>
            </div>
            <div class="flex-1">
                <div class="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-md">
                    <p class="text-sm md:text-base"><strong>Sehat Saathi:</strong> ${escapeHtml(message)}</p>
                </div>
                <span class="text-xs text-gray-500 dark:text-gray-400 mt-1 block ml-2">Just now</span>
            </div>
        </div>
    `;
    
    chatMessagesContainer.appendChild(messageDiv);
    scrollToBottom();
    chatMessages.push({ type: 'bot', message });
}

/**
 * Show typing indicator
 */
function showTypingIndicator() {
    const chatMessagesContainer = document.getElementById('chatMessages');
    if (!chatMessagesContainer) return;
    
    isTyping = true;
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typingIndicator';
    typingDiv.className = 'flex justify-start mb-4';
    typingDiv.innerHTML = `
        <div class="flex items-start space-x-3">
            <div class="w-10 h-10 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="fas fa-robot text-white"></i>
            </div>
            <div class="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-none px-4 py-3">
                <div class="flex space-x-1">
                    <span class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0s"></span>
                    <span class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
                    <span class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.4s"></span>
                </div>
            </div>
        </div>
    `;
    
    chatMessagesContainer.appendChild(typingDiv);
    scrollToBottom();
}

/**
 * Hide typing indicator
 */
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
    isTyping = false;
}

/**
 * Scroll chat to bottom
 */
function scrollToBottom() {
    const chatMessagesContainer = document.getElementById('chatMessages');
    if (chatMessagesContainer) {
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// NOTE: The mock function getBotReply has been removed.