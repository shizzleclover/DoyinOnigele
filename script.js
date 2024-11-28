// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Remove active class from all nav links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        this.classList.add('active');
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const navHeight = document.querySelector('nav').offsetHeight;
        
        // Calculate scroll position with offset for fixed header
        const scrollPosition = targetSection.offsetTop - navHeight;
        
        // Smooth scroll with animation
        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
        
        // Add animation class to target section
        targetSection.classList.add('section-animate');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            targetSection.classList.remove('section-animate');
        }, 1000);
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navHeight = document.querySelector('nav').offsetHeight;
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100; // Added offset for better trigger point
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = '#' + section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === current) {
            link.classList.add('active');
        }
    });
});

// Booking Form Submission
const bookingForm = document.getElementById('booking-form');

bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Here you would typically send the form data to a server
    // For now, we'll just show an alert
    alert('Thank you for your booking request! We will contact you soon.');
    bookingForm.reset();
});

// Image Gallery Loading
window.addEventListener('load', function() {
    // You can add code here to dynamically load gallery images
    // For now, this is just a placeholder
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Scroll reveal animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);

// Add reveal class to sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal');
});

// Smooth hover effect for gallery images
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function(e) {
        this.style.transform = 'scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function(e) {
        this.style.transform = 'scale(1)';
    });
});

// Form input animation
document.querySelectorAll('#booking-form input, #booking-form textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(button => button.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Lightbox functionality
const lightbox = document.querySelector('.lightbox-modal');
const lightboxMain = document.querySelector('.lightbox-main');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeLightbox = document.querySelector('.close-lightbox');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let lightboxIndex = 0;
const galleryArray = Array.from(galleryItems);

// Open lightbox
document.querySelectorAll('.view-btn, .play-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const galleryItem = this.closest('.gallery-item');
        lightboxIndex = galleryArray.indexOf(galleryItem);
        updateLightbox();
        lightbox.classList.add('active');
    });
});

// Close lightbox
closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

// Navigate through lightbox
prevBtn.addEventListener('click', () => {
    lightboxIndex = (lightboxIndex - 1 + galleryArray.length) % galleryArray.length;
    updateLightbox();
});

nextBtn.addEventListener('click', () => {
    lightboxIndex = (lightboxIndex + 1) % galleryArray.length;
    updateLightbox();
});

function updateLightbox() {
    const currentItem = galleryArray[lightboxIndex];
    const isVideo = currentItem.querySelector('video');
    const content = isVideo ? currentItem.querySelector('video').cloneNode(true) : 
                            currentItem.querySelector('img').cloneNode(true);
    
    lightboxMain.innerHTML = '';
    lightboxMain.appendChild(content);
    
    if (isVideo) {
        content.controls = true;
        content.autoplay = true;
    }
    
    const title = currentItem.querySelector('h3').textContent;
    const description = currentItem.querySelector('p').textContent;
    
    lightboxCaption.querySelector('h3').textContent = title;
    lightboxCaption.querySelector('p').textContent = description;
}

// Close lightbox with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        lightbox.classList.remove('active');
    }
});

// Booking Form Steps
  bookingForm = document.getElementById('booking-form');
const formSteps = document.querySelectorAll('.form-step');
const stepIndicators = document.querySelectorAll('.step');
const nextButtons = document.querySelectorAll('.next-step');
const prevButtons = document.querySelectorAll('.prev-step');
const submitButton = document.querySelector('.submit-booking');
let currentStep = 1;

// Service Selection
const serviceOptions = document.querySelectorAll('.service-option');
const selectedService = document.querySelector('.selected-service');
const selectedPrice = document.querySelector('.selected-price');

// Date and Time Selection
const timeSlots = document.querySelectorAll('.time-slot');
const selectedDate = document.querySelector('.selected-date');
const selectedTime = document.querySelector('.selected-time');

// Update Steps
function updateSteps(step) {
    formSteps.forEach(formStep => {
        formStep.classList.remove('active');
    });
    
    stepIndicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');
    document.querySelector(`.step[data-step="${step}"]`).classList.add('active');
    
    // Show/hide navigation buttons
    if (step === 1) {
        document.querySelector('.prev-step').style.display = 'none';
    } else {
        document.querySelector('.prev-step').style.display = 'block';
    }
    
    if (step === 3) {
        document.querySelector('.next-step').style.display = 'none';
        submitButton.style.display = 'block';
    } else {
        document.querySelector('.next-step').style.display = 'block';
        submitButton.style.display = 'none';
    }
}

// Service Selection
serviceOptions.forEach(option => {
    option.addEventListener('click', () => {
        serviceOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        
        const serviceName = option.querySelector('h3').textContent;
        const servicePrice = option.querySelector('.price').textContent;
        
        selectedService.textContent = serviceName;
        selectedPrice.textContent = servicePrice;
    });
});

