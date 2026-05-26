import { renderNavbar } from './scripts/navbar.js';
import { renderFooter } from './scripts/footer.js';

const app = document.getElementById('app');
// ========================
// RENDER LAYOUT
// ========================
document.getElementById(
    'navbar-placeholder'
).innerHTML = renderNavbar();
document.getElementById(
    'footer-placeholder'
).innerHTML = renderFooter();
// ========================
// START
// ========================
initApp();
// ========================
// INIT APP
// ========================
async function initApp() {
    // โหลด section เพิ่ม
    await loadSections();
    // navbar scroll
    initNavbarScroll();
    // active default
    setActiveNav('home');
}
// ========================
// LOAD SECTION
// ========================
async function loadSections() {
    try {
        const pages = [
            'menu',
            'about',
            'contact'
        ];
        // โหลด HTML เพิ่มต่อท้าย
        for (const page of pages) {
            const response =
                await fetch(
                    `./page/${page}.html`
                );
            if (!response.ok) {
                throw new Error(
                    `โหลด ${page}.html ไม่สำเร็จ`
                );
            }
            const html =
                await response.text();
            // append
            app.innerHTML += html;
        }
        // load js
        for (const page of pages) {
            try {
                const module =
                    await import(
                        `./scripts/${page}.js`
                    );
                const initName =
                    `init${capitalize(page)}Page`;
                if (module[initName]) {
                    await module[initName]();
                }
            } catch (error) {
                console.error(
                    `โหลด JS ${page} ไม่สำเร็จ`,
                    error
                );
            }
        }

    } catch (error) {
        console.error(error);
    }
}
// ========================
// NAVBAR SCROLL
// ========================
function initNavbarScroll() {
    const navLinks =
        document.querySelectorAll(
            '.nav-link'
        );
    navLinks.forEach(link => {
        link.addEventListener(
            'click',
            (e) => {
                e.preventDefault();
                const targetId =
                    link.dataset.page;
                const target =
                    document.getElementById(
                        targetId
                    );
                if (!target) return;
                window.scrollTo({
                    top:target.offsetTop - 90,
                    behavior: 'smooth'
                });
                setActiveNav(targetId);
            }
        );
    });
    // scroll detect
    const sections =
        document.querySelectorAll(
            'section[id]'
        );
    window.addEventListener(
        'scroll',
        () => {
            let current = '';
            sections.forEach(section => {
                const top =
                    section.offsetTop - 200;
                const height =
                    section.offsetHeight;
                if (
                    window.scrollY >= top &&
                    window.scrollY <
                    top + height
                ) {
                    current = section.id;
                }
            });

            if (current) {
                setActiveNav(current);
            }
        }
    );
}
// ========================
// ACTIVE NAV
// ========================
function setActiveNav(page) {
    const navLinks =
        document.querySelectorAll(
            '.nav-link'
        );
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (
            link.dataset.page === page
        ) {
            link.classList.add('active');
        }
    });
}
// ========================
// CAPITALIZE
// ========================
function capitalize(str) {
    return (
        str.charAt(0).toUpperCase() +
        str.slice(1)
    );
}