// Enhanced EduBot with Backend Integration
class EnhancedEduBot {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.conversationHistory = [];
        this.conversationId = this.generateConversationId();
        this.apiBaseUrl = window.location.origin;
    }

    // Generate unique conversation ID
    generateConversationId() {
        return 'conv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Process user message with backend API
    async processMessage(userMessage) {
        this.conversationHistory.push({ role: 'user', content: userMessage });
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            // Send request to backend
            const response = await fetch(`${this.apiBaseUrl}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage,
                    conversationId: this.conversationId,
                    timestamp: Date.now()
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Hide typing indicator
            this.hideTypingIndicator();
            
            // Add bot response to conversation
            this.conversationHistory.push({ role: 'bot', content: data.response });
            
            // Display response with enhanced features
            this.displayEnhancedMessage(data);
            
        } catch (error) {
            console.error('Error processing message:', error);
            
            // Hide typing indicator
            this.hideTypingIndicator();
            
            // Fallback to local processing
            const fallbackResponse = this.fallbackResponse(userMessage);
            this.conversationHistory.push({ role: 'bot', content: fallbackResponse });
            this.displayMessage(fallbackResponse, 'bot');
        }
        
        // Scroll to bottom
        this.scrollToBottom();
    }

    // Enhanced message display with suggestions and metadata
    displayEnhancedMessage(data) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = '<i class="fas fa-robot"></i>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const text = document.createElement('div');
        text.className = 'message-text';
        text.innerHTML = this.formatMessage(data.response);
        
        content.appendChild(text);
        
        // Add suggestions if available
        if (data.suggestions && data.suggestions.length > 0) {
            const suggestionsDiv = document.createElement('div');
            suggestionsDiv.className = 'suggestions';
            suggestionsDiv.innerHTML = '<div class="suggestions-label">Related topics:</div>';
            
            const suggestionsContainer = document.createElement('div');
            suggestionsContainer.className = 'suggestion-buttons';
            
            data.suggestions.forEach(suggestion => {
                const button = document.createElement('button');
                button.className = 'suggestion-btn';
                button.textContent = suggestion.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                button.onclick = () => this.sendQuickMessage(suggestion);
                suggestionsContainer.appendChild(button);
            });
            
            suggestionsDiv.appendChild(suggestionsContainer);
            content.appendChild(suggestionsDiv);
        }
        
        // Add confidence indicator
        if (data.confidence) {
            const confidenceDiv = document.createElement('div');
            confidenceDiv.className = 'confidence-indicator';
            confidenceDiv.innerHTML = `<i class="fas fa-check-circle"></i> Confidence: ${Math.round(data.confidence * 100)}%`;
            content.appendChild(confidenceDiv);
        }
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        this.chatMessages.appendChild(messageDiv);
    }

    // Fallback response for offline mode
    fallbackResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Simple keyword matching for offline mode
        if (message.includes('admission') || message.includes('requirements')) {
            return `Vel Tech (Chennai) admissions:
• UG Engineering: 60% in 10+2 (PCM). Accepted exams: VTUEEE / JEE Main / TNEA (as applicable)
• PG: 50%-60% in relevant UG; GATE for M.Tech; CAT/MAT/XAT for MBA (as applicable)
• Documents: Marksheets, ID, photos; international: IELTS 6.0+ or TOEFL iBT 80+
• Application: Online/Offline, fee INR 950 (UG)

For program-specific criteria, contact admissions@veltech.edu.in`;
        }
        
        if (message.includes('application') || message.includes('apply')) {
            return `Vel Tech (Chennai) application process:
1) Research programs (B.Tech, MBA, M.Tech, etc.) and eligibility
2) Prepare documents and entrance scores (if applicable)
3) Apply Online/Offline, pay fee (UG: INR 950)
4) Shortlisting/counseling; interviews if required
5) Fee payment, document verification, orientation`;
        }
        
        if (message.includes('cost') || message.includes('tuition') || message.includes('money')) {
            return `Vel Tech (Chennai) indicative fees:
• B.Tech CSE: INR 1,85,000 – 2,25,000 / year; ECE: INR 1,65,000 – 2,05,000
• MBA: INR 2,50,000 / year; M.Tech: INR 1,50,000 / year
• Hostel: INR 85,000 – 1,10,000 / year; Mess: INR 45,000 – 60,000 / year
Scholarships: VTUEEE rank-based, merit (10+2), JEE percentile waivers`;
        }
        
        return `I'm currently offline but can share basics for Vel Tech (Chennai).
