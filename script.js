// Okot Family Website - Interactive JavaScript
// Version 1.0

// ============================================
// 1. PAGE LOAD ANIMATIONS & INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Okot Family Website Loaded');
    
    // Initialize all components
    initializeSmoothScroll();
    initializeMobileMenu();
    initializeScrollReveal();
    initializeFamilyTreeInteractions();
    initializeNewsletterSignup();
    initializeBackToTop();
    initializeFamilyMemberSearch();
    initializePhotoGalleryLightbox();
    initializeEventCountdown();
    initializeFamilyQuiz();
    initializeQuoteRotator();
    
    // Add current year to footer
    document.getElementById('current-year').innerHTML = new Date().getFullYear();
});

// ============================================
// 2. SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// 3. MOBILE MENU TOGGLE (for responsive design)
// ============================================
function initializeMobileMenu() {
    // Create mobile menu button if it doesn't exist
    if (!document.querySelector('.mobile-menu-btn')) {
        const nav = document.querySelector('.main-nav');
        const header = document.querySelector('.main-header .container');
        
        if (nav && window.innerWidth <= 768) {
            const menuBtn = document.createElement('div');
            menuBtn.className = 'mobile-menu-btn';
            menuBtn.innerHTML = '☰';
            menuBtn.style.cssText = `
                font-size: 2rem;
                cursor: pointer;
                display: block;
                color: white;
            `;
            
            menuBtn.addEventListener('click', function() {
                nav.classList.toggle('mobile-open');
                if (nav.classList.contains('mobile-open')) {
                    nav.style.display = 'block';
                    menuBtn.innerHTML = '✕';
                } else {
                    nav.style.display = 'none';
                    menuBtn.innerHTML = '☰';
                }
            });
            
            header.insertBefore(menuBtn, nav);
            nav.style.display = 'none';
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const nav = document.querySelector('.main-nav');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        if (window.innerWidth > 768) {
            if (nav) nav.style.display = 'flex';
            if (menuBtn) menuBtn.style.display = 'none';
        } else {
            if (menuBtn) menuBtn.style.display = 'block';
            if (nav && !nav.classList.contains('mobile-open')) {
                nav.style.display = 'none';
            }
        }
    });
}

