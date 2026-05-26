// navbar.js

export function renderNavbar() {

    return `

    <nav class="navbar">
        <div class="nav-container">
            <a href="#home"class="nav-logo">☕ CAFFE DE TERINE</a>
            <div class="nav-links">
                <a href="#home"data-page="home"class="nav-link">หน้าแรก</a>
                <a href="#menu"data-page="menu"class="nav-link">เมนูกาแฟ</a>
                <a href="#about"data-page="about"class="nav-link">เกี่ยวกับเรา</a>
                <a href="#contact"data-page="contact"class="nav-link">ติดต่อ</a>
            </div>
        </div>
    </nav>
    `;
}