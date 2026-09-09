document.addEventListener('DOMContentLoaded', function() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
  
  // Mobil cihaz tespiti
  if (isMobile) {
    document.body.classList.add('touch-device');
  }
  
  window.addEventListener('load', function() {
    loadBackgroundVideo();
    createVideoParticles(); // Video parçacıklarını oluştur
    
    setupLanguageSwitcher();
    
    // Gelişmiş Başlık Kelime Animasyonu
    const heroTitle = document.querySelector('.header__container h1');
    if (heroTitle) {
      let delay = 0;
      const processedNodes = [];

      function processNodeForAnimation(node) {
        if (node.nodeType === Node.TEXT_NODE) {
          const words = node.textContent.split(/\s+/).filter(word => word.length > 0);
          const fragment = document.createDocumentFragment();
          words.forEach((word, index) => {
            const wordSpan = document.createElement('span');
            wordSpan.textContent = word;
            wordSpan.classList.add('hero-title-word');
            fragment.appendChild(wordSpan);
            if (index < words.length - 1) {
              fragment.appendChild(document.createTextNode(' ')); // Kelimeler arasına boşluk ekle
            }
            
            setTimeout(() => {
              wordSpan.classList.add('visible');
            }, delay * 300); // Gecikme artırıldı (100ms -> 300ms)
            delay++;
          });
          return fragment;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          // data-i18n içeren span gibi elementleri ve içeriklerini koru
          // Ancak bu elementlerin altındaki metinleri de işleyebiliriz.
          const newNode = node.cloneNode(false); // Elementi kopyala, çocukları değil
          Array.from(node.childNodes).forEach(childNode => {
            newNode.appendChild(processNodeForAnimation(childNode));
          });
          return newNode;
        }
        return node.cloneNode(true); // Diğer düğüm türlerini olduğu gibi kopyala
      }

      // Orijinal çocukları bir diziye kopyala çünkü DOM canlı koleksiyonu değişecek
      const childNodesCopy = Array.from(heroTitle.childNodes);
      heroTitle.innerHTML = ''; // Başlığı temizle
      
      childNodesCopy.forEach(child => {
        heroTitle.appendChild(processNodeForAnimation(child));
      });
    }
    
    setTimeout(() => {
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }
    }, 1000);
  });
  
  setupContactForm();
  
  window.addEventListener('scroll', highlightCurrentSection);
  window.addEventListener('orientationchange', handleOrientationChange);
  
  setupMobileMenu();
  setupBackToTop();
});

// Sticky Navigation
const nav = document.querySelector('nav');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  // Sticky nav with hide on scroll down
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > 50) {
    nav.style.padding = '1rem 2rem';
    nav.style.backgroundColor = 'rgba(9, 12, 16, 0.95)';
  } else {
    nav.style.padding = '1.5rem 2rem';
    nav.style.backgroundColor = 'rgba(9, 12, 16, 0.8)';
  }
  
  // Mobil cihazlarda navigasyonun kaybolmasını iptal ettik
  /*
  // Auto-hide nav on scroll down (only on mobile)
  if (window.innerWidth <= 768) {
    if (currentScrollY > lastScrollY && currentScrollY > 300) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }
  }
  */
  
  // Her durumda navigasyon görünür olsun
  nav.style.transform = 'translateY(0)';
  
  lastScrollY = currentScrollY;
});


// Smooth Scrolling for Buttons and Navigation Links
document.querySelector('.btn').addEventListener('click', () => {
  document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      // Adjust for mobile screen
      const isMobile = window.innerWidth <= 768;
      const offset = isMobile ? -60 : -80; // Different offset for mobile
      
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset + offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

document.querySelector('.video').addEventListener('click', (e) => {
  // Allow default action to navigate to GitHub
});

// YouTube butonuna tıklama
const youtubeBtn = document.querySelector('.youtube-btn');
if (youtubeBtn) {
  youtubeBtn.addEventListener('click', (e) => {
    // Allow default action to navigate to YouTube
  });
}

// Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('active');
  } else {
    backToTopBtn.classList.remove('active');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Add Animation to Elements on Hover
const animateElements = (elements, enterStyles, leaveStyles) => {
  elements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      Object.keys(enterStyles).forEach(key => {
        element.style[key] = enterStyles[key];
      });
    });

    element.addEventListener('mouseleave', () => {
      Object.keys(leaveStyles).forEach(key => {
        element.style.border = '1px solid transparent';
        element.style.boxShadow = 'none';
      });
    });
  });
};

