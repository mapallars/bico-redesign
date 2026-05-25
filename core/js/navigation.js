document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;

    // Función helper para redirigir, manejando rutas relativas
    const navigateTo = (path) => {
        window.location.href = path;
    };

    // Mapeo de íconos/texto a rutas (relativo al directorio actual, asumiendo que todas las páginas están a un nivel del root)
    const navMap = {
        'home': '../home/index.html',
        'account_balance_wallet': '../bolsillos/index.html',
        'qr_code_scanner': '../qr/index.html',
        'history': '../movimientos/index.html',
        'person': '../perfil/index.html',
        'notifications': '../notificaciones/index.html',
        'add_circle': '../consignar/index.html',
        'Meter plata': '../consignar/index.html',
        'payments': '../retirar/index.html',
        'Sacar plata': '../retirar/index.html',
        'send': '../movimientos/index.html', // Fallback si no hay "enviar" explícito
        'Pagar QR': '../qr/index.html',
        'Cerrar sesión': '../onboarding/index.html'
    };

    // 1. Bottom Nav Bar
    const navButtons = document.querySelectorAll('nav > button, nav > div, nav > a');
    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.tagName.toLowerCase() === 'a') e.preventDefault();
            const icon = btn.querySelector('.material-symbols-outlined');
            if (icon) {
                const iconName = icon.getAttribute('data-icon') || icon.innerText.trim();
                if (navMap[iconName]) {
                    navigateTo(navMap[iconName]);
                }
            }
        });
    });

    // 2. Botón "Volver" (Back Button)
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(btn => {
        const icon = btn.querySelector('.material-symbols-outlined');
        if (icon) {
            const iconName = icon.getAttribute('data-icon') || icon.innerText.trim();
            if (iconName === 'arrow_back') {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    history.back();
                });
            }
        }

        // 3. Botones explícitos de "Cerrar sesión"
        if (btn.innerText.trim().toLowerCase() === 'cerrar sesión') {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                // Redirigir al root (pantalla simulada de inicio)
                window.parent.location.href = '../index.html';
            });
        }

        // Registrarse desde enlaces en texto
        if (btn.innerText.includes('Regístrate') || btn.innerText.includes('Registrarse')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo('../register/index.html');
            });
        }
    });

    // 4. Quick Actions (Acciones rápidas en home)
    const quickActions = document.querySelectorAll('section.grid button');
    quickActions.forEach(btn => {
        btn.addEventListener('click', () => {
            const span = btn.querySelector('span:not(.material-symbols-outlined)');
            if (span) {
                const text = span.innerText.trim();
                if (navMap[text]) {
                    navigateTo(navMap[text]);
                }
            }
        });
    });

    // 5. Encabezados y botones "Ver todos"
    const headings = document.querySelectorAll('h2');
    headings.forEach(h2 => {
        const title = h2.innerText.trim();
        const nextButton = h2.nextElementSibling;
        if (nextButton && nextButton.tagName.toLowerCase() === 'button' && nextButton.innerText.includes('Ver todos')) {
            nextButton.addEventListener('click', () => {
                if (title.includes('Bolsillos')) navigateTo('../bolsillos/index.html');
                if (title.includes('Movimientos')) navigateTo('../movimientos/index.html');
            });
        }
    });

    // 6. Header (Notificaciones o Perfil rápido)
    const headerBtns = document.querySelectorAll('header button');
    headerBtns.forEach(btn => {
        const icon = btn.querySelector('.material-symbols-outlined');
        if (icon) {
            const iconName = icon.getAttribute('data-icon') || icon.innerText.trim();
            if (iconName === 'notifications') {
                btn.addEventListener('click', () => {
                    navigateTo('../notificaciones/index.html');
                });
            }
        }
    });

    // 7. Resaltar estado activo en el Bottom Nav
    navButtons.forEach(btn => {
        const icon = btn.querySelector('.material-symbols-outlined');
        if (icon) {
            const iconName = icon.getAttribute('data-icon') || icon.innerText.trim();
            if (navMap[iconName] && currentPath.includes(navMap[iconName].replace('../', '').replace('/index.html', ''))) {
                // Activar estilos (ejemplo: fondo primary-container, texto on-primary-container)
                btn.classList.add('bg-primary-container', 'dark:bg-primary', 'text-on-primary-container', 'dark:text-on-primary', 'rounded-2xl', 'scale-90');
                btn.classList.remove('text-on-surface-variant', 'dark:text-outline-variant', 'hover:bg-surface-container-high');
                icon.style.fontVariationSettings = "'FILL' 1";
            } else {
                btn.classList.remove('bg-primary-container', 'dark:bg-primary', 'text-on-primary-container', 'dark:text-on-primary', 'rounded-2xl', 'scale-90');
                btn.classList.add('text-on-surface-variant', 'dark:text-outline-variant', 'hover:bg-surface-container-high');
                icon.style.fontVariationSettings = "'FILL' 0";
            }
        }
    });
});
