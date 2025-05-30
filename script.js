// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

// Initialize feature cards with animation
document.querySelectorAll('.feature-card').forEach((card) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add hover effects to agent items
document.querySelectorAll('.agent-item').forEach((item) => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px)';
    });
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// Add parallax effect to floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    document.querySelectorAll('.floating-element').forEach((element, index) => {
        const speed = (index + 1) * 0.3;
        element.style.transform = `translate3d(0, ${rate * speed}px, 0)`;
    });
});

// Add dynamic counter animation for stats (if stats section exists)
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-item h3');
    counters.forEach(counter => {
        const targetValue = counter.dataset.target || counter.innerText; // Use a data attribute if numbers are complex
        const target = parseInt(targetValue.replace(/[^0-9]/g, '')); // Clean non-numeric for safety

        if (!isNaN(target)) {
            let count = 0;
            const increment = target / 100 > 0 ? target / 100 : 1; // Ensure increment is at least 1
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    counter.innerText = target.toLocaleString(); // Or original string if it had text
                    clearInterval(timer);
                } else {
                    counter.innerText = Math.ceil(count).toLocaleString();
                }
            }, 20);
        }
    });
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
});

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add mouse tracking effect to CTA box
const ctaBox = document.querySelector('.cta-box');
if (ctaBox) {
    ctaBox.addEventListener('mousemove', (e) => {
        const rect = ctaBox.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        ctaBox.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    ctaBox.addEventListener('mouseleave', () => {
        ctaBox.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
}

// Add ripple effect to buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        let ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);

        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        setTimeout(() => {
            ripple.remove();
        }, 600); // Corresponds to animation duration
    });
});