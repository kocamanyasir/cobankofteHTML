// --- 1. YUMUŞAK KAYDIRMA (EVENT DELEGATION İLE DİNAMİK YAPI) ---
// Artık direkt "nav a" aramıyoruz, tüm dokümanı dinleyip "Tıklanan şey bir link mi?" diye soruyoruz.
document.addEventListener('click', function (e) {
    // Tıklanan element veya onun kapsayıcısı "#" ile başlayan bir link mi kontrol et
    const anchor = e.target.closest('a[href^="#"]');

    if (anchor) {
        e.preventDefault(); // Küt diye atlamayı engeller
        const hedefId = anchor.getAttribute('href');

        // Sadece href="#" verilmiş boş linkleri es geçmek için
        if (hedefId !== '#') {
            const hedefBolum = document.querySelector(hedefId);
            if (hedefBolum) {
                hedefBolum.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }
});

// --- 2. DÖNEN DUYURU YAZISI (GECİKMELİ YÜKLEME KONTROLÜ) ---
// Duyuru alanı HTML'i fetch ile sonradan geleceği için, elementin var olup olmadığını 
// yarım saniyede bir kontrol eden "Akıllı Bekleyici" (Polling) ekliyoruz.
const duyuruKontrol = setInterval(() => {
    const duyuruAlani = document.getElementById('duyuru-alani');

    // Eğer duyuru alanı sayfaya fetch edildiyse animasyonu başlat
    if (duyuruAlani) {
        clearInterval(duyuruKontrol); // Elementi bulduk, artık aramayı durdur

        const duyurular = [
            "GELENEKSEL ÇİĞKÖFTE LEZZETİ",
            "ÜCRETSİZ EVLERE SERVİS İMKANI",
            "HER GÜN TAZE ÇİĞKÖFTE"
        ];

        let sira = 0;

        // Arka planı sabit tutup yazıyı span içine alıyoruz
        duyuruAlani.innerHTML = `<span id="duyuru-metni" style="transition: opacity 0.5s ease; opacity: 1; display: inline-block;">${duyurular[0]}</span>`;
        const duyuruMetni = document.getElementById('duyuru-metni');

        setInterval(() => {
            duyuruMetni.style.opacity = 0;

            setTimeout(() => {
                sira = (sira + 1) % duyurular.length;
                duyuruMetni.innerText = duyurular[sira];
                duyuruMetni.style.opacity = 1;
            }, 500);

        }, 3000);
    }
}, 500); // Her 500ms'de bir HTML yüklendi mi diye bakar
// Morphing ikon fonksiyonu
function menuTetikle() {
    // 3 farklı elementi buluyoruz
    var ikon = document.getElementById("nokta-ikon");
    var menu = document.getElementById("mobil-yan-menu");
    var overlay = document.getElementById("mobil-overlay");

    // Hepsine 'aktif' class'ını ekleyip çıkararak şovu başlatıyoruz
    ikon.classList.toggle("aktif");
    menu.classList.toggle("aktif");
    overlay.classList.toggle("aktif");
}
// HTML parçalarını yükleyen ortak fonksiyon
async function loadComponent(id, file) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Dosya bulunamadı: ${file}`);
        const html = await response.text();
        document.getElementById(id).innerHTML = html;
    } catch (error) {
        console.error("Bölüm yüklenirken hata oluştu:", error);
    }
}

// Sayfa yüklendiğinde senin belirlediğin 3 HTML parçasını çağırıyoruz
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("hero-placeholder", "components/hero.html");
    loadComponent("menu-placeholder", "components/menu.html");
    loadComponent("footer-placeholder", "components/footer.html");
});
