document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.fade-in-section');

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    const counterElement = document.getElementById('btc-counter');
    if (counterElement) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(counterElement, 21000000);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.8 });
        counterObserver.observe(counterElement);
    }
    
    function animateCounter(element, target) {
         let start = 0;
        const duration = 2000;
        const range = target - start;
        let current = start;
        
        const timer = setInterval(() => {
            const jump = Math.ceil(range / (duration / 16));
            current += jump;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.innerText = current.toLocaleString('pt-BR');
        }, 16);
    }
    
    const tableBody = document.getElementById('comparison-table-body');
    if(tableBody) {
        const tableObserver = new IntersectionObserver((entries, observer) => {
             if (entries[0].isIntersecting) {
                const rows = tableBody.querySelectorAll('tr');
                rows.forEach((row, index) => {
                    setTimeout(() => {
                        row.style.opacity = '1';
                        row.style.transform = 'translateX(0)';
                    }, index * 150);
                });
                observer.unobserve(tableBody);
             }
        }, { threshold: 0.5 });
        tableObserver.observe(tableBody);
    }

    const actionButton = document.getElementById('action-button');
    const modal = document.getElementById('action-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModalBtn = document.getElementById('close-modal-btn');

    function openModal() {
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalContent.classList.remove('opacity-0', 'scale-95');
        }, 10);
    }

    function closeModal() {
        modalContent.classList.add('opacity-0', 'scale-95');
        modal.classList.add('opacity-0');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }

    actionButton.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});