// Time Slot Selection
timeSlots.forEach(slot => {
    slot.addEventListener('click', () => {
        timeSlots.forEach(s => s.classList.remove('selected'));
        slot.classList.add('selected');
        selectedTime.textContent = slot.textContent;
    });
});

// Navigation
nextButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentStep < 3) {
            currentStep++;
            updateSteps(currentStep);
        }
    });
});

prevButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateSteps(currentStep);
        }
    });
});

// Form Submission
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Booking submitted successfully! We will contact you shortly to confirm your appointment.');
});

// Initialize Calendar
function initCalendar() {
    const calendar = document.querySelector('.calendar-grid');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Add day headers
    days.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.classList.add('calendar-day-header');
        dayHeader.textContent = day;
        calendar.appendChild(dayHeader);
    });
    
    // Add calendar days (simplified version)
    for (let i = 1; i <= 31; i++) {
        const dayElement = document.createElement('button');
        dayElement.type = 'button';
        dayElement.classList.add('calendar-day');
        dayElement.textContent = i;
        
        dayElement.addEventListener('click', () => {
            document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
            dayElement.classList.add('selected');
            selectedDate.textContent = `September ${i}, 2024`; // Hardcoded month for demo
        });
        
        calendar.appendChild(dayElement);
    }
}

// Initialize calendar when page loads
window.addEventListener('load', initCalendar);

// Auto-scrolling Testimonials
document.addEventListener('DOMContentLoaded', () => {
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (!testimonialTrack || testimonialCards.length === 0) return;

    let testimonialIndex = 0;

    // Clone the first testimonial and append it to the end for smooth infinite scroll
    testimonialTrack.appendChild(testimonialCards[0].cloneNode(true));

    function scrollTestimonials() {
        testimonialIndex++;
        testimonialTrack.style.transition = 'transform 0.5s ease-in-out';
        testimonialTrack.style.transform = `translateX(-${testimonialIndex * 100}%)`;

        // Reset to first slide without animation when reaching the end
        if (testimonialIndex >= testimonialCards.length) {
            setTimeout(() => {
                testimonialTrack.style.transition = 'none';
                testimonialIndex = 0;
                testimonialTrack.style.transform = `translateX(0)`;
            }, 500);
        }
    }

    // Start auto-scroll
    let testimonialInterval = setInterval(scrollTestimonials, 5000);

    // Pause on hover
    testimonialTrack.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });

    // Resume on mouse leave
    testimonialTrack.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(scrollTestimonials, 5000);
    });
});

// Enhanced Mobile Navigation
  hamburger = document.querySelector('.hamburger');
  navLinks = document.querySelector('.nav-links');
const body = document.querySelector('body');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.style.overflow = '';
    }
});

// Better touch handling for gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    let touchStartY;
    
    item.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });

    item.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY - touchEndY;

        // Only show overlay if it's a tap, not a scroll
        if (Math.abs(diff) < 5) {
            item.querySelector('.gallery-overlay').style.opacity = '1';
            item.querySelector('.gallery-overlay').style.transform = 'translateY(0)';
        }
    });
});

// Enhanced mobile calendar interaction
const calendarDays = document.querySelectorAll('.calendar-day');
calendarDays.forEach(day => {
    day.addEventListener('touchstart', () => {
        day.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
    });
    
    day.addEventListener('touchend', () => {
        day.style.backgroundColor = '';
    });
});

// Better scroll handling for mobile
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const nav = document.querySelector('nav');
    
    // Show/hide navigation on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
}, { passive: true });

// Optimize testimonial slider for mobile
 
const testimonialTrack = document.querySelector('.testimonial-track');

testimonialTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    testimonialTrack.style.transition = 'none';
}, { passive: true });

testimonialTrack.addEventListener('touchmove', (e) => {
    if (!touchStartX) return;
    
    const currentTouch = e.touches[0].clientX;
    const diff = touchStartX - currentTouch;
    
    testimonialTrack.style.transform = `translateX(${-testimonialIndex * (cardWidth + 32) - diff}px)`;
}, { passive: true });

testimonialTrack.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    
    testimonialTrack.style.transition = 'transform 0.3s ease';
    
    if (Math.abs(diff) > 50) {
        if (diff > 0 && testimonialIndex < maxIndex) {
            testimonialIndex++;
        } else if (diff < 0 && testimonialIndex > 0) {
            testimonialIndex--;
        }
    }
    
    updateSlider();
    touchStartX = null;
}, { passive: true });

// Helper function to update slider position
function updateSlider() {
    testimonialTrack.style.transform = `translateX(${-testimonialIndex * (cardWidth + 32)}px)`;
    updateDots();
    updateCards();
}

// Add double-tap prevention
document.addEventListener('touchend', (e) => {
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
        e.preventDefault();
        e.target.click();
    }
}, { passive: false });

