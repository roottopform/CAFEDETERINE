import { getAllCoffeeMenus } from '../api.js';

export async function initMenuPage() {

    // IMPORTANT:
    // ต้อง query หลัง inject html แล้ว

    const menuContainer =
        document.getElementById('menuContainer');

    if (!menuContainer) {
        console.error('menuContainer not found');
        return;
    }

    try {

        const menus = await getAllCoffeeMenus();

        if (menus && menus.length > 0) {

            renderMenu(menus, menuContainer);

            setupScrollAnimation();

        } else {

            menuContainer.innerHTML = `
                <p style="text-align:center;">
                    ไม่พบข้อมูลเมนูกาแฟ
                </p>
            `;

        }

    } catch (error) {

        console.error(error);

        menuContainer.innerHTML = `
            <p style="text-align:center;">
                ขออภัย ไม่สามารถโหลดเมนูได้
            </p>
        `;
    }
}

// image selector
function getCoffeeImage(title) {

    if (!title) {
        return './image/default-coffee.png';
    }

    const name = title.toLowerCase();

    const images = {

        latte: './image/latte.png',
        caramellatte: './image/caramellatte.png',
        matchalatte: './image/matchalatte.png',
        americano: './image/americano.png',
        cappuccino: './image/cappuccino.png',
        espresso: './image/espresso.png',
        macchiato: './image/macchiato.png',
        mocha: './image/mocha.png',
        hotchocolate: './image/hotchocolate.png',
        default: './image/default-coffee.png'

    };

    if (
        name.includes('caramel latte') ||
        name.includes('คาราเมลลาเต้')
    ) {
        return images.caramellatte;
    }

    if (
        name.includes('matcha latte') ||
        name.includes('แมตช่าลาเต้')
    ) {
        return images.matchalatte;
    }

    if (
        name.includes('latte') ||
        name.includes('ลาเต้')
    ) {
        return images.latte;
    }

    if (
        name.includes('americano') ||
        name.includes('อเมริกาโน่')
    ) {
        return images.americano;
    }

    if (
        name.includes('cappuccino') ||
        name.includes('คาปูชิโน่')
    ) {
        return images.cappuccino;
    }

    if (
        name.includes('espresso') ||
        name.includes('เอสเปรสโซ')
    ) {
        return images.espresso;
    }

    if (
        name.includes('macchiato') ||
        name.includes('มัคคิอาโต้')
    ) {
        return images.macchiato;
    }

    if (
        name.includes('mocha') ||
        name.includes('มอคค่า')
    ) {
        return images.mocha;
    }

    if (
        name.includes('hot chocolate') ||
        name.includes('ช็อกโกแลตร้อน')
    ) {
        return images.hotchocolate;
    }

    return images.default;
}

// render menu
function renderMenu(menus, menuContainer) {

    menuContainer.innerHTML = menus.map(coffee => {

        const coffeeImgUrl =
            getCoffeeImage(coffee.title);

        return `

            <div class="coffee-card scroll-reveal">

                <div class="card-top-content">

                    <div class="card-image-container">

                        <img
                            src="${coffeeImgUrl}"
                            alt="${coffee.title}"
                            class="coffee-img"
                        >

                    </div>

                    <h3>
                        ${coffee.title || 'Coffee'}
                    </h3>

                    <p class="coffee-desc">
                        ${coffee.description || ''}
                    </p>

                </div>

                <div class="card-bottom-content">

                    <div class="price-tag">

                        ฿${coffee.price || '0'}

                        <span class="weight-text">
                            / 250g
                        </span>

                    </div>

                    <div class="action-buttons-group">

                        <button class="btn-buy">
                            สั่งซื้อเลย
                        </button>

                        <button class="btn-cart">
                            🛒
                        </button>

                    </div>

                </div>

            </div>

        `;

    }).join('');
}

// animation
function setupScrollAnimation() {

    const cards =
        document.querySelectorAll('.scroll-reveal');

    if (!cards.length) return;

    const observer =
        new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add('active');

                } else {

                    entry.target.classList.remove('active');

                }

            });

        });

    cards.forEach(card => observer.observe(card));

}