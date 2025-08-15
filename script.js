// script.js - Client-side form handling

'use strict'; // Enable strict mode for cleaner code

document.addEventListener('DOMContentLoaded', () => {
    // Get references to both email forms
    const heroForm = document.getElementById('hero-email-form');
    const footerForm = document.getElementById('footer-email-form');

    /**
     * Handles the form submission logic.
     * @param {Event} event - The form submission event.
     * @param {HTMLElement} formElement - The form HTML element that was submitted.
     */
    const handleSubmit = async (event, formElement) => {
        event.preventDefault(); // Prevent default form submission and page reload

        const emailInput = formElement.querySelector('input[type="email"]');
        const formMessage = formElement.querySelector('.form-message');
        const email = emailInput.value.trim(); // Trim whitespace from email input
        
        // Determine which form is being submitted
        const formType = formElement.id === 'hero-email-form' ? 'Hero Form' : 'Footer Form';

        // Reset previous messages
        formMessage.textContent = '';
        formMessage.classList.remove('success', 'error');

        // Client-side validation
        if (!email) {
            formMessage.textContent = 'Please enter your email address.';
            formMessage.classList.add('error');
            
            // Track form validation error
            gtag('event', 'form_validation_error', {
                event_category: 'form',
                event_label: formType,
                error_type: 'empty_email'
            });
            
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formMessage.textContent = 'Please enter a valid email address.';
            formMessage.classList.add('error');
            
            // Track form validation error
            gtag('event', 'form_validation_error', {
                event_category: 'form',
                event_label: formType,
                error_type: 'invalid_email'
            });
            
            return;
        }

        formMessage.textContent = 'Submitting...';
        formMessage.classList.remove('error', 'success'); // Clear previous states

        // Track form submission attempt
        gtag('event', 'form_submit_attempt', {
            event_category: 'form',
            event_label: formType
        });

        try {
            // Send data to your Netlify Function
            // The path /.netlify/functions/subscribe corresponds to your subscribe.js function
            const response = await fetch('/.netlify/functions/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json' // Request JSON response
                },
                body: JSON.stringify({ email: email }), // Send email as a JSON object
            });

            // Parse the JSON response from the serverless function
            const data = await response.json();

            // Check if the HTTP status code is in the 2xx range and the backend's 'success' flag is true
            if (response.ok && data.success) {
                formMessage.textContent = data.message;
                formMessage.classList.add('success');
                emailInput.value = ''; // Clear input on successful submission
                
                // Track successful form submission
                gtag('event', 'form_submit_success', {
                    event_category: 'conversion',
                    event_label: formType,
                    value: 1
                });
                
                // Also track as a conversion event
                gtag('event', 'email_signup', {
                    event_category: 'conversion',
                    event_label: formType
                });
                
            } else {
                // Handle non-2xx HTTP responses or backend-specific errors
                formMessage.textContent = data.message || 'Something went wrong. Please try again.';
                formMessage.classList.add('error');
                
                // Track form submission failure
                gtag('event', 'form_submit_failure', {
                    event_category: 'form',
                    event_label: formType,
                    error_type: 'server_error',
                    error_message: data.message || 'Unknown server error'
                });
            }
        } catch (error) {
            // Handle network errors (e.g., server unreachable) or unexpected errors
            console.error('Frontend Fetch Error:', error);
            formMessage.textContent = 'An unexpected error occurred. Please check your internet connection.';
            formMessage.classList.add('error');
            
            // Track network/unexpected errors
            gtag('event', 'form_submit_failure', {
                event_category: 'form',
                event_label: formType,
                error_type: 'network_error',
                error_message: error.message || 'Network error'
            });
        }
    };

    // Attach event listeners to the forms if they exist
    if (heroForm) {
        heroForm.addEventListener('submit', (event) => handleSubmit(event, heroForm));
    }

    if (footerForm) {
        footerForm.addEventListener('submit', (event) => handleSubmit(event, footerForm));
    }
});

setTimeout(() => {
  gtag('event', 'time_on_page', {
    event_category: 'engagement',
    event_label: 'Stayed 30s+'
  });
}, 30000); // 30 seconds

document.addEventListener('DOMContentLoaded', function () {
  
  /** -------------------
   * 1. SOCIAL ICON CLICKS
   * ------------------- **/
  const socialLinks = document.querySelectorAll('a[data-social]');
  
  socialLinks.forEach(link => {
    link.addEventListener('click', function () {
      const platform = this.getAttribute('data-social');
      
      gtag('event', 'social_click', {
        event_category: 'social',
        event_label: platform,
        transport_type: 'beacon'
      });

      console.log(`Tracked click on: ${platform}`);
    });
  });

  
  /** -------------------
   * 2. SCROLL DEPTH TRACKING
   * ------------------- **/
  let scrollDepthTriggered = { 25: false, 50: false, 75: false, 100: false };
  
  function trackScrollDepth() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollPercent = Math.round(((scrollTop + windowHeight) / docHeight) * 100);
    
    [25, 50, 75, 100].forEach(depth => {
      if (scrollPercent >= depth && !scrollDepthTriggered[depth]) {
        scrollDepthTriggered[depth] = true;
        
        gtag('event', 'scroll_depth', {
          event_category: 'engagement',
          event_label: `${depth}%`,
          value: depth
        });

        console.log(`Scroll depth reached: ${depth}%`);
      }
    });
  }
  
  window.addEventListener('scroll', trackScrollDepth);

});
