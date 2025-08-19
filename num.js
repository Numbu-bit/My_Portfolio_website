document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Adjust for sticky nav
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project card reveal animation on scroll
    const projectCards = document.querySelectorAll('.project-card');
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        projectCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < triggerBottom) {
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            }
        });
    };

    // Initialize project cards with hidden state
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-50px)';
    });

    // Trigger reveal animation on scroll and load
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Navigation bar active state
    const sections = document.querySelectorAll('section');
    const updateActiveNav = () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav);

    // Basic contact form validation (for future form addition)
    const contactSection = document.getElementById('contact');
    contactSection.addEventListener('submit', (e) => {
        if (e.target.tagName === 'FORM') {
            e.preventDefault();
            const emailInput = e.target.querySelector('input[type="email"]');
            if (emailInput && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                alert('Please enter a valid email address.');
                return;
            }
            alert('Thank you for your message! I will get back to you soon.');
            e.target.reset();
        }
    });

    // Add active class to nav links for styling (requires CSS)
    const style = document.createElement('style');
    style.textContent = `
        nav a.active {
            background: linear-gradient(45deg, #3b82f6, #7c3aed);
            color: #ffffff !important;
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }
    `;
    document.head.appendChild(style);
});