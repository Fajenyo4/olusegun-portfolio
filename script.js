// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Hide navbar on scroll down, show on scroll up (mobile only)
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Only apply this behavior on mobile
    if (window.innerWidth <= 768) {
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.classList.add('hidden');
        } else {
            // Scrolling up
            navbar.classList.remove('hidden');
        }
    } else {
        // On desktop, always show navbar
        navbar.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Create mailto link
    const subject = `New Project Inquiry - ${data.project || 'General'}`;
    const body = `Name: ${data.name}\nEmail: ${data.email}\nPlatform: ${data.platform}\nProject Type: ${data.project}\n\nMessage:\n${data.message}`;
    const mailtoLink = `mailto:fajenyo4@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;
    
    // Show success message
    alert('Thank you for your message! Your email client will open. Please send the email to complete your inquiry.');
    
    // Reset form
    contactForm.reset();
});

// Enhanced scroll animation for service cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const serviceObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe service cards for animation
document.querySelectorAll('.service-card').forEach(card => {
    serviceObserver.observe(card);
});

// General scroll animations for other sections
const generalObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Observe sections for animation (excluding service cards)
document.querySelectorAll('section:not(.services)').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    generalObserver.observe(section);
});

// Handle window resize to reset navbar state
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navbar.classList.remove('hidden');
        navMenu.classList.remove('active');
    }
});