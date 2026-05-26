import { renderNavbar } from './scripts/navbar.js';
import { renderFooter } from './scripts/footer.js';

const app = document.getElementById('app');


// ========================
// RENDER LAYOUT
// ========================

document.getElementById('navbar-placeholder').innerHTML =
    renderNavbar();

document.getElementById('footer-placeholder').innerHTML =
    renderFooter();


// ========================
// INIT ROUTER
// ========================

initRouter();

function initRouter() {

    // default route
    if (!location.hash) {

        location.hash = '#home';

    }

    // first load
    handleRoute();

    // route change
    window.addEventListener(
        'hashchange',
        handleRoute
    );

}


// ========================
// HANDLE ROUTE
// ========================

async function handleRoute() {

    // current page
    const page =
        location.hash.replace('#', '') || 'home';

    // active nav
    setActiveNav(page);

    // load content
    await loadPage(page);

}


// ========================
// LOAD PAGE
// ========================

async function loadPage(pageName) {

    try {

        // load html
        const response =
            await fetch(`./page/${pageName}.html`);

        if (!response.ok) {

            throw new Error(
                `Page "${pageName}" not found`
            );

        }

        const html = await response.text();

        // inject html
        app.innerHTML = html;

        // load page js
        const module =
            await import(`./scripts/${pageName}.js`);

        // init function
        const initFunctionName =
            `init${capitalize(pageName)}Page`;

        // run init
        if (module[initFunctionName]) {

            await module[initFunctionName]();

        }

    } catch (error) {

        console.error(error);

        app.innerHTML = `

            <section class="page-error">

                <h2>
                    โหลดหน้าไม่สำเร็จ
                </h2>

            </section>

        `;
    }
}


// ========================
// ACTIVE NAVBAR
// ========================

function setActiveNav(page) {

    const navLinks =
        document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {

        link.classList.remove('active');

        if (link.dataset.page === page) {

            link.classList.add('active');

        }

    });

}


// ========================
// CAPITALIZE
// ========================

function capitalize(str) {

    return str.charAt(0).toUpperCase() + str.slice(1);

}