// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initLanguageToggle();
    initSmoothScroll();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Active navigation link highlighting
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const elementsToObserve = document.querySelectorAll('.section-title, .about-text, .about-image, .portfolio-item, .contact-item, .contact-form');
    
    elementsToObserve.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Language toggle functionality
function initLanguageToggle() {
    // Create language toggle button
    const langToggle = document.createElement('button');
    langToggle.innerHTML = 'EN';
    langToggle.className = 'lang-toggle';
    langToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1001;
        background: var(--accent-gold);
        color: var(--black);
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 25px;
        font-weight: 700;
        cursor: pointer;
        transition: var(--transition);
        box-shadow: var(--shadow-light);
    `;
    
    document.body.appendChild(langToggle);

    let isEnglish = false;
    
    langToggle.addEventListener('click', () => {
        isEnglish = !isEnglish;
        
        if (isEnglish) {
            document.body.classList.add('lang-en');
            langToggle.innerHTML = 'ES';
        } else {
            document.body.classList.remove('lang-en');
            langToggle.innerHTML = 'EN';
        }
    });

    // Hover effect
    langToggle.addEventListener('mouseenter', () => {
        langToggle.style.transform = 'scale(1.1)';
        langToggle.style.boxShadow = 'var(--shadow-heavy)';
    });
    
    langToggle.addEventListener('mouseleave', () => {
        langToggle.style.transform = 'scale(1)';
        langToggle.style.boxShadow = 'var(--shadow-light)';
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Basic validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Por favor, completa todos los campos requeridos / Please fill in all required fields', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showNotification('Por favor, ingresa un email válido / Please enter a valid email', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span class="spanish">Enviando...</span><span class="english">Sending...</span>';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification(
                    'Mensaje enviado exitosamente. Te contactaremos pronto! / Message sent successfully. We\'ll contact you soon!', 
                    'success'
                );
                
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 1002;
        background: ${type === 'success' ? 'var(--forest-green)' : type === 'error' ? 'var(--secondary-red)' : 'var(--primary-red)'};
        color: var(--white);
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: var(--shadow-heavy);
        max-width: 400px;
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
        border-left: 4px solid var(--accent-gold);
    `;
    
    // Add slide-in animation
    const slideInKeyframes = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    
    if (!document.querySelector('#slideInStyles')) {
        const style = document.createElement('style');
        style.id = 'slideInStyles';
        style.textContent = slideInKeyframes;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Add slide-out animation
    if (!document.querySelector('#slideOutStyles')) {
        const slideOutKeyframes = `
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        
        const style = document.createElement('style');
        style.id = 'slideOutStyles';
        style.textContent = slideOutKeyframes;
        document.head.appendChild(style);
    }
}

// Portfolio image lazy loading
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Add some interactive animations
document.addEventListener('DOMContentLoaded', () => {
    // Add floating animation to portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = setInterval(() => {
            heroTitle.textContent += text.charAt(i);
            i++;
            if (i > text.length) {
                clearInterval(typeWriter);
            }
        }, 100);
    }
});

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, var(--accent-gold), var(--forest-green));
        z-index: 1003;
        transition: width 0.1s ease-out;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress on load
document.addEventListener('DOMContentLoaded', addScrollProgress);