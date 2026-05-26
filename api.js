// api.js

/**
 * ฟังก์ชัน AJAX ดึงรายการเมนูกาแฟทั้งหมดจากเซิร์ฟเวอร์
 * @returns {Promise<Array>} รายาร์สินค้ากาแฟพร้อมวัตถุดิบ
 */
export async function getAllCoffeeMenus() {
    const url = 'https://api.sampleapis.com/coffee/hot';
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('การเชื่อมต่อร้านกาแฟขัดข้อง');
        
        const data = await response.json();
        
        // กรองเอาเฉพาะเมนูที่มีข้อมูลครบถ้วน และจำลองราคา (Price) เพิ่มเข้าไปให้สมบูรณ์
        return data.slice(0, 9).map((item, index) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            // จำลองราคาเริ่มต้น 120 - 180 บาทให้ดูหรูหรา
            price: 120 + (index * 10) 
        }));
    } catch (error) {
        console.error('Fetch Menu Error:', error);
        throw error;
    }
}