document.addEventListener('DOMContentLoaded', function() {
            
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a.mobile-link');
    
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', !isExpanded);
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-gray-900/90', 'backdrop-blur-sm', 'shadow-lg');
        } else {
            header.classList.remove('bg-gray-900/90', 'backdrop-blur-sm', 'shadow-lg');
        }
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
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
                
                const mobileNavLinks = document.querySelectorAll('#mobile-menu a');
                mobileNavLinks.forEach(link => {
                    link.classList.remove('text-teal-400');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('text-teal-400'); 
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
    
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });

    // --- New Project Slider Code ---
    const projectsContainer = document.getElementById('projects-container');
    const nextProjectBtn = document.getElementById('next-project-btn');
    const projectSection = document.getElementById('projects');

    if (projectsContainer && nextProjectBtn && projectSection) {
        
        const handleScroll = () => {
            const container = projectsContainer;
            const firstCard = container.querySelector('div[class*="flex-shrink-0"]');
            if (!firstCard) return;

            const cardWidth = firstCard.offsetWidth;
            const containerGap = parseFloat(window.getComputedStyle(container).gap) || 0;
            const scrollAmount = cardWidth + containerGap;

            const atEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - (cardWidth / 2);

            if (atEnd) {
                container.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            } else {
                container.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }
        };

        const checkScrollability = () => {
            setTimeout(() => {
                const container = projectsContainer;
                if (container.scrollWidth > container.clientWidth) {
                    nextProjectBtn.classList.remove('hidden');
                } else {
                    nextProjectBtn.classList.add('hidden');
                }
            }, 150); // 150ms delay to wait for rendering
        };
        
        nextProjectBtn.addEventListener('click', handleScroll);
        
        window.addEventListener('resize', checkScrollability);

        const visibilityObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                checkScrollability();
                visibilityObserver.unobserve(projectSection);
            }
        }, { threshold: 0.1 });
        
        visibilityObserver.observe(projectSection);
    }

});
