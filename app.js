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

// --- Afiş Alanı ---
// --- REKLAM SLIDER MOTORU (GELİŞMİŞ SENSÖRLÜ VERSİYON) ---

// Sayfada .slide elementleri tamamen oluşana kadar bekleyen akıllı kontrol
const adSliderInterval = setInterval(() => {
    const slides = document.querySelectorAll('.slide');

    // Eğer görseller sayfaya başarıyla enjekte edildiyse ve sayısı 0'dan büyükse
    if (slides && slides.length > 0) {
        clearInterval(adSliderInterval); // Aramayı durdur
        slideriBaslat(); // Motoru çalıştır
    }
}, 100); // Her 100 milisaniyede bir kontrol eder

function slideriBaslat() {
    const container = document.querySelector('.slider-container'); // Noktaları ekleyeceğimiz ana kutu
    const wrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('slider-onceki');
    const nextBtn = document.getElementById('slider-sonraki');

    if (!wrapper || slides.length === 0 || !container) return;

    let existingDots = document.querySelector('.dots-container');
    if (existingDots) existingDots.remove();

    const dotsContainer = document.createElement('div');
    dotsContainer.classList.add('dots-container');
    container.appendChild(dotsContainer);

    // Görsel sayısı kadar nokta üret
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');

        dot.addEventListener('click', () => {
            showSlide(index);
            resetAutoPlay();
        });

        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot'); // Üretilen noktaları seç

    let currentIndex = 0;
    let autoPlayInterval;

    function showSlide(index) {
        if (index >= slides.length) {
            currentIndex = 0; // Sona gelirse başa dön
        } else if (index < 0) {
            currentIndex = slides.length - 1; // Baştaysa sona git
        } else {
            currentIndex = index;
        }

        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active'); // Sadece bulunduğumuz görselin noktası beyaz olsun
    }

    function nextSlide() { showSlide(currentIndex + 1); }
    function prevSlide() { showSlide(currentIndex - 1); }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 4000); // 4 saniyede bir otomatik kayma
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });
    }

    showSlide(0);
    startAutoPlay();
}



// Sayfa yüklendiğinde senin belirlediğin 3 HTML parçasını çağırıyoruz
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("ad-placeholder", "components/ad.html");
    loadComponent("service-placeholder", "components/service.html");
    loadComponent("menu-placeholder", "components/menu.html");
    loadComponent("footer-placeholder", "components/footer.html");
});