// Booking Form Functionality
document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('booking-form');
    const steps = document.querySelectorAll('.step');
    const formSteps = document.querySelectorAll('.form-step');
    const nextBtns = document.querySelectorAll('.next-step');
    const prevBtns = document.querySelectorAll('.prev-step');
    const submitBtn = document.querySelector('.submit-booking');
    
    let currentStep = 1;

    // Service Selection
    const serviceOptions = document.querySelectorAll('.service-option');
    const selectedService = document.querySelector('.selected-service');
    const selectedPrice = document.querySelector('.selected-price');

    serviceOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove selected class from all options
            serviceOptions.forEach(opt => opt.classList.remove('selected'));
            // Add selected class to clicked option
            option.classList.add('selected');
            // Update summary
            const serviceName = option.querySelector('h3').textContent;
            const servicePrice = option.querySelector('.price').textContent;
            selectedService.textContent = serviceName;
            selectedPrice.textContent = servicePrice;
        });
    });

    // Date and Time Selection
    const timeSlots = document.querySelectorAll('.time-slot');
    const selectedDate = document.querySelector('.selected-date');
    const selectedTime = document.querySelector('.selected-time');

    timeSlots.forEach(slot => {
        slot.addEventListener('click', () => {
            timeSlots.forEach(s => s.classList.remove('selected'));
            slot.classList.add('selected');
            selectedTime.textContent = slot.textContent;
        });
    });

    // Navigation between steps
    function updateSteps(step) {
        // Update step indicators
        steps.forEach((s, index) => {
            if (index + 1 === step) {
                s.classList.add('active');
            } else if (index + 1 < step) {
                s.classList.add('completed');
            } else {
                s.classList.remove('active', 'completed');
            }
        });

        // Show/hide form steps
        formSteps.forEach((fs, index) => {
            if (index + 1 === step) {
                fs.classList.add('active');
            } else {
                fs.classList.remove('active');
            }
        });

        // Show/hide navigation buttons
        if (step === 1) {
            document.querySelectorAll('.prev-step').forEach(btn => btn.style.display = 'none');
        } else {
            document.querySelectorAll('.prev-step').forEach(btn => btn.style.display = 'block');
        }

        if (step === steps.length) {
            document.querySelectorAll('.next-step').forEach(btn => btn.style.display = 'none');
            submitBtn.style.display = 'block';
        } else {
            document.querySelectorAll('.next-step').forEach(btn => btn.style.display = 'block');
            submitBtn.style.display = 'none';
        }
    }

    // Validate current step
    function validateStep(step) {
        switch(step) {
            case 1:
                return document.querySelector('.service-option.selected') !== null;
            case 2:
                return document.querySelector('.time-slot.selected') !== null && 
                       document.querySelector('.calendar-day.selected') !== null;
            case 3:
                const requiredFields = formSteps[2].querySelectorAll('[required]');
                return Array.from(requiredFields).every(field => field.value.trim() !== '');
            default:
                return true;
        }
    }

    // Next button click handler
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                updateSteps(currentStep);
            } else {
                alert('Please complete all required fields before proceeding.');
            }
        });
    });

    // Previous button click handler
    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentStep--;
            updateSteps(currentStep);
        });
    });

    // Form submission
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateStep(currentStep)) {
            alert('Please complete all required fields.');
            return;
        }

        const formData = {
            service: selectedService.textContent,
            date: selectedDate.textContent,
            time: selectedTime.textContent,
            price: selectedPrice.textContent,
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            specialRequests: document.getElementById('special-requests').value
        };

        try {
            // Here you would typically send the data to your server
            // For now, we'll just show a success message
            alert('Booking submitted successfully! We will contact you shortly.');
            bookingForm.reset();
            currentStep = 1;
            updateSteps(currentStep);
            
            // Reset selections
            serviceOptions.forEach(opt => opt.classList.remove('selected'));
            timeSlots.forEach(slot => slot.classList.remove('selected'));
            selectedService.textContent = '-';
            selectedDate.textContent = '-';
            selectedTime.textContent = '-';
            selectedPrice.textContent = '-';
        } catch (error) {
            alert('There was an error submitting your booking. Please try again.');
        }
    });

    // Initialize form
    updateSteps(currentStep);
});

// Simple Booking Form Handler
document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('booking-form');

    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Collect form data
        const formData = {
            service: document.getElementById('service').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            fullName: document.getElementById('fullName').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            location: document.getElementById('location').value,
            specialRequests: document.getElementById('special-requests').value
        };

        try {
            // Here you would typically send the data to your server
            // For now, we'll just show a success message
            alert('Thank you for your booking request! We will contact you shortly to confirm your appointment.');
            bookingForm.reset();
        } catch (error) {
            alert('There was an error submitting your booking. Please try again.');
        }
    });
});
