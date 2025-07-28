// Global variables
let currentSlide = 1;
const totalSlides = 4;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Ensure modal is hidden first
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
    
    // Initialize all components
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initMobileNavigation();
    initPortfolioFilter();
    initTestimonialSlider();
    initFormHandlers();
    initSmoothScrolling();
    initScrollAnimations();
    initConsultationDate();
    initHeaderScroll();
    initWhatsAppButton();
}

// Mobile Navigation
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Portfolio Filter
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.classList.remove('hidden');
                } else {
                    item.style.display = 'none';
                    item.classList.add('hidden');
                }
            });
        });
    });
}


// Testimonial Slider
function initTestimonialSlider() {
    showSlide(currentSlide);
    
    // Auto-play slider
    setInterval(() => {
        currentSlide = currentSlide >= totalSlides ? 1 : currentSlide + 1;
        showSlide(currentSlide);
    }, 4000);
}

function showSlide(n) {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (n > totalSlides) currentSlide = 1;
    if (n < 1) currentSlide = totalSlides;
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[currentSlide - 1]) {
        slides[currentSlide - 1].classList.add('active');
    }
    if (dots[currentSlide - 1]) {
        dots[currentSlide - 1].classList.add('active');
    }
      if (dots[currentSlide - 1]) {
        dots[currentSlide - 1].classList.add('active');
    }
}

function currentSlideHandler(n) {
    currentSlide = n;
    showSlide(currentSlide);
}

// Form Handlers
function initFormHandlers() {
    // Booking form
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateBookingForm()) {
                showSuccessModal('Your booking has been successfully submitted. We will contact you shortly.');
                bookingForm.reset();
            }
        });
    }
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateContactForm()) {
                showSuccessModal('Your message has been sent successfully. We will contact you shortly।');
                contactForm.reset();
            }
        });
    }
}

// Form Validation
function validateBookingForm() {
    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    
    if (!name || !phone || !email) {
        alert('Please fill in all required fields');
        return false;
    }
    
    let isValid = true;
    
    // Clear previous errors
    clearErrors();
    
    // Validate name
    if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
    }
    
    // Validate phone
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phone.value.trim()) {
        showError(phone, 'mobile number is required');
        isValid = false;
    } else if (!phoneRegex.test(phone.value.trim())) {
        showError(phone, 'Enter the phone number');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    return isValid;
}

function validateContactForm() {
    const name = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const message = document.getElementById('contactMessage');
    
    if (!name || !email || !message) {
        alert('Please fill in all required fields');
        return false;
    }
    
    let isValid = true;
    
    // Clear previous errors
    clearErrors();
    
    // Validate name
    if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
    }
    
    return isValid;
}

function showError(input, message) {
    if (!input) return;
    
    input.classList.add('error');
    
    // Remove existing error message
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
}

function clearErrors() {
    const errorInputs = document.querySelectorAll('.form-control.error');
    const errorMessages = document.querySelectorAll('.error-message');
    
    errorInputs.forEach(input => input.classList.remove('error'));
    errorMessages.forEach(message => message.remove());
}

// Modal Functions
function showSuccessModal(message) {
    const modal = document.getElementById('successModal');
    const messageElement = document.getElementById('successMessage');
    
    if (modal && messageElement) {
        messageElement.textContent = message;
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        
        // Set focus to the modal button for accessibility
        setTimeout(() => {
            const modalButton = modal.querySelector('.btn');
            if (modalButton) {
                modalButton.focus();
            }
        }, 100);
    }
}

// function closeModal() {
//     const modal = document.getElementById('successModal');
//     if (modal) {
//         modal.classList.add('hidden');
//         modal.style.display = 'none';
//     }
// }

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeInUp');
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .feature');
    animateElements.forEach(el => observer.observe(el));
}

// Set minimum date for consultation booking
function initConsultationDate() {
    const consultationDate = document.getElementById('consultationDate');
    if (consultationDate) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const formattedDate = tomorrow.toISOString().split('T')[0];
        consultationDate.setAttribute('min', formattedDate);
    }
}

// Header scroll effect
function initHeaderScroll() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 253, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'var(--color-surface)';
                header.style.backdropFilter = 'none';
            }
        }
    });
}

// WhatsApp integration
function initWhatsAppButton() {
    const whatsappButton = document.createElement('div');
    whatsappButton.innerHTML = `
        <a href="https://wa.me/+918305198886=${encodeURIComponent('Hii! I need information about interior design।')}" 
           target="_blank" 
           style="position: fixed; bottom: 20px; right: 20px; z-index: 1000; background: #25D366; color: white; border-radius: 50px; padding: 15px 20px; text-decoration: none; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: transform 0.3s ease; font-weight: 500; display: flex; align-items: center; gap: 8px;"
           onmouseover="this.style.transform='scale(1.05)'"
           onmouseout="this.style.transform='scale(1)'">
            📱 WhatsApp
        </a>
    `;
    document.body.appendChild(whatsappButton);
}

// Utility Functions
function formatNumber(num) {
    return new Intl.NumberFormat('hi-IN').format(num);
}

// Modal close event handlers
document.addEventListener('click', function(e) {
    const modal = document.getElementById('successModal');
    if (modal && e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Make functions global for HTML onclick handlers
window.calculateCost = calculateCost;
window.closeModal = closeModal;
window.currentSlide = currentSlideHandler;