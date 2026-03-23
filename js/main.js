// EcoBuzios Blog - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.textContent = navMenu.classList.contains('active') ? '\u2715' : '\u2630';
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.textContent = '\u2630';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            e.preventDefault();
            var target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Add scroll effect to header
    var nav = document.querySelector('.main-nav');
    if (nav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                nav.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            } else {
                nav.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
            }
        });
    }

    // Animate cards on scroll
    var cards = document.querySelectorAll('.post-card, .category-card, .colunista-card, .value-card');
    if (cards.length > 0 && 'IntersectionObserver' in window) {
        cards.forEach(function(card) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(function(card) {
            observer.observe(card);
        });
    }
});
