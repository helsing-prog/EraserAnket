// Add animation delay for staggered appearance
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.profile-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Accordion functionality
    document.querySelectorAll('.accordion-list').forEach(list => {
        list.querySelectorAll('.accordion-item').forEach(item => {
            const head = item.querySelector('.acc-head');
            const panel = item.querySelector('.acc-panel');
            const updateHeight = () => {
                if (item.classList.contains('open')) {
                    panel.style.maxHeight = panel.scrollHeight + 'px';
                } else {
                    panel.style.maxHeight = '0px';
                }
            };
            if (head && panel) {
                head.addEventListener('click', () => {
                    item.classList.toggle('open');
                    updateHeight();
                });
                // init collapsed
                updateHeight();
            }
        });
    });
    
    // Плавная прокрутка для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Ленивая загрузка изображений
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});