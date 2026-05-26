// navbar.js
export function renderNavbar() {
    return `
    <nav class="navbar">
        <div class="nav-container">
            <!-- LOGO -->
            <a href="#home" class="nav-logo" data-page="home">
            <img src="./image/logo.png" alt="CAFFE DE TERINE" class="logo-img">
                <span>CAFFE DE TERINE</span>
            </a>

            <!-- NAVIGATION -->
            <div class="nav-links">
                <a href="#home" data-page="home" class="nav-link active">หน้าแรก</a>

            <a href="#menu" data-page="menu" class="nav-link">เมนูกาแฟ</a>

            <a href="#about" data-page="about" class="nav-link">เกี่ยวกับเรา</a>

            <a href="#contact" data-page="contact" class="nav-link">ติดต่อ</a>
            </div>
        </div>
    </nav>
    `;
}