// ============================================
// 4. SCROLL REVEAL ANIMATIONS
// ============================================
function initializeScrollReveal() {
    const revealElements = document.querySelectorAll('.value-card, .timeline-item, .feature-card, .member-card, .gallery-item');
    
    const revealOnScroll = function() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    };
    
    // Add CSS class for animation
    const style = document.createElement('style');
    style.textContent = `
        .value-card, .timeline-item, .feature-card, .member-card, .gallery-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        .value-card.revealed, .timeline-item.revealed, .feature-card.revealed, 
        .member-card.revealed, .gallery-item.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}

// ============================================
// 5. FAMILY TREE INTERACTIONS
// ============================================
function initializeFamilyTreeInteractions() {
    const familyMembers = document.querySelectorAll('.person-card');
    
    familyMembers.forEach(member => {
        member.addEventListener('click', function() {
            const name = this.querySelector('h4')?.innerText || 'Family Member';
            const details = this.querySelector('p')?.innerText || '';
            
            // Show modal with member details
            showModal(`${name}`, `
                <p><strong>${details}</strong></p>
                <p>Click "Edit" to add more information about this family member.</p>
                <button onclick="editFamilyMember('${name}')" class="btn-primary">Edit Information</button>
            `);
        });
        
        // Add hover effect
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Modal function
function showModal(title, content) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.custom-modal');
    if (existingModal) existingModal.remove();
    
    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <span class="modal-close">&times;</span>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add styles
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        }
        .modal-content {
            background: white;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            animation: slideUp 0.3s ease;
        }
        .modal-header {
            padding: 1rem;
            border-bottom: 2px solid #8B4513;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .modal-close {
            font-size: 1.5rem;
            cursor: pointer;
            color: #8B4513;
        }
        .modal-body {
            padding: 1.5rem;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(modalStyle);
    
    // Close modal
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === modal.querySelector('.modal-overlay')) modal.remove();
    });
}

// Edit family member function
function editFamilyMember(name) {
    alert(`Editing information for ${name}\n\nIn a full implementation, this would open an edit form.`);
}

// ============================================
// 6. NEWSLETTER SIGNUP (with validation)
// ============================================
function initializeNewsletterSignup() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]')?.value;
            
            if (validateEmail(email)) {
                showNotification('Thank you for subscribing to family updates!', 'success');
                this.reset();
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">✕</button>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            color: white;
            z-index: 1001;
            animation: slideIn 0.3s ease;
            display: flex;
            gap: 1rem;
            align-items: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .notification-success { background: #4CAF50; }
        .notification-error { background: #f44336; }
        .notification-info { background: #2196F3; }
        .notification button {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 1.2rem;
        }
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) notification.remove();
    }, 5000);
}

// ============================================
// 7. BACK TO TOP BUTTON
// ============================================
function initializeBackToTop() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #8B4513;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.5rem;
        display: none;
        z-index: 99;
        transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = '#D2691E';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = '#8B4513';
    });
}

// ============================================
// 8. FAMILY MEMBER SEARCH FUNCTIONALITY
// ============================================
function initializeFamilyMemberSearch() {
    const searchInput = document.getElementById('family-search');
    const searchResults = document.getElementById('search-results');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            if (searchTerm.length > 2) {
                searchFamilyMembers(searchTerm, searchResults);
            } else if (searchResults) {
                searchResults.innerHTML = '';
                searchResults.style.display = 'none';
            }
        });
    }
}

function searchFamilyMembers(term, resultsContainer) {
    // Sample family members database
    const familyMembers = [
        { name: 'Chief Okot Oloo', generation: 1, location: 'Gulu, Uganda' },
        { name: 'Okot Olum', generation: 2, location: 'Gulu, Uganda' },
        { name: 'Johnson Okot', generation: 3, location: 'Kampala, Uganda' },
        { name: 'James Okot', generation: 4, location: 'London, UK' },
        { name: 'Michael Okot', generation: 5, location: 'Nairobi, Kenya' },
        { name: 'Grace Akello', generation: 4, location: 'Gulu, Uganda' },
        { name: 'Sarah Okot', generation: 4, location: 'Toronto, Canada' }
    ];
    
    const matches = familyMembers.filter(member => 
        member.name.toLowerCase().includes(term)
    );
    
    if (matches.length > 0) {
        resultsContainer.innerHTML = matches.map(match => `
            <div class="search-result-item" onclick="showFamilyMemberDetails('${match.name}')">
                <strong>${match.name}</strong>
                <small>Generation ${match.generation} - ${match.location}</small>
            </div>
        `).join('');
        resultsContainer.style.display = 'block';
        
        // Add styles for search results
        const style = document.createElement('style');
        style.textContent = `
            .search-results {
                position: absolute;
                background: white;
                border: 1px solid #ddd;
                border-radius: 10px;
                max-height: 300px;
                overflow-y: auto;
                z-index: 100;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            }
            .search-result-item {
                padding: 0.75rem;
                cursor: pointer;
                border-bottom: 1px solid #eee;
                transition: background 0.2s ease;
            }
            .search-result-item:hover {
                background: #f5f5f5;
            }
            .search-result-item small {
                display: block;
                color: #666;
                font-size: 0.8rem;
            }
        `;
        document.head.appendChild(style);
    } else {
        resultsContainer.innerHTML = '<div class="search-result-item">No family members found</div>';
        resultsContainer.style.display = 'block';
    }
}

function showFamilyMemberDetails(name) {
    showModal(`Family Member: ${name}`, `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>More information:</strong> This family member's detailed biography is being compiled.</p>
        <p>If you have information about ${name}, please <a href="contact.html">contact the family historian</a>.</p>
    `);
}

// ============================================
// 9. PHOTO GALLERY LIGHTBOX
// ============================================
function initializePhotoGalleryLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-card');
    
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            const title = this.querySelector('h3')?.innerText || 'Family Photo';
            const description = this.querySelector('p')?.innerText || '';
            const icon = this.querySelector('.placeholder-icon')?.innerHTML || '📸';
            
            showLightbox(title, description, icon);
        });
    });
}

function showLightbox(title, description, icon) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <div class="lightbox-image">
                <div style="font-size: 8rem; text-align: center;">${icon}</div>
            </div>
            <div class="lightbox-caption">
                <h3>${title}</h3>
                <p>${description}</p>
                <small>Click to view full resolution (coming soon)</small>
            </div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        }
        .lightbox-content {
            max-width: 90%;
            max-height: 90%;
            background: white;
            border-radius: 15px;
            overflow: hidden;
            position: relative;
        }
        .lightbox-close {
            position: absolute;
            top: 10px;
            right: 20px;
            font-size: 2rem;
            color: white;
            cursor: pointer;
            z-index: 2001;
            background: rgba(0,0,0,0.5);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .lightbox-image {
            padding: 2rem;
            background: #f5f5f5;
            min-width: 300px;
            min-height: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .lightbox-caption {
            padding: 1rem;
            text-align: center;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(lightbox);
    
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.remove());
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.remove();
    });
}

// ============================================
// 10. EVENT COUNTDOWN TIMER
// ============================================
function initializeEventCountdown() {
    const countdownElement = document.getElementById('reunion-countdown');
    
    if (countdownElement) {
        // Set the date for next family reunion (June 20, 2026)
        const reunionDate = new Date('June 20, 2026 00:00:00').getTime();
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = reunionDate - now;
            
            if (distance < 0) {
                countdownElement.innerHTML = "The family reunion is happening! 🎉";
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            countdownElement.innerHTML = `
                <div class="countdown-timer">
                    <div class="countdown-item"><span class="countdown-number">${days}</span><span class="countdown-label">Days</span></div>
                    <div class="countdown-item"><span class="countdown-number">${hours}</span><span class="countdown-label">Hours</span></div>
                    <div class="countdown-item"><span class="countdown-number">${minutes}</span><span class="countdown-label">Minutes</span></div>
                    <div class="countdown-item"><span class="countdown-number">${seconds}</span><span class="countdown-label">Seconds</span></div>
                </div>
            `;
        }
        
        // Add styles for countdown
        const style = document.createElement('style');
        style.textContent = `
            .countdown-timer {
                display: flex;
                gap: 1rem;
                justify-content: center;
                margin: 1rem 0;
            }
            .countdown-item {
                text-align: center;
                background: #8B4513;
                color: white;
                padding: 1rem;
                border-radius: 10px;
                min-width: 80px;
            }
            .countdown-number {
                display: block;
                font-size: 2rem;
                font-weight: bold;
            }
            .countdown-label {
                font-size: 0.8rem;
                text-transform: uppercase;
            }
        `;
        document.head.appendChild(style);
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
}

// ============================================
// 11. FAMILY HISTORY QUIZ
// ============================================
function initializeFamilyQuiz() {
    const quizContainer = document.getElementById('family-quiz');
    
    if (quizContainer) {
        const quizQuestions = [
            {
                question: "In which year was Chief Okot Oloo born?",
                options: ["1820", "1840", "1860", "1880"],
                correct: 1
            },
            {
                question: "Where is the ancestral home of the Okot family?",
                options: ["Kampala", "Jinja", "Gulu", "Mbale"],
                correct: 2
            },
            {
                question: "What is the Okot family motto?",
                options: ["Unity is Strength", "Forward Together", "Peace and Love", "Work Hard"],
                correct: 0
            }
        ];
        
        let currentQuestion = 0;
        let score = 0;
        
        function displayQuestion() {
            const q = quizQuestions[currentQuestion];
            quizContainer.innerHTML = `
                <div class="quiz-card">
                    <h3>Family History Quiz</h3>
                    <p class="quiz-question">${q.question}</p>
                    <div class="quiz-options">
                        ${q.options.map((opt, idx) => `
                            <button onclick="checkAnswer(${idx})" class="quiz-option">${opt}</button>
                        `).join('')}
                    </div>
                    <p class="quiz-progress">Question ${currentQuestion + 1} of ${quizQuestions.length}</p>
                </div>
            `;
        }
        
        window.checkAnswer = function(selected) {
            const isCorrect = selected === quizQuestions[currentQuestion].correct;
            
            if (isCorrect) {
                score++;
                showNotification('Correct! ✓', 'success');
            } else {
                showNotification(`Wrong! The correct answer is: ${quizQuestions[currentQuestion].options[quizQuestions[currentQuestion].correct]}`, 'error');
            }
            
            currentQuestion++;
            
            if (currentQuestion < quizQuestions.length) {
                displayQuestion();
            } else {
                const percentage = (score / quizQuestions.length) * 100;
                quizContainer.innerHTML = `
                    <div class="quiz-result">
                        <h3>Quiz Complete!</h3>
                        <p>You scored ${score} out of ${quizQuestions.length}</p>
                        <p>Percentage: ${percentage}%</p>
                        <button onclick="resetQuiz()" class="btn-primary">Take Quiz Again</button>
                    </div>
                `;
            }
        };
        
        window.resetQuiz = function() {
            currentQuestion = 0;
            score = 0;
            displayQuestion();
        };
        
        // Add quiz styles
        const style = document.createElement('style');
        style.textContent = `
            .quiz-card, .quiz-result {
                background: white;
                padding: 2rem;
                border-radius: 15px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                margin: 2rem 0;
            }
            .quiz-question {
                font-size: 1.2rem;
                margin: 1rem 0;
                font-weight: bold;
            }
            .quiz-options {
                display: grid;
                gap: 0.5rem;
                margin: 1rem 0;
            }
            .quiz-option {
                padding: 0.75rem;
                background: #f5f5f5;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            .quiz-option:hover {
                background: #8B4513;
                color: white;
                transform: translateX(5px);
            }
            .quiz-progress {
                margin-top: 1rem;
                color: #666;
                font-size: 0.9rem;
            }
        `;
        document.head.appendChild(style);
        
        displayQuestion();
    }
}

// ============================================
// 12. FAMILY QUOTE ROTATOR
// ============================================
function initializeQuoteRotator() {
    const quotes = [
        { text: "A family is a circle of strength, founded on faith, joined in love, kept by God.", author: "Unknown" },
        { text: "The bond that links your true family is not one of blood, but of respect and joy in each other's life.", author: "Richard Bach" },
        { text: "Family is not an important thing. It's everything.", author: "Michael J. Fox" },
        { text: "In family life, love is the oil that eases friction, the cement that binds closer together.", author: "Friedrich Nietzsche" },
        { text: "The family is one of nature's masterpieces.", author: "George Santayana" }
    ];
    
    let quoteIndex = 0;
    const quoteElement = document.getElementById('rotating-quote');
    
    if (quoteElement) {
        function rotateQuote() {
            const quote = quotes[quoteIndex];
            quoteElement.style.opacity = '0';
            
            setTimeout(() => {
                quoteElement.innerHTML = `
                    <div class="quote-text">"${quote.text}"</div>
                    <div class="quote-author">- ${quote.author}</div>
                `;
                quoteElement.style.opacity = '1';
            }, 500);
            
            quoteIndex = (quoteIndex + 1) % quotes.length;
        }
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .quote-rotator {
                transition: opacity 0.5s ease;
                text-align: center;
                padding: 2rem;
                background: linear-gradient(135deg, #FFF8DC, #FFE4B5);
                border-radius: 15px;
                margin: 2rem 0;
            }
            .quote-text {
                font-size: 1.2rem;
                font-style: italic;
                margin-bottom: 0.5rem;
            }
            .quote-author {
                color: #8B4513;
                font-weight: bold;
            }
        `;
        document.head.appendChild(style);
        
        rotateQuote();
        setInterval(rotateQuote, 8000);
    }
}

