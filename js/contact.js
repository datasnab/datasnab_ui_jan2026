// Contact form email functionality
// Sends emails directly to lalitha.vn@gmail.com

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validate form
            if (!name || !email || !subject || !message) {
                showMessage('Please fill in all fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.btn-submit');
            submitBtn.classList.add('sending');
            submitBtn.disabled = true;
            
            // Check if Web3Forms is configured
            const accessKey = contactForm.querySelector('input[name="access_key"]').value;
            
            if (accessKey && accessKey !== 'YOUR_WEB3FORMS_ACCESS_KEY') {
                // Web3Forms is configured, submit via fetch
                const formData = new FormData(contactForm);
                
                fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        showMessage('Thanks for submitting!', 'success');
                        contactForm.reset();
                    } else {
                        showMessage('There was an error. Please try again.', 'error');
                    }
                    submitBtn.classList.remove('sending');
                    submitBtn.disabled = false;
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Fallback to mailto
                    sendViaMailto(name, email, subject, message, submitBtn);
                });
            } else {
                // Use mailto method (works immediately, no setup needed)
                sendViaMailto(name, email, subject, message, submitBtn);
            }
        });
    }
});

// Function using mailto - sends to lalitha.vn@gmail.com
function sendViaMailto(name, email, subject, message, submitBtn) {
    // Show success message immediately
    showMessage('Thanks for submitting!', 'success');
    
    // Reset form
    const contactForm = document.getElementById('contactForm');
    contactForm.reset();
    submitBtn.classList.remove('sending');
    submitBtn.disabled = false;
    
    // Prepare email content
    const recipientEmail = 'lalitha.vn@gmail.com';
    const emailBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Try to open email client (works in most browsers)
    setTimeout(() => {
        window.location.href = mailtoLink;
    }, 500);
}

// Show message function
function showMessage(text, type) {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.textContent = text;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