// Service Cards Animation
const serviceCards = document.querySelectorAll('.service__card');
animateElements(
  serviceCards, 
  { 
    transform: 'translateY(-10px)', 
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
  },
  {
    transform: 'translateY(0)',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
  }
);

// Project Cards Animation
const projectCards = document.querySelectorAll('.project__card');
animateElements(
  projectCards, 
  { 
    transform: 'translateY(-10px)', 
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)'
  },
  {
    transform: 'translateY(0)',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)'
  }
);

// NS logosunu düzeltme
document.addEventListener('DOMContentLoaded', function() {
  const splashLogo = document.querySelector('.splash-logo');
  if (splashLogo) {
    // Logo simgesini düzelt
    const logoIcon = splashLogo.querySelector('.logo-icon');
    if (logoIcon) {
      logoIcon.style.fontSize = "30px";
      logoIcon.style.marginRight = "5px";
    }
    
    // NS yazısını düzelt
    const nsText = splashLogo.querySelector('span');
    if (nsText) {
      nsText.style.marginLeft = "4px";
      nsText.style.fontSize = "26px";
    }
  }
});

// Mobil dokunmatik kaydırma desteği
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

// Dokunmatik kaydırma olaylarını ele alma
document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}, false);

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  touchEndY = e.changedTouches[0].screenY;
  // Kaydırma işlemini kaldırdık - handleSwipe() fonksiyonu artık çağrılmıyor
}, false);

// Lazy loading for images
if ('loading' in HTMLImageElement.prototype) {
  // Browser supports native lazy loading
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.setAttribute('loading', 'lazy');
  });
} else {
  // Load lazy-loading polyfill
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
  
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.classList.add('lazyload');
    img.setAttribute('data-src', img.src);
    img.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
  });
}

// Animasyon optimizasyonu - performans için
// Sadece görünür alanlarda animasyonları etkinleştir
const animateOnScroll = () => {
  // AOS kütüphanesi tarafından eklenen öğeler
  const animatedElements = document.querySelectorAll('[data-aos]');
  
  if ('IntersectionObserver' in window) {
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Öğe görünür olduğunda AOS animasyonunu manuel olarak tetikle
          entry.target.classList.add('aos-animate');
        } else if (!entry.target.classList.contains('aos-once')) {
          // one-time animasyonlar için kontrol
          entry.target.classList.remove('aos-animate');
        }
      });
    }, {
      rootMargin: '0px',
      threshold: 0.1
    });
    
    animatedElements.forEach(el => {
      animationObserver.observe(el);
    });
  }
};

// AOS.init çağrısından sonra özel animasyon yönetimi ekle
document.addEventListener('DOMContentLoaded', () => {
  // AOS başlatılınca manual optimizasyonumuzu etkinleştir
  setTimeout(() => {
    animateOnScroll();
  }, 100);
  
  // Aktif bölümü vurgulama ve menü öğelerini güncelleme
  window.addEventListener('scroll', () => {
    highlightCurrentSection();
  });
  
  // Sayfa yüklendikten sonra aktif bölümü kontrol et
  highlightCurrentSection();
  
  // Cihaz yönü değiştiğinde layout'u düzelt
  window.addEventListener('orientationchange', () => {
    // Oryantasyon değişiminden sonra layout düzeltmeleri
    setTimeout(() => {
      // Menü açıksa kapat
      if (navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        // body.classList.remove('menu-open'); // Artık bu özelliği kullanmıyoruz
      }
      
      // AOS elemanlarını yeniden başlat
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }
    }, 200);
  });
  
  // Aktif bölümü vurgulama fonksiyonu
  function highlightCurrentSection() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav__link');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = sectionId;
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      const href = item.getAttribute('href');
      
      if (href && href.includes(currentSection) && currentSection !== '') {
        item.classList.add('active');
      }
    });
  }
});