// ============================================
// 13. FORM VALIDATION & ENHANCEMENT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#f44336';
                    showNotification(`Please fill in ${field.name || 'all required fields'}`, 'error');
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    });
});

// ============================================
// 14. IMAGE LAZY LOADING
// ============================================
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// 15. VISITOR COUNTER (Local Storage)
// ============================================
function initializeVisitorCounter() {
    let visitorCount = localStorage.getItem('okotFamilyVisitors');
    
    if (!visitorCount) {
        visitorCount = 1;
        localStorage.setItem('okotFamilyVisitors', visitorCount);
    } else {
        visitorCount = parseInt(visitorCount) + 1;
        localStorage.setItem('okotFamilyVisitors', visitorCount);
    }
    
    const counterElement = document.getElementById('visitor-counter');
    if (counterElement) {
        counterElement.innerHTML = `👥 ${visitorCount} family visits`;
    }
}

// ============================================
// 16. SHARE BUTTON FUNCTIONALITY
// ============================================
function shareFamilyPage() {
    if (navigator.share) {
        navigator.share({
            title: 'Okot Family Heritage',
            text: 'Check out our family history website!',
            url: window.location.href
        }).catch(console.error);
    } else {
        // Fallback
        const dummy = document.createElement('input');
        dummy.value = window.location.href;
        document.body.appendChild(dummy);
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        showNotification('Link copied to clipboard! Share with family 📋', 'success');
    }
}

// ============================================
// 17. PRINT FAMILY TREE
// ============================================
function printFamilyTree() {
    const treeContent = document.querySelector('.tree-container')?.cloneNode(true);
    
    if (treeContent) {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Okot Family Tree</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        .tree-generation { margin: 20px 0; }
                        .tree-nodes { display: flex; flex-wrap: wrap; gap: 20px; }
                        .person-card { border: 1px solid #ccc; padding: 10px; border-radius: 5px; }
                    </style>
                </head>
                <body>
                    <h1>Okot Family Tree</h1>
                    ${treeContent.innerHTML}
                    <p>Printed on: ${new Date().toLocaleDateString()}</p>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
}

// ============================================
// Export functions for global use
// ============================================
window.showModal = showModal;
window.editFamilyMember = editFamilyMember;
window.showFamilyMemberDetails = showFamilyMemberDetails;
window.checkAnswer = checkAnswer;
window.resetQuiz = resetQuiz;
window.shareFamilyPage = shareFamilyPage;
window.printFamilyTree = printFamilyTree;