/* ═══════════════════════════════════════════════════
   TSITANA KHYME — Portfolio JS
   Handles: nav, scroll, particles, stats counter,
   testimonials, portfolio filter, form, animations
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    // ─── Theme toggle ───
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun'; // Show sun icon in dark mode
        } else {
            themeIcon.className = 'fas fa-moon'; // Show moon icon in light mode
        }
    }

    // ─── Navbar scroll effect ───
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    const onScroll = () => {
        const scrolled = window.scrollY > 50;
        navbar.classList.toggle('scrolled', scrolled);
        backToTop.classList.toggle('visible', window.scrollY > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Back-to-top click
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ─── Mobile nav toggle ───
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        }
    });

    // ─── Active nav link on scroll ───
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a:not(.nav-cta)');

    const updateActiveLink = () => {
        const scrollY = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navItems.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === `#${id}`) {
                        link.style.color = 'var(--accent-light)';
                    }
                });
            }
        });
    };
    window.addEventListener('scroll', updateActiveLink, { passive: true });

    // ─── Animated stat counters ───
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsCounted = false;

    const countUp = (el) => {
        const target = parseInt(el.dataset.target, 10);
        const duration = 2000;
        const start = performance.now();

        const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target);

            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        };
        requestAnimationFrame(tick);
    };

    // ─── Hero particles ───
    const particlesContainer = document.getElementById('particles');
    const createParticles = () => {
        const count = window.innerWidth < 768 ? 15 : 30;
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 4 + 2;
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(113, 75, 103, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${Math.random() * 8 + 6}s ease-in-out infinite;
                animation-delay: ${Math.random() * -8}s;
            `;
            particlesContainer.appendChild(particle);
        }
    };

    // Inject particle keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0%, 100% { transform: translate(0, 0); opacity: 0.4; }
            25% { transform: translate(${Math.random() > 0.5 ? '' : '-'}30px, -40px); opacity: 0.8; }
            50% { transform: translate(${Math.random() > 0.5 ? '' : '-'}20px, -80px); opacity: 0.3; }
            75% { transform: translate(${Math.random() > 0.5 ? '' : '-'}40px, -40px); opacity: 0.7; }
        }
    `;
    document.head.appendChild(style);
    createParticles();

    // ─── Intersection Observer for animations ───
    const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards and elements for fade-in
    const animateElements = document.querySelectorAll(
        '.service-card, .skill-category, .portfolio-card, .process-step, .contact-card, .about-content, .about-image, .odoo-versions'
    );
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        fadeObserver.observe(el);
    });

    // Stats counter trigger
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsCounted) {
                statsCounted = true;
                statNumbers.forEach(el => countUp(el));
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsContainer = document.querySelector('.hero-stats');
    if (statsContainer) statsObserver.observe(statsContainer);

    // ─── Testimonials slider ───
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    let currentTestimonial = 0;
    let testimonialInterval;

    const showTestimonial = (index) => {
        testimonialCards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
        testimonialDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentTestimonial = index;
    };

    testimonialDots.forEach(dot => {
        dot.addEventListener('click', () => {
            showTestimonial(parseInt(dot.dataset.index, 10));
            resetTestimonialInterval();
        });
    });

    const resetTestimonialInterval = () => {
        clearInterval(testimonialInterval);
        testimonialInterval = setInterval(() => {
            showTestimonial((currentTestimonial + 1) % testimonialCards.length);
        }, 5000);
    };
    resetTestimonialInterval();

    // ─── Portfolio filter ───
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            portfolioCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp .4s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Inject filter animation
    const filterStyle = document.createElement('style');
    filterStyle.textContent = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(filterStyle);

    // ─── Contact form ───
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    // API URL configuration
    let API_URL;
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Local development - use Express backend
        API_URL = 'http://localhost:3000/api/contact';
    } else {
        // Production - use Netlify function
        API_URL = '/.netlify/functions/contact';
    }
    console.log('API_URL:', API_URL);

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Basic validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            formFeedback.textContent = '⚠ Veuillez remplir tous les champs obligatoires.';
            formFeedback.className = 'form-feedback error';
            return;
        }

        // Message length validation
        if (data.message.trim().length < 10) {
            formFeedback.textContent = '⚠ Le message doit contenir au moins 10 caractères.';
            formFeedback.className = 'form-feedback error';
            return;
        }

        if (data.message.length > 5000) {
            formFeedback.textContent = '⚠ Le message est trop long (maximum 5000 caractères).';
            formFeedback.className = 'form-feedback error';
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            formFeedback.textContent = '⚠ Veuillez entrer une adresse email valide.';
            formFeedback.className = 'form-feedback error';
            return;
        }

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;
        formFeedback.textContent = '';
        formFeedback.className = 'form-feedback';

        try {
            console.log('Sending to:', API_URL);
            console.log('Data:', data);

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            console.log('Response status:', response.status);
            const result = await response.json();
            console.log('Result:', result);

            if (response.ok && result.success) {
                // Show success modal instead of inline message
                showSuccessModal();
                contactForm.reset();

                // Analytics tracking (si configuré)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', {
                        event_category: 'Contact',
                        event_label: data.subject
                    });
                }
            } else {
                // Display validation errors if any
                if (result.details && Array.isArray(result.details)) {
                    throw new Error(result.details.join(', '));
                }
                throw new Error(result.error || 'Erreur lors de l\'envoi');
            }
        } catch (error) {
            console.error('Erreur complète:', error);
            let errorMsg = 'Erreur lors de l\'envoi. ';

            // Check if backend is reachable
            if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
                errorMsg = '❌ Impossible de contacter le serveur. Assurez-vous que le backend est lancé sur http://localhost:3000 ou écrivez-moi directement à tsitanakhyme@gmail.com';
            } else {
                errorMsg = '❌ ' + (error.message || 'Veuillez réessayer ou m\'écrire directement à tsitanakhyme@gmail.com');
            }

            formFeedback.textContent = errorMsg;
            formFeedback.className = 'form-feedback error';
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });

    // ─── Smooth scroll for all anchor links ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ─── Code window typing effect (subtle) ───
    const codeBody = document.querySelector('.code-body code');
    if (codeBody) {
        const originalHTML = codeBody.innerHTML;
        const plainText = codeBody.textContent;
        codeBody.innerHTML = '';
        codeBody.style.visibility = 'visible';

        let charIndex = 0;
        const typeSpeed = 15;

        const typeCode = () => {
            if (charIndex <= plainText.length) {
                // Show plain text while typing, switch to colored at end
                codeBody.textContent = plainText.substring(0, charIndex);
                charIndex++;
                setTimeout(typeCode, typeSpeed);
            } else {
                codeBody.innerHTML = originalHTML;
            }
        };

        // Start typing only when hero is visible
        const heroObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(typeCode, 800);
                heroObserver.disconnect();
            }
        });
        heroObserver.observe(document.getElementById('hero'));
    }

    // ─── Success Modal Functions ───
    window.showSuccessModal = function() {
        const modal = document.getElementById('successModal');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';

        // Create confetti effect
        createConfetti();
    };

    window.closeSuccessModal = function() {
        const modal = document.getElementById('successModal');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    };

    // Close modal on overlay click
    document.addEventListener('click', (e) => {
        const modal = document.getElementById('successModal');
        if (e.target === modal || e.target.classList.contains('success-modal-overlay')) {
            closeSuccessModal();
        }
    });

    // Confetti effect
    function createConfetti() {
        const colors = ['#714B67', '#8f6585', '#28c840', '#ffbd2e'];
        const confettiCount = 50;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}vw;
                top: -20px;
                opacity: ${Math.random() * 0.7 + 0.3};
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                z-index: 10001;
                pointer-events: none;
                animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
            `;
            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }
    }

    // Inject confetti animation
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(${Math.random() * 720}deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(confettiStyle);
});