// setupContactForm fonksiyonu - Form işlemlerini yönetir
function setupContactForm() {
  const form = document.getElementById('contactForm');
  
  if (!form) return;
  
  // Form animasyonları
  const formInputs = form.querySelectorAll('input, textarea');
  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.style.border = '1px solid var(--primary-color)';
      input.style.boxShadow = '0 0 0 2px rgba(242, 72, 11, 0.2)';
    });
    
    input.addEventListener('blur', () => {
      input.style.border = '1px solid transparent';
      input.style.boxShadow = 'none';
    });
  });
  
  // Form gönderimi için özel kod kaldırıldı
  // FormSubmit.co servisi otomatik olarak formu işleyecek
}

// setupBackToTop fonksiyonu - Sayfa başına dönüş butonunu yönetir
function setupBackToTop() {
  const backToTop = document.querySelector('.back-to-top');
  
  if (!backToTop) return;
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('active');
    } else {
      backToTop.classList.remove('active');
    }
  });
  
  backToTop.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Dil değiştirme işlevleri
function setupLanguageSwitcher() {

  // Dil butonlarını seç
  const languageButtons = document.querySelectorAll('.nav-language-btn');
  
  // Dil butonlarını etkinleştir
  languageButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const lang = this.getAttribute('data-lang');

      // Dili değiştir
      changeLanguage(lang);
      
      return false;
    });
  });
  
  // Tarayıcı dilini algıla veya kaydedilmiş dili kullan
  const savedLanguage = localStorage.getItem('preferredLanguage');
  if (savedLanguage) {
    changeLanguage(savedLanguage);
  } else {
    // Tarayıcı dilini algıla
    const browserLang = navigator.language || navigator.userLanguage;
    
    // Tarayıcı dilini kontrol et ve uygun dili ayarla
    if (browserLang.startsWith('tr')) {
      changeLanguage('tr');
    } else {
      changeLanguage('en');
    }
  }
}

// Dil değiştirme fonksiyonu
function changeLanguage(lang) {
  const supportedLanguages = new Set(['tr', 'en']);
  if (!supportedLanguages.has(lang)) return;
  if (document.documentElement.getAttribute('lang') === lang) return;

  const scrollPosition = window.scrollY;
  const clickedButton = document.querySelector(`.nav-language-btn[data-lang="${lang}"]`);
  const langOverlay = document.querySelector('.language-transition-overlay');

  clickedButton?.classList.add('switching');
  document.querySelectorAll('[data-i18n]').forEach(element => {
    element.classList.add('content-changing');
  });
  langOverlay?.classList.add('active');

  fetch(`./assets/i18n/${lang}.json`)
    .then(response => {
      if (!response.ok) throw new Error(`Dil dosyası yüklenemedi: ${response.status}`);
      return response.json();
    })
    .then(translations => {
      updatePageContent(translations);

      document.querySelectorAll('[data-i18n]').forEach((element, index) => {
        element.classList.remove('content-changing');
        element.classList.add('content-changed');
        element.style.animationDelay = `${index * 0.03}s`;
        setTimeout(() => {
          element.classList.remove('content-changed');
          element.style.animationDelay = '';
        }, 800);
      });

      localStorage.setItem('preferredLanguage', lang);
      document.documentElement.setAttribute('lang', lang);
      window.scrollTo(0, scrollPosition);
    })
    .catch(error => {
      console.error('Dil değiştirme hatası:', error);
      document.querySelectorAll('[data-i18n]').forEach(element => {
        element.classList.remove('content-changing');
      });
    })
    .finally(() => {
      clickedButton?.classList.remove('switching');
      setTimeout(() => langOverlay?.classList.remove('active'), 250);
    });
}
// Sayfa içeriğini güncelleme
function updatePageContent(translations) {
  // data-i18n özelliği olan tüm elementleri bul
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    
    // Çeviri mevcutsa içeriği güncelle
    if (translations[key]) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        // Form elementleri için placeholder değerini güncelle
        element.placeholder = translations[key];
      } else {
        // HTML içeriğini güncelle (spanlar korunacak)
        element.innerHTML = translations[key];
      }
    }
  });
}

