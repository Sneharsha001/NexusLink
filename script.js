document.addEventListener('DOMContentLoaded', function() {
    // Trading Chart
    const initTradingChart = () => {
        const ctx = document.getElementById('tradingChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Market Trend',
                    data: [65, 59, 80, 81, 56, 55],
                    borderColor: '#2563eb',
                    tension: 0.4,
                    borderWidth: 2,
                    pointBackgroundColor: '#2563eb'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    };

    // Initialize Trading Chart
    initTradingChart();

    // AI Chat Interface
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendMessage');

    const addMessage = (message, isUser = false) => {
        if (!chatMessages) return; // Safety check
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.style.padding = '0.5rem 1rem';
        messageDiv.style.margin = '0.5rem 0';
        messageDiv.style.borderRadius = '0.5rem';
        messageDiv.style.backgroundColor = isUser ? '#2563eb' : '#e2e8f0';
        messageDiv.style.color = isUser ? 'white' : 'black';
        messageDiv.style.alignSelf = isUser ? 'flex-end' : 'flex-start';
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const handleUserMessage = () => {
        if (!userInput) return; // Safety check
        
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';

            // Simulate AI response
            setTimeout(() => {
                addMessage('I understand your message. How can I help you further?');
            }, 1000);
        }
    };

    if (sendButton && userInput) {
        sendButton.addEventListener('click', handleUserMessage);
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleUserMessage();
        });
    }

    // 3D Animation
    const heroCube = document.querySelector('.hero-cube');
    if (heroCube) {
        let rotation = 0;
        const animateCube = () => {
            rotation += 0.5;
            heroCube.style.transform = `rotate3d(1, 1, 1, ${rotation}deg)`;
            requestAnimationFrame(animateCube);
        };
        animateCube();
    }

    // Add initial AI message if chat exists
    if (chatMessages) {
        addMessage('Hello! How can I assist you today?');
    }

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Interactive book effects
    document.querySelectorAll('.book').forEach(book => {
        const cover = book.querySelector('.book-cover');
        if (!cover) return;
        
        book.addEventListener('mousemove', (e) => {
            const rect = book.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateY = ((x / rect.width) - 0.5) * 30;
            const rotateX = ((y / rect.height) - 0.5) * -30;

            cover.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        });

        book.addEventListener('mouseleave', () => {
            cover.style.transform = 'rotateY(0) rotateX(0)';
        });
    });
});