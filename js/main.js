/**
 * Yazmataz AI Consulting Website JavaScript
 * Handles interactivity, animations, and functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initScrollEffects();
    initFaqAccordion();
    initCaseStudyFilters();
    animateHeroElements(); // Add hero animation
    animateServiceElements(); // Add service page animation
});

// Add new function for hero animations
function animateHeroElements() {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
    }
    
    if (heroImage) {
        setTimeout(() => {
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateX(0)';
        }, 500);
    }
}

/**
 * Service Page Animations
 * Similar to hero animations but for service details
 */
function animateServiceElements() {
    // Get all service detail sections
    const serviceDetails = document.querySelectorAll('.service-detail');
    const isMobile = window.innerWidth <= 992;
    
    if (serviceDetails.length > 0) {
        serviceDetails.forEach((detail, index) => {
            const content = detail.querySelector('.service-detail-content');
            const image = detail.querySelector('.service-detail-image');
            
            // Stagger the animations
            const delay = 200 + (index * 300);
            
            if (content) {
                setTimeout(() => {
                    content.style.opacity = '1';
                    content.style.transform = 'translateY(0)';
                }, delay);
            }
            
            if (image) {
                setTimeout(() => {
                    image.style.opacity = '1';
                    // Different transform depending on mobile vs desktop
                    if (isMobile) {
                        image.style.transform = 'translateY(0)';
                    } else {
                        image.style.transform = 'translateX(0)';
                    }
                }, delay + 300);
            }
        });
    }
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle aria-expanded for accessibility
            const isExpanded = menuToggle.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!event.target.closest('.navbar')) {
                navMenu.classList.remove('active');
                if (menuToggle) {
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        }
    });
    
    // Change navbar appearance on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.padding = '0.5rem 0';
                navbar.style.boxShadow = 'var(--shadow-md)';
            } else {
                navbar.style.padding = '1rem 0';
                navbar.style.boxShadow = 'var(--shadow-sm)';
            }
        }
    });
}

/**
 * Scroll Effects
 * Animate elements as they come into view
 */
function initScrollEffects() {
    // Add animation class to elements
    const animateElements = document.querySelectorAll('.service-card, .feature, .case-study, .testimonial, .team-member, .service-detail-content, .service-detail-image');
    
    animateElements.forEach(element => {
        element.classList.add('js-animate');
    });
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Unobserve after animating
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe all elements with js-animate class
    document.querySelectorAll('.js-animate').forEach(element => {
        observer.observe(element);
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL hash without jump
                    history.pushState(null, null, href);
                }
            }
        });
    });
}

/**
 * FAQ Accordion
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggleIcon = item.querySelector('.faq-toggle i');
        
        if (question && answer && toggleIcon) {
            question.addEventListener('click', () => {
                // Close all other open FAQs
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = null;
                        otherItem.querySelector('.faq-toggle i').classList.remove('fa-minus');
                        otherItem.querySelector('.faq-toggle i').classList.add('fa-plus');
                    }
                });
                
                // Toggle current FAQ
                item.classList.toggle('active');
                
                if (item.classList.contains('active')) {
                    answer.style.display = 'block';
                    toggleIcon.classList.remove('fa-plus');
                    toggleIcon.classList.add('fa-minus');
                } else {
                    answer.style.display = 'none';
                    toggleIcon.classList.remove('fa-minus');
                    toggleIcon.classList.add('fa-plus');
                }
            });
        }
    });
}

/**
 * Case Study Filters
 */
function initCaseStudyFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const caseStudies = document.querySelectorAll('.case-study-card');
    
    if (filterButtons.length && caseStudies.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                // Filter case studies
                caseStudies.forEach(study => {
                    if (filter === 'all' || study.getAttribute('data-category') === filter) {
                        study.style.display = 'block';
                    } else {
                        study.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Contact form functionality has been removed