// Arkaplan videosunu yükleme fonksiyonu
function loadBackgroundVideo() {
  const videoElement = document.getElementById('background-video');
  
  if (!videoElement) return;
  
  const backgroundVideos = [
    './assets/media/backgrounds/background-01.mp4',
    './assets/media/backgrounds/background-02.mp4',
    './assets/media/backgrounds/background-03.mp4',
    './assets/media/backgrounds/background-04.mp4',
    './assets/media/backgrounds/background-05.mp4',
    './assets/media/backgrounds/background-06.mp4',
    './assets/media/backgrounds/background-07.mp4',
    './assets/media/backgrounds/background-08.mp4',
    './assets/media/backgrounds/background-09.mp4',
    './assets/media/backgrounds/background-10.mp4',
    './assets/media/backgrounds/background-11.mp4'
  ];

  // Videoda zaten bir kaynak varsa yenisini ekleme
  if (videoElement.querySelector('source')) {
    return;
  }
  
  // Rastgele bir video seç
  const randomVideo = backgroundVideos[Math.floor(Math.random() * backgroundVideos.length)];
  
  // Video kaynağını ayarla
  const source = document.createElement('source');
  source.src = randomVideo;
  source.type = 'video/mp4';
  
  // Kaynağı video elementine ekle
  videoElement.appendChild(source);
  
  // Video yüklenemezse hata işleme
  videoElement.addEventListener('error', function() {
    console.error('Video yüklenirken hata oluştu. Varsayılan video kullanılıyor.');
    // Hata durumunda ilk videoyu kullan
    source.src = backgroundVideos[0];
    videoElement.load();
  });
  
  // Videoyu yeniden yükle
  videoElement.load();
}

// Mobil menü fonksiyonları
function setupMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav__links');
  const menuLinks = document.querySelectorAll('.nav__link');
  const menuOverlay = document.querySelector('.menu-overlay');

  if (!hamburger || !navLinks) return;

  const setMenuOpen = (isOpen) => {
    document.body.classList.toggle('menu-open', isOpen);
    hamburger.classList.toggle('active', isOpen);
    navLinks.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  };

  hamburger.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    setMenuOpen(!document.body.classList.contains('menu-open'));
  });

  menuLinks.forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
  menuOverlay?.addEventListener('click', () => setMenuOpen(false));

  document.addEventListener('click', event => {
    if (!document.body.classList.contains('menu-open')) return;
    if (!event.target.closest('.nav__links') && !event.target.closest('.hamburger')) {
      setMenuOpen(false);
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setMenuOpen(false);
  });
}
// Yönlendirme değişikliği
function handleOrientationChange() {

  // Menüyü kapat
  document.body.classList.remove('menu-open');
  
  // Animasyonları yenile
  if (typeof AOS !== 'undefined') {
    setTimeout(() => {
      AOS.refresh();
    }, 500);
  }
}

