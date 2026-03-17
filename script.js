document.addEventListener('DOMContentLoaded', () => {
    // === Mobile Nav Toggle ===
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            navToggle.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // Add fade-in classes
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply starting styles and observe
    const animatedElements = document.querySelectorAll('.product-card, .diff-banner, .about-header, .stat-card, .client-logo, .team-member, .comparison-card, .climax-content');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease-out ${index * 0.05}s, transform 0.6s ease-out ${index * 0.05}s`;
        observer.observe(el);
    });

    // Animate stats in dashboard
    setTimeout(() => {
        const dots = document.querySelectorAll('.status-dot');
        dots.forEach(dot => dot.classList.add('success'));
    }, 1500);

    // Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Count-up Animation for Metrics
    const metricNumbers = document.querySelectorAll('.metric-number');
    let hasCounted = false;

    const countUpObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasCounted) {
            hasCounted = true;
            metricNumbers.forEach(metric => {
                const targetStr = metric.getAttribute('data-target');
                if (!targetStr) return;
                const target = parseFloat(targetStr);
                if (isNaN(target)) return;
                
                const duration = 2000;
                const frames = 60;
                const step = target / frames;
                let current = 0;
                const isDecimal = target % 1 !== 0;

                const counter = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        metric.innerText = isDecimal ? target.toFixed(2) : target;
                        clearInterval(counter);
                    } else {
                        metric.innerText = isDecimal ? current.toFixed(2) : Math.floor(current);
                    }
                }, duration / frames);
            });
        }
    }, { threshold: 0.5 });

    const metricsSection = document.querySelector('.metrics');
    if (metricsSection) {
        countUpObserver.observe(metricsSection);
    }
});
