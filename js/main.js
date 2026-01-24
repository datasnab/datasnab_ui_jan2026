// Main JavaScript file for general functionality

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

// Chat icon click handler
document.querySelectorAll('.chat-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        alert('Chat feature coming soon! Please contact us through the contact form.');
    });
});

// Service navigation items interaction
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

// Sidebar items interaction
document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.sidebar-item').forEach(i => i.style.background = '#f8f8f8');
        this.style.background = '#e8e8e8';
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s, transform 0.6s';
    observer.observe(card);
});

// Mobile menu toggle (if needed)
const mobileMenuToggle = () => {
    const nav = document.querySelector('.nav-links');
    if (window.innerWidth <= 768) {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    }
};

// Handle window resize
window.addEventListener('resize', function() {
    const nav = document.querySelector('.nav-links');
    if (window.innerWidth > 768) {
        nav.style.display = 'flex';
    }
});

// Page load animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});