// Video üzerine kırmızı parçacıklar ekleyen fonksiyon
function createVideoParticles() {
  const videoBackground = document.querySelector('.video-background');
  if (!videoBackground) {
    console.error('Video arka planı bulunamadı');
    return;
  }

  // Parçacıklar için bir konteyner oluştur
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'video-particles-container';
  particlesContainer.style.position = 'absolute';
  particlesContainer.style.top = '0';
  particlesContainer.style.left = '0';
  particlesContainer.style.width = '100%';
  particlesContainer.style.height = '100%';
  particlesContainer.style.overflow = 'hidden';
  particlesContainer.style.pointerEvents = 'none';
  particlesContainer.style.zIndex = '2';
  
  // Cihaz türüne göre parçacık sayısını ayarla
  const isMobile = window.innerWidth <= 768;
  const particleCount = isMobile ? 25 : 40;
  
  // Parçacıkları sakla
  const particles = [];
  
  // Parçacıklar için değişkenler
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let mouseSpeedX = 0;
  let mouseSpeedY = 0;
  let lastMouseX = mouseX;
  let lastMouseY = mouseY;
  let partyMode = false;
  let partyTimeout;
  let touchActive = false;
  let touchTimeout;
  
  // Video parçacıkları için etkileşimleri ayarla
  // Fare takibi
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Dokunma takibi
  document.addEventListener('touchmove', (e) => {
    if (e.touches[0]) {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
      touchActive = true;
      
      // Dokunma bitiminde touchActive'i sıfırla
      clearTimeout(touchTimeout);
      touchTimeout = setTimeout(() => {
        touchActive = false;
      }, 100);
    }
  }, { passive: true });
  
  document.addEventListener('touchend', () => {
    touchActive = false;
  }, { passive: true });
  
  // Parti modunda olduğunu göster
  const showPartyModeActive = () => {

    // Video konteynırına parti modu sınıfı ekle
    particlesContainer.classList.add('party-mode');
    
    // Parçacıkları renklendir
    const particleElements = document.querySelectorAll('.video-particle');
    particleElements.forEach(particle => {
      // Renkli parti modu görünümünü uygula
      const randomHue = Math.floor(Math.random() * 360);
      particle.style.backgroundColor = `hsla(${randomHue}, 90%, 60%, ${Math.random() * 0.7 + 0.3})`;
      particle.style.boxShadow = `0 0 ${Math.floor(Math.random() * 15 + 10)}px hsla(${randomHue}, 90%, 70%, 0.8)`;
    });
    
    // 8 saniye sonra parti modunu kapat
    partyTimeout = setTimeout(() => {
      partyMode = false;
      particlesContainer.classList.remove('party-mode');

    }, 8000);
  };
  
  // Çift tıklama ile parti modu
  videoBackground.addEventListener('dblclick', (e) => {
    // Video arka planına çift tıklandığında parti modunu etkinleştir
    partyMode = !partyMode;
    
    // Parti modunu belirli bir süre sonra kapat
    clearTimeout(partyTimeout);
    
    if (partyMode) {

      showPartyModeActive();
    } else {
      particlesContainer.classList.remove('party-mode');

    }
    
    // Parti modunda sayfadaki tıklama dalgasını engellemek için bubbling'i engelle
    e.stopPropagation();
  });
  
  // Mobil için çift dokunma parti modu
  let lastTap = 0;
  videoBackground.addEventListener('touchend', (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 300 && tapLength > 0) {
      partyMode = !partyMode;
      
      // Parti modunu belirli bir süre sonra kapat
      clearTimeout(partyTimeout);
      
      if (partyMode) {

        showPartyModeActive();
      } else {
        particlesContainer.classList.remove('party-mode');

      }
      
      // Parti modunda tıklama dalgasını engellemek için bubbling'i engelle
      e.stopPropagation();
    }
    lastTap = currentTime;
  });
  
  // Her kareyi işle
  setInterval(() => {
    // Fare hızını hesapla
    mouseSpeedX = mouseX - lastMouseX;
    mouseSpeedY = mouseY - lastMouseY;
    lastMouseX = mouseX;
    lastMouseY = mouseY;
  }, 50);
  
  // Parçacık sınıfı
  class Particle {
    constructor() {
      this.element = document.createElement('div');
      this.element.className = 'video-particle';
      
      // Rastgele renk tonu
      this.hue = Math.floor(Math.random() * 60) + 10; // Kırmızı-turuncu arası
      
      // Parçacık stili
      this.element.style.position = 'absolute';
      this.size = Math.random() * 6 + 3; // Biraz daha büyük parçacıklar
      this.element.style.width = this.size + 'px';
      this.element.style.height = this.size + 'px';
      this.element.style.backgroundColor = `hsla(${this.hue}, 80%, 50%, ${Math.random() * 0.5 + 0.3})`;
      this.element.style.borderRadius = '50%';
      this.element.style.boxShadow = `0 0 ${Math.floor(Math.random() * 10 + 5)}px hsla(${this.hue}, 80%, 50%, 0.7)`;
      this.element.style.zIndex = '3';
      this.element.style.transition = 'background-color 0.5s ease, box-shadow 0.5s ease';
      
      // Pozisyon
      this.x = Math.random() * window.innerWidth;
      this.y = Math.random() * window.innerHeight;
      
      // Hız
      this.vx = Math.random() * 1 - 0.5;
      this.vy = Math.random() * 1 - 0.5;
      
      // Takip etme parametreleri
      this.followSpeed = Math.random() * 0.03 + 0.01; // Takip hızı
      this.distanceFromMouse = Math.random() * 100 + 50; // Fareden uzaklık
      this.angle = Math.random() * Math.PI * 2; // Başlangıç açısı
      this.rotationSpeed = (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1); // Dönüş hızı
      
      // Hedef nokta (doğal hareket için)
      this.targetX = this.x;
      this.targetY = this.y;
      this.newTargetCountdown = 0;
      
      // Başlangıç pozisyonu
      this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
      
      // Konteyner'a ekle
      particlesContainer.appendChild(this.element);
    }
    
    update() {
      // Fare/dokunmatik pozisyonu ile mesafeyi hesapla
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (partyMode) {
        // Parti modu - fare etrafında dönerek hareket
        this.angle += this.rotationSpeed;
        const targetX = mouseX + Math.cos(this.angle) * this.distanceFromMouse;
        const targetY = mouseY + Math.sin(this.angle) * this.distanceFromMouse;
        
        // Hedef noktaya doğru hareket et
        this.vx = (targetX - this.x) * this.followSpeed * 2;
        this.vy = (targetY - this.y) * this.followSpeed * 2;
      } else {
        // Yeni hedef noktası belirleme (daha doğal hareket için)
        if (this.newTargetCountdown <= 0) {
          if (Math.random() < 0.3) { // %30 olasılıkla fareyi takip et
            this.targetX = mouseX + (Math.random() * 100 - 50);
            this.targetY = mouseY + (Math.random() * 100 - 50);
          } else {
            this.targetX = Math.random() * window.innerWidth;
            this.targetY = Math.random() * window.innerHeight;
          }
          this.newTargetCountdown = Math.random() * 150 + 30;
        } else {
          this.newTargetCountdown--;
        }
        
        // Doğal hareket bileşeni
        const naturalDx = this.targetX - this.x;
        const naturalDy = this.targetY - this.y;
        const naturalInfluence = 0.003; // Hedef noktaya gidiş gücü
        
        this.vx += naturalDx * naturalInfluence;
        this.vy += naturalDy * naturalInfluence;
        
        // Fare hızı ile sürüklenme etkisi
        if (Math.abs(mouseSpeedX) > 5 || Math.abs(mouseSpeedY) > 5) {
          this.vx += mouseSpeedX * 0.02;
          this.vy += mouseSpeedY * 0.02;
        }
        
        // Fare yakınsa çekici kuvvet uygula
        if (distance < 150 && !touchActive) {
          const attraction = (150 - distance) / 150 * 0.05;
          this.vx += dx * attraction;
          this.vy += dy * attraction;
          
          // Fare yakınındaki parçacıkların rengini değiştir
          this.element.style.backgroundColor = `hsla(${this.hue + 30}, 80%, 60%, ${Math.random() * 0.4 + 0.6})`;
          this.element.style.boxShadow = `0 0 ${Math.floor(Math.random() * 15 + 8)}px hsla(${this.hue + 30}, 80%, 60%, 0.8)`;
        } else {
          // Normal renk (yavaşça değişen)
          if (Math.random() < 0.02) { // Renk değişimi için düşük olasılık
            this.element.style.backgroundColor = `hsla(${this.hue}, 80%, 50%, ${Math.random() * 0.5 + 0.3})`;
            this.element.style.boxShadow = `0 0 ${Math.floor(Math.random() * 10 + 5)}px hsla(${this.hue}, 80%, 50%, 0.7)`;
          }
        }
      }
      
      // Hız sınırlama
      const maxSpeed = isMobile ? 4 : 3; // Mobilde daha hızlı hareket
      this.vx = Math.max(Math.min(this.vx, maxSpeed), -maxSpeed);
      this.vy = Math.max(Math.min(this.vy, maxSpeed), -maxSpeed);
      
      // Sürtünme
      this.vx *= 0.98;
      this.vy *= 0.98;
      
      // Pozisyon güncelleme
      this.x += this.vx;
      this.y += this.vy;
      
      // Ekran sınırları kontrolü - ekranın dışına çıkan parçacıkları içeri geri getir
      if (this.x < 0) {
        this.x = 0;
        this.vx *= -1;
      } else if (this.x > window.innerWidth) {
        this.x = window.innerWidth;
        this.vx *= -1;
      }
      
      if (this.y < 0) {
        this.y = 0;
        this.vy *= -1;
      } else if (this.y > window.innerHeight) {
        this.y = window.innerHeight;
        this.vy *= -1;
      }
      
      // DOM elementini güncelle - CSS transform ile pozisyonu değiştir
      this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
  }
  
  // Parçacıkları oluştur
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  // Pencere yeniden boyutlandırıldığında parçacıkları güncelle
  window.addEventListener('resize', () => {
    particles.forEach(particle => {
      // Ekran dışındaki parçacıkları ekran içine al
      if (particle.x > window.innerWidth) particle.x = window.innerWidth;
      if (particle.y > window.innerHeight) particle.y = window.innerHeight;
    });
  });
  
  // Animasyon fonksiyonu
  function animate() {
    particles.forEach(particle => {
      particle.update();
    });
    
    requestAnimationFrame(animate);
  }
  
  // Animasyonu başlat
  animate();
  
  // Video arka planına ekle
  videoBackground.appendChild(particlesContainer);

}

