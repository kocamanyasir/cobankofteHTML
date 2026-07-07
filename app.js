// En üstteki dönen yazı fonksiyonu
document.addEventListener("DOMContentLoaded", function () {

    // --- 1. YUMUŞAK KAYDIRMA (SMOOTH SCROLL) ---
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Küt diye atlamayı engeller

            const hedefBolum = document.querySelector(this.getAttribute('href'));

            if (hedefBolum) {
                hedefBolum.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const duyurular = [
        "GELENEKSEL ÇİĞKÖFTE LEZZETİ",
        "ÜCRETSİZ EVLERE SERVİS İMKANI",
        "HER GÜN TAZE ÇİĞKÖFTE"
    ];

    let sira = 0;
    const duyuruAlani = document.getElementById('duyuru-alani');

    if (duyuruAlani) {

        // Arka planı sabit tutup sadece yazıyı döndürmek için yazıyı bir span içine hapsediyoruz
        duyuruAlani.innerHTML = `<span id="duyuru-metni" style="transition: opacity 0.5s ease; opacity: 1; display: inline-block;">${duyurular[0]}</span>`;

        // Artık animasyonu ana kutuya değil, sadece içindeki bu yazıya uygulayacağız
        const duyuruMetni = document.getElementById('duyuru-metni');

        setInterval(() => {
            // Sadece içerdeki yazıyı yavaşça görünmez yap (Arka plan etkilenmez)
            duyuruMetni.style.opacity = 0;

            // Yarım saniye sonra yazıyı değiştir ve tekrar görünür yap
            setTimeout(() => {
                sira = (sira + 1) % duyurular.length;
                duyuruMetni.innerText = duyurular[sira];
                duyuruMetni.style.opacity = 1;
            }, 500);

        }, 3000);
    }

});

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
