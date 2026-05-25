// core/js/animations.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject CSS
    if (!document.querySelector('link[href*="animations.css"]')) {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = '../core/css/animations.css';
        document.head.appendChild(cssLink);
    }

    // 2. Global Loader Element
    const loader = document.createElement('div');
    loader.className = 'fullscreen-loader';
    loader.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loader);

    window.showGlobalLoader = () => loader.classList.add('active');
    window.hideGlobalLoader = () => loader.classList.remove('active');

    // Remove loader automatically on pageshow (in case of back/forward cache)
    window.addEventListener('pageshow', () => {
        hideGlobalLoader();
    });

    // 3. Page Enter Animations (Staggered)
    // Target main content blocks to fade and slide up
    const mainSections = document.querySelectorAll('main > section, main > div, main > header, main > form > div');
    mainSections.forEach((el, index) => {
        el.classList.add('page-enter');
        if (index === 0) el.classList.add('stagger-1');
        else if (index === 1) el.classList.add('stagger-2');
        else if (index === 2) el.classList.add('stagger-3');
        else el.classList.add('stagger-4');
    });

    // 4. Skeleton Simulation for Dashboard and Lists
    // Apply skeleton to specific cards on load, then remove after a short delay
    const path = window.location.pathname;
    const isDashboardOrList = path.includes('home') || path.includes('bolsillos') || path.includes('movimientos');

    if (isDashboardOrList) {
        // Target specific UI elements that represent data
        const skeletonTargets = document.querySelectorAll(
            '.bg-white.rounded-\\[24px\\], ' + // Saldo card
            '.grid.grid-cols-4 > button, ' + // Quick actions
            '.overflow-x-auto > div, ' + // Bolsillos
            '.bg-white.rounded-3xl > div.flex.items-center, ' + // Movimientos list items
            '.method-card' + // Retirar/Consignar methods
            '.skeletoned'
        );

        skeletonTargets.forEach(el => el.classList.add('skeleton-box'));

        setTimeout(() => {
            skeletonTargets.forEach(el => el.classList.remove('skeleton-box'));
        }, 2000); // 800ms shimmer effect for premium feel
    }

    // 5. Ripple Effect on Buttons
    const buttons = document.querySelectorAll('button:not(header button), .method-card, .bg-primary-container');
    buttons.forEach(btn => {
        // Only apply if it doesn't already have it, and exclude small icon buttons
        if (!btn.classList.contains('ripple-btn') && btn.offsetWidth > 40) {
            btn.classList.add('ripple-btn');
            btn.addEventListener('click', function (e) {
                if (btn.disabled) return;

                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('span');
                ripple.classList.add('ripple-span');

                const size = Math.max(rect.width, rect.height) * 1.5;
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${x - size / 2}px`;
                ripple.style.top = `${y - size / 2}px`;

                // Adjust ripple color based on button background
                const isDarkText = getComputedStyle(btn).color === 'rgb(255, 255, 255)';
                ripple.style.backgroundColor = isDarkText ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.1)';

                btn.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        }
    });

    // 6. Loader triggers
    // Handle manual click events on forms/buttons that navigate
    document.body.addEventListener('click', (e) => {
        const target = e.target.closest('a[href], nav button, nav div, button[onclick*="window.location"]');
        if (target) {
            // Check if it's a valid link or nav action
            let href = target.getAttribute('href');
            let isNav = target.closest('nav');

            if (isNav || (href && href !== '#' && !href.startsWith('javascript'))) {
                showGlobalLoader();
            } else if (target.hasAttribute('onclick') && target.getAttribute('onclick').includes('window.location')) {
                // For direct JS navigations
                showGlobalLoader();
            }
        }
    });

    // Handle standard form submissions
    window.addEventListener('submit', (e) => {
        setTimeout(() => {
            if (!e.defaultPrevented) {
                showGlobalLoader();
            }
        }, 10);
    });
});