// Yeni eklenecek kod: Navigasyon çubuğunu kaydırmaya duyarlı yap
window.addEventListener('scroll', function() {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) { // 50 piksel kaydırıldıktan sonra
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Modal İşlevselliği
document.addEventListener('DOMContentLoaded', () => {
  const projectCards = document.querySelectorAll('[data-modal-target]');
  const modals = document.querySelectorAll('.modal');
  const body = document.body;

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const modalId = card.getAttribute('data-modal-target');
      const modal = document.getElementById(modalId);
      if (modal) {
        openModal(modal);
      }
    });
  });

  modals.forEach(modal => {
    const closeButton = modal.querySelector('.modal-close-button');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        closeModal(modal);
      });
    }

    // Modal dışına tıklanınca kapat
    modal.addEventListener('click', (event) => {
      if (event.target === modal) { // Sadece modalın kendisine (içeriğe değil) tıklanırsa
        closeModal(modal);
      }
    });
  });

  function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('open');
    body.style.overflow = 'hidden'; // Arka planın kaymasını engelle
    // ESC tuşu ile kapatma olayını ekle
    document.addEventListener('keydown', escapeKeyListener);
  }

  function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('open');
    body.style.overflow = 'auto'; // Arka plan kaydırmasını geri getir
    // ESC tuşu ile kapatma olayını kaldır
    document.removeEventListener('keydown', escapeKeyListener);
  }
  
  // ESC tuşuna basıldığında açık olan modalı kapatmak için global bir fonksiyon
  function escapeKeyListener(event) {
    if (event.key === 'Escape') {
      const openModalElement = document.querySelector('.modal.open');
      if (openModalElement) {
        closeModal(openModalElement);
      }
    }
  }
});
