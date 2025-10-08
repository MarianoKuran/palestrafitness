document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('menuToggle');
    const menu = document.getElementById('mobileMenu');
    const panel = document.getElementById('mobilePanel');
    const backdrop = document.getElementById('backdrop');
    const closeInside = document.getElementById('menuCloseInside');
    const hambIcon = document.getElementById('hambIcon');
    const closeIcon = document.getElementById('closeIcon');
    const focusableSelector = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
    let lastFocused = null;

    function openMenu() {
        lastFocused = document.activeElement;
        menu.classList.remove('translate-y-full');
        menu.setAttribute('aria-hidden', 'false');
        toggle.setAttribute('aria-expanded', 'true');
        hambIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');

        // animations
        backdrop.classList.remove('opacity-0');
        backdrop.classList.add('opacity-100');
        panel.classList.remove('translate-y-4');
        panel.classList.remove('opacity-0');

        // lock scroll
        document.documentElement.classList.add('overflow-hidden');

        // focus first focusable
        const first = menu.querySelector(focusableSelector);
        if (first) first.focus();

        // trap focus
        document.addEventListener('focus', trapFocus, true);
    }

    function closeMenu() {
        menu.classList.add('translate-y-full');
        menu.setAttribute('aria-hidden', 'true');
        toggle.setAttribute('aria-expanded', 'false');
        hambIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');


        backdrop.classList.remove('opacity-100');
        backdrop.classList.add('opacity-0');

        document.documentElement.classList.remove('overflow-hidden');

        // restore focus
        if (lastFocused) lastFocused.focus();

        document.removeEventListener('focus', trapFocus, true);
    }

    function trapFocus(e) {
        if (!menu.contains(e.target)) {
            e.stopPropagation();
            // move focus into menu
            const focusable = menu.querySelectorAll(focusableSelector);
            if (focusable.length) focusable[0].focus();
        }
    }

    // toggle handlers
    toggle.addEventListener('click', () => {
        if (menu.getAttribute('aria-hidden') === 'false') closeMenu();
        else openMenu();
    });

    closeInside.addEventListener('click', closeMenu);

    // click backdrop to close
    backdrop.addEventListener('click', closeMenu);

    // close with ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.getAttribute('aria-hidden') === 'false') {
            closeMenu();
        }
    });

    // close when clicking a link
    document.querySelectorAll('[data-menu-link]').forEach((el) => {
        el.addEventListener('click', closeMenu);
    });

    // Inicialmente escondido (a11y)
    menu.setAttribute('aria-hidden', 'true');
})