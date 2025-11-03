document.addEventListener('DOMContentLoaded', function() {
            
    // --- Mobile Menu Toggle ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a.mobile-link');
    
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        // Toggle ARIA expanded state
        const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', !isExpanded);
    });

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // --- Sticky Header Background ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-gray-900/90', 'backdrop-blur-sm', 'shadow-lg');
        } else {
            header.classList.remove('bg-gray-900/90', 'backdrop-blur-sm', 'shadow-lg');
        }
    });

    // --- Scrollspy ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // 50% of the section must be visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Desktop links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
                
                // Mobile links
                const mobileNavLinks = document.querySelectorAll('#mobile-menu a');
                mobileNavLinks.forEach(link => {
                    link.classList.remove('text-teal-400'); // Remove active style
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('text-teal-400'); // Add active style
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
    
    // --- Fade-in-on-scroll Animation ---
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once it's visible
                // fadeObserver.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% is visible

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });

});