For details:
• Website: https://www.veltech.edu.in
• Admissions: admissions@veltech.edu.in, +91-44-2684 1605
I'll be back online shortly!`;
    }

    // Display message in chat (basic version)
    displayMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const text = document.createElement('div');
        text.className = 'message-text';
        text.innerHTML = this.formatMessage(message);
        
        content.appendChild(text);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        this.chatMessages.appendChild(messageDiv);
    }

    // Format message with proper line breaks and styling
    formatMessage(message) {
        return message
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/•/g, '&bull;');
    }

    // Show typing indicator
    showTypingIndicator() {
        this.typingIndicator.style.display = 'flex';
        this.scrollToBottom();
    }

    // Hide typing indicator
    hideTypingIndicator() {
        this.typingIndicator.style.display = 'none';
    }

    // Scroll chat to bottom
    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 100);
    }

    // Clear chat history
    clearChat() {
        this.chatMessages.innerHTML = `
            <div class="message bot-message">
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <div class="message-text">
                        Hello! I'm EduBot · Vel Tech Chennai. I can help with admissions, fees, scholarships, programs, and campus facilities.
                        How can I help you today? You can ask me about:
                    </div>
                    <div class="quick-options">
                        <button class="quick-btn" onclick="sendQuickMessage('admission requirements')">Admission Requirements</button>
                        <button class="quick-btn" onclick="sendQuickMessage('campus facilities')">Campus Facilities</button>
                        <button class="quick-btn" onclick="sendQuickMessage('application process')">Application Process</button>
                        <button class="quick-btn" onclick="sendQuickMessage('scholarships')">Scholarships</button>
                    </div>
                </div>
            </div>
        `;
        this.conversationHistory = [];
        this.conversationId = this.generateConversationId();
    }

    // Load available topics from API
    async loadTopics() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/api/topics`);
            if (response.ok) {
                const data = await response.json();
                this.updateSidebarTopics(data.topics);
            }
        } catch (error) {
            console.log('Could not load topics from API, using default topics');
        }
    }

    // Update sidebar with topics from API
    updateSidebarTopics(topics) {
        const topicList = document.querySelector('.topic-list');
        if (topicList && topics) {
            topicList.innerHTML = topics.map(topic => `
                <li onclick="sendQuickMessage('${topic.id}')">
                    <i class="fas fa-clipboard-list"></i>
                    ${topic.title}
                </li>
            `).join('');
        }
    }
}

// Optional client-side helper (index.html contains inline client too).
// This file can be referenced by index.html if you prefer externalizing the script.

async function processMessageToServer(text) {
  if (!text || !text.trim()) return null;
  try {
    const resp = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    });
    if (!resp.ok) throw new Error('Network response was not ok');
    return await resp.json();
  } catch (err) {
    return { reply: 'Error contacting server: ' + err.message, confidence: 0 };
  }
}

// Initialize enhanced chatbot
const edubot = new EnhancedEduBot();

// Global functions for HTML interactions
function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message) {
        edubot.displayMessage(message, 'user');
        edubot.processMessage(message);
        input.value = '';
    }
}

function sendQuickMessage(message) {
    edubot.displayMessage(message, 'user');
    edubot.processMessage(message);
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function clearChat() {
    edubot.clearChat();
}

// Initialize chat on page load
document.addEventListener('DOMContentLoaded', function() {
    edubot.scrollToBottom();
    edubot.loadTopics();
    
    // Add some CSS for new features
    const style = document.createElement('style');
    style.textContent = `
        .suggestions {
            margin-top: 15px;
            padding: 10px;
            background: rgba(102, 126, 234, 0.05);
            border-radius: 10px;
        }
        
        .suggestions-label {
            font-size: 0.85rem;
            color: #666;
            margin-bottom: 8px;
            font-weight: 500;
        }
        
        .suggestion-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .suggestion-btn {
            background: rgba(102, 126, 234, 0.1);
            border: 1px solid rgba(102, 126, 234, 0.3);
            color: #667eea;
            padding: 6px 12px;
            border-radius: 15px;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .suggestion-btn:hover {
            background: #667eea;
            color: white;
            transform: translateY(-1px);
        }
        
        .confidence-indicator {
            margin-top: 10px;
            font-size: 0.8rem;
            color: #28a745;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .confidence-indicator i {
            font-size: 0.9rem;
        }
    `;
    document.head.appendChild(style);
});
