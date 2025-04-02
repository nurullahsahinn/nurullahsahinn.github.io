document.addEventListener('DOMContentLoaded', function() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
  
  window.addEventListener('load', function() {
    loadBackgroundVideo();
    
    setupLanguageSwitcher();
    
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
  
  const backgroundVideos = [
    'background1.mp4',
    'background2.mp4',
    'background3.mp4',
    'background4.mp4',
    'background5.mp4',
    'background6.mp4'
  ];
  
  const randomVideo = backgroundVideos[Math.floor(Math.random() * backgroundVideos.length)];
  
  // Video öğesini seç
  const videoElement = document.getElementById('background-video');
  
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

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav__links');
const body = document.body;

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
  // body.classList.toggle('menu-open'); // Artık bu özelliği kullanmıyoruz
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    // body.classList.remove('menu-open'); // Artık bu özelliği kullanmıyoruz
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (
    navLinks.classList.contains('active') && 
    !e.target.closest('.nav__links') && 
    !e.target.closest('.hamburger')
  ) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    // body.classList.remove('menu-open'); // Artık bu özelliği kullanmıyoruz
  }
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
  
  // Form gönderimi
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form verilerini al
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Form validasyonu
    if (!name || !email || !message) {
      alert('Lütfen tüm alanları doldurun');
      return;
    }
    
    // Form gönderim işlemi burada olacak
    console.log('Form gönderildi:', { name, email, message });
    
    // Başarı mesajı - bildirim yerine alert kullanılıyor
    alert('Mesajınız gönderildi. Teşekkür ederiz!');
    
    // Formu temizle
    form.reset();
    formInputs.forEach(input => {
      input.parentElement.classList.remove('focused');
    });
  });
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
  console.log('Dil değiştirici yükleniyor...');
  
  // Dil butonlarını seç
  const languageButtons = document.querySelectorAll('.nav-language-btn');
  
  // Dil butonlarını etkinleştir
  languageButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const lang = this.getAttribute('data-lang');
      console.log(`Dil değiştiriliyor: ${lang}`);
      
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
  console.log('Dil değiştiriliyor:', lang);
  
  // Aktif dili kontrol et, aynıysa işlemi iptal et
  if (document.documentElement.getAttribute('lang') === lang) {
    console.log('Zaten seçili dil:', lang);
    return;
  }
  
  // Sayfanın mevcut kaydırma pozisyonunu kaydet
  const scrollPosition = window.scrollY;
  
  // Butonlara switching (geçiş yapılıyor) sınıfını ekle
  const clickedButton = document.querySelector(`.nav-language-btn[data-lang="${lang}"]`);
  if (clickedButton) {
    clickedButton.classList.add('switching');
    
    // Butonda parıltı efekti oluştur
    const glowEffect = document.createElement('div');
    glowEffect.style.position = 'absolute';
    glowEffect.style.top = '0';
    glowEffect.style.left = '0';
    glowEffect.style.width = '100%';
    glowEffect.style.height = '100%';
    glowEffect.style.backgroundColor = 'rgba(242, 72, 11, 0.3)';
    glowEffect.style.borderRadius = '4px';
    glowEffect.style.zIndex = '-1';
    glowEffect.style.opacity = '0';
    glowEffect.style.animation = 'buttonGlow 0.6s ease-out';
    clickedButton.style.position = 'relative';
    clickedButton.style.overflow = 'hidden';
    clickedButton.appendChild(glowEffect);
    
    // Animasyon tamamlandıktan sonra glow efektini ve sınıfı kaldır
    setTimeout(() => {
      clickedButton.classList.remove('switching');
      if (glowEffect && glowEffect.parentNode === clickedButton) {
        clickedButton.removeChild(glowEffect);
      }
    }, 600);
  }
  
  // Dil butonlarını güncelle
  document.querySelectorAll('.nav-language-btn').forEach(button => {
    if (button.getAttribute('data-lang') === lang) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
  
  // Dil değişikliği için animasyonlu geçiş efekti
  // Geçiş için overlay oluştur veya mevcut olanı kullan
  let langOverlay = document.querySelector('.lang-overlay');
  if (!langOverlay) {
    langOverlay = document.createElement('div');
    langOverlay.className = 'lang-overlay';
    
    const overlayContent = document.createElement('div');
    overlayContent.className = 'lang-overlay-content';
    langOverlay.appendChild(overlayContent);
    
    document.body.appendChild(langOverlay);
  }
  
  // Overlay içeriğini ve görünümünü güncelle
  const overlayContent = langOverlay.querySelector('.lang-overlay-content');
  if (overlayContent) {
    // 3D dönen bayrak elemanı oluştur
    const flagContainer = document.createElement('div');
    flagContainer.className = 'flag-3d-container';
    flagContainer.style.perspective = '800px';
    flagContainer.style.transformStyle = 'preserve-3d';
    flagContainer.style.display = 'inline-block';
    flagContainer.style.marginRight = '15px';
    flagContainer.style.animation = 'flag3DRotate 1.5s ease';
    
    if (lang === 'tr') {
      overlayContent.innerHTML = '';
      const textSpan = document.createElement('span');
      textSpan.textContent = 'Türkçe';
      textSpan.style.animation = 'textFadeIn 0.8s ease';
      
      // Bayrak elementi
      const flagSpan = document.createElement('span');
      flagSpan.textContent = '🇹🇷';
      flagSpan.style.fontSize = '40px';
      flagSpan.style.animation = 'flagPop 0.8s 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) both';
      flagSpan.style.display = 'inline-block';
      
      flagContainer.appendChild(flagSpan);
      overlayContent.appendChild(flagContainer);
      overlayContent.appendChild(textSpan);
    } else {
      overlayContent.innerHTML = '';
      const textSpan = document.createElement('span');
      textSpan.textContent = 'English';
      textSpan.style.animation = 'textFadeIn 0.8s ease';
      
      // Bayrak elementi
      const flagSpan = document.createElement('span');
      flagSpan.textContent = '🇬🇧';
      flagSpan.style.fontSize = '40px';
      flagSpan.style.animation = 'flagPop 0.8s 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) both';
      flagSpan.style.display = 'inline-block';
      
      flagContainer.appendChild(flagSpan);
      overlayContent.appendChild(flagContainer);
      overlayContent.appendChild(textSpan);
    }
    
    // Particle efekti için overlay'e parçacıklar ekle
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'lang-particle';
      particle.style.position = 'absolute';
      particle.style.width = `${Math.random() * 10 + 5}px`;
      particle.style.height = `${Math.random() * 10 + 5}px`;
      particle.style.backgroundColor = 'rgba(242, 72, 11, 0.7)';
      particle.style.borderRadius = '50%';
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.opacity = '0';
      particle.style.animation = `particleFade ${Math.random() * 1 + 0.5}s ease-out ${Math.random() * 0.5}s`;
      langOverlay.appendChild(particle);
      
      // Animasyon tamamlandıktan sonra parçacıkları temizle
      setTimeout(() => {
        if (particle && particle.parentNode === langOverlay) {
          langOverlay.removeChild(particle);
        }
      }, 2000);
    }
  }
  
  // Çeviri öğelerini değişim için hazırla
  document.querySelectorAll('[data-i18n]').forEach(element => {
    element.classList.add('content-changing');
  });
  
  // Overlay'i göster ve kısa bir süre sonra gizle
  langOverlay.classList.add('active');
  
  // Dosya protokolünü kontrol et
  const isFileProtocol = window.location.protocol === 'file:';
  
  if (isFileProtocol) {
    console.log('Dosya protokolü tespit edildi! Alternatif yükleme metodu kullanılıyor...');
    
    // Dil dosyalarını statik olarak ekle - dosya protokolü için çözüm
    const translations = {
      'tr': {
        // Türkçe çeviriler
        "nav.about": "Hakkımda",
        "nav.skills": "Beceriler",
        "nav.services": "Yeterlilikler",
        "nav.projects": "Projeler",
        "nav.education": "Eğitim",
        "nav.contact": "İletişim",
        "header.greeting": "Merhaba",
        "header.im": "Ben",
        "header.title": "Yazılım Mühendisliği <span>Öğrencisi</span>",
        "header.description": "Teknoloji tutkunu, sürekli öğrenmeye ve gelişime açık bir yazılım mühendisliği öğrencisiyim. Yapay zeka, robotik ve mobil programlama alanlarında kendimi geliştirmeye odaklanıyorum.",
        "header.contact": "İletişime Geç",
        "header.github": "GitHub Profilim",
        "about.title": "Hakkımda",
        "about.subtitle": "Yazılım Mühendisi",
        "about.description": "Atatürk Üniversitesi Yazılım Mühendisliği öğrencisiyim. Yüksek motivasyona ve teknolojiye olan tutkuma dayanarak, Unreal Engine, C#, C, C++ ve Python gibi dillerle projeler geliştirerek yazılım geliştirme alanında tecrübe kazanıyorum. Yeni teknolojilere hızla adapte olabilme yeteneğimle, farklı projelerde sorumluluk üstlenmeye istekliyim. Amacım, profesyonel becerilerimi sürekli geliştirmek ve teknoloji sektöründe değerli katkılar sağlayabileceğim bir kariyer inşa etmek.",
        "about.contact": "İletişim",
        "skills.title": "Beceriler ve <span>Yetenekler</span>",
        "skills.technical": "Teknik Beceriler",
        "skills.personal": "Kişisel Beceriler",
        "skills.technical.python": "Python",
        "skills.technical.java": "Java",
        "skills.technical.c": "C / C++ / C#",
        "skills.technical.web": "HTML / CSS / PHP",
        "skills.technical.mysql": "MySQL",
        "skills.technical.linux": "TEMEL LİNUX BİLGİSİ",
        "skills.technical.git": "GİT / GITHUB",
        "skills.technical.hackintosh": "Hackintosh Kurulumu ve Optimizasyonu",
        "skills.technical.hardware": "Bilgisayar Donanımı ve Sistem Toplama",
        "skills.personal.time": "Zaman yönetimi",
        "skills.personal.team": "Ekip çalışması",
        "skills.personal.analytical": "Analitik Düşünme",
        "skills.personal.innovation": "İnovatif Yaklaşım",
        "services.subtitle": "Uzmanlık Alanlarım",
        "services.title": "<span>Teknik</span> Yetenekler",
        "services.dev.title": "Yazılım Geliştirme",
        "services.dev.description": "Python, Java, C++, C#, ve PHP dillerinde uygulama geliştirme ve web teknolojileri konusunda deneyim.",
        "services.hackintosh.title": "Hackintosh Uzmanı",
        "services.hackintosh.description": "Çeşitli bilgisayar sistemlerine Hackintosh kurulumu ve optimizasyonu konusunda kapsamlı deneyim.",
        "services.hardware.title": "Bilgisayar Donanımı",
        "services.hardware.description": "Farklı ihtiyaçlara yönelik özel masaüstü bilgisayar sistemleri toplama ve optimizasyon konusunda deneyim.",
        "services.database.title": "Veritabanı Yönetimi",
        "services.database.description": "MySQL ve veritabanı yönetimi konusunda tecrübe. Veritabanı tasarımı ve optimizasyonu.",
        "projects.subtitle": "Projelerim",
        "projects.title": "<span>Son</span> Projelerim",
        "projects.satellite.title": "Model Uydu Yarışması",
        "projects.satellite.description": "Teknofest kapsamında yazılım lideri olarak yürüttüğüm Model Uydu projesi",
        "projects.underwater.title": "Otonom Sualtı Aracı",
        "projects.underwater.description": "Teknofest kapsamında yazılım lideri olarak yürüttüğüm Otonom Sualtı Aracı projesi",
        "projects.underwater.award": "<i class=\"fas fa-award\"></i> TÜBİTAK 2209-A programında tam onay!",
        "education.subtitle": "Akademik Geçmişim",
        "education.title": "Eğitim <span>Bilgilerim</span>",
        "education.atauni.name": "Atatürk Üniversitesi",
        "education.atauni.degree": "Lisans Derecesi · Yazılım Mühendisliği",
        "education.atauni.year": "2023 - Halen",
        "education.iste.name": "İskenderun Teknik Üniversitesi (İSTE)",
        "education.iste.degree": "Lisans Derecesi · Bilgisayar Mühendisliği",
        "education.iste.year": "2022 - 2023",
        "education.mersin.name": "Mersin Üniversitesi",
        "education.mersin.degree": "Ön Lisans · Bilgisayar Teknolojileri ve Bilişim Sistemleri",
        "education.mersin.year": "2021 - 2022",
        "education.aztu.name": "Azərbaycan Texniki Universiteti",
        "education.aztu.degree": "Lisans Derecesi · Bilgisayar Mühendisliği", 
        "education.aztu.year": "2019 - 2020",
        "contact.title": "İletişime <span>Geç!</span>",
        "contact.subtitle": "Projeleriniz için benimle iletişime geçebilirsiniz",
        "contact.description": "Benimle iletişime geçmek için aşağıdaki formu kullanabilir veya sosyal medya hesaplarımdan bana ulaşabilirsiniz.",
        "contact.form.name": "Adınız",
        "contact.form.email": "E-posta Adresiniz",
        "contact.form.message": "Mesajınız",
        "contact.form.submit": "Mesaj Gönder",
        "loading.text": "YÜKLENİYOR..."
      },
      'en': {
        // İngilizce çeviriler
        "nav.about": "About",
        "nav.skills": "Skills",
        "nav.services": "Qualifications",
        "nav.projects": "Projects",
        "nav.education": "Education",
        "nav.contact": "Contact",
        "header.greeting": "Hello",
        "header.im": "I'm",
        "header.title": "Software Engineering <span>Student</span>",
        "header.description": "I am a technology enthusiast and a software engineering student open to continuous learning and development. I focus on developing myself in the fields of artificial intelligence, robotics, and mobile programming.",
        "header.contact": "Contact Me",
        "header.github": "My GitHub Profile",
        "about.title": "About Me",
        "about.subtitle": "Software Engineer",
        "about.description": "I am a Software Engineering student at Atatürk University. Based on my high motivation and passion for technology, I am gaining experience in software development by developing projects with languages such as Unreal Engine, C#, C, C++ and Python. With my ability to quickly adapt to new technologies, I am eager to take responsibility in different projects. My goal is to continuously develop my professional skills and build a career where I can make valuable contributions in the technology industry.",
        "about.contact": "Contact",
        "skills.title": "Skills and <span>Abilities</span>",
        "skills.technical": "Technical Skills",
        "skills.personal": "Personal Skills",
        "skills.technical.python": "Python",
        "skills.technical.java": "Java",
        "skills.technical.c": "C / C++ / C#",
        "skills.technical.web": "HTML / CSS / PHP",
        "skills.technical.mysql": "MySQL",
        "skills.technical.linux": "BASIC LINUX KNOWLEDGE",
        "skills.technical.git": "GIT / GITHUB",
        "skills.technical.hackintosh": "Hackintosh Installation and Optimization",
        "skills.technical.hardware": "Computer Hardware and System Building",
        "skills.personal.time": "Time management",
        "skills.personal.team": "Teamwork",
        "skills.personal.analytical": "Analytical Thinking",
        "skills.personal.innovation": "Innovative Approach",
        "services.subtitle": "My Expertise",
        "services.title": "<span>Technical</span> Skills",
        "services.dev.title": "Software Development",
        "services.dev.description": "Experience in application development with Python, Java, C++, C#, and PHP languages and web technologies.",
        "services.hackintosh.title": "Hackintosh Expert",
        "services.hackintosh.description": "Extensive experience in Hackintosh installation and optimization for various computer systems.",
        "services.hardware.title": "Computer Hardware",
        "services.hardware.description": "Experience in building and optimizing custom desktop computer systems for different needs.",
        "services.database.title": "Database Management",
        "services.database.description": "Experience in MySQL and database management. Database design and optimization.",
        "projects.subtitle": "My Projects",
        "projects.title": "<span>Recent</span> Projects",
        "projects.satellite.title": "Model Satellite Competition",
        "projects.satellite.description": "Model Satellite project I led as a software leader within the scope of Teknofest",
        "projects.underwater.title": "Autonomous Underwater Vehicle",
        "projects.underwater.description": "Autonomous Underwater Vehicle project I led as a software leader within the scope of Teknofest",
        "projects.underwater.award": "<i class=\"fas fa-award\"></i> Full approval in TÜBİTAK 2209-A program!",
        "education.subtitle": "My Academic Background",
        "education.title": "Education <span>History</span>",
        "education.atauni.name": "Atatürk University",
        "education.atauni.degree": "Bachelor's Degree · Software Engineering",
        "education.atauni.year": "2023 - Present",
        "education.iste.name": "İskenderun Technical University (İSTE)",
        "education.iste.degree": "Bachelor's Degree · Computer Engineering",
        "education.iste.year": "2022 - 2023",
        "education.mersin.name": "Mersin University",
        "education.mersin.degree": "Associate Degree · Computer Technology and Information Systems",
        "education.mersin.year": "2021 - 2022",
        "education.aztu.name": "Azerbaijan Technical University",
        "education.aztu.degree": "Bachelor's Degree · Computer Engineering",
        "education.aztu.year": "2019 - 2020",
        "contact.title": "Contact <span>Me!</span>",
        "contact.subtitle": "You can contact me for your projects",
        "contact.description": "You can use the form below to contact me or reach me through my social media accounts.",
        "contact.form.name": "Your Name",
        "contact.form.email": "Your Email",
        "contact.form.message": "Your Message",
        "contact.form.submit": "Send Message",
        "loading.text": "LOADING..."
      }
    };
    
    // Dil değişimini gerçekleştir
    if (translations[lang]) {
      console.log('Dahili çeviriler yüklendi:', translations[lang]);
      
      // Animasyon için zamanlama 
      setTimeout(() => {
        // Sayfa içeriğini güncelle
        updatePageContent(translations[lang]);
        
        // Değişim sonrası animasyon sınıflarını uygula
        document.querySelectorAll('[data-i18n]').forEach((element, index) => {
          element.classList.remove('content-changing');
          element.classList.add('content-changed');
          
          // Farklı elemanlara kademeli gecikme ile animasyon uygula
          element.style.animationDelay = `${index * 0.03}s`;
          
          // Animasyon tamamlandıktan sonra content-changed sınıfını kaldır
          setTimeout(() => {
            element.classList.remove('content-changed');
            element.style.animationDelay = '';
          }, 800);
        });
        
        // Kaydırma pozisyonunu koru
        window.scrollTo(0, scrollPosition);
        
        // Overlay'i kapat
        setTimeout(() => {
          langOverlay.classList.remove('active');
          
          // Overlay içindeki parçacıkları temizle
          const particles = langOverlay.querySelectorAll('.lang-particle');
          particles.forEach(particle => {
            if (particle.parentNode === langOverlay) {
              langOverlay.removeChild(particle);
            }
          });
        }, 800);
        
        // Dil tercihini kaydet
        localStorage.setItem('preferredLanguage', lang);
        
        // HTML lang özelliğini güncelle
        document.documentElement.setAttribute('lang', lang);
      }, 600);
    } else {
      console.error(`Dil bulunamadı: ${lang}`);
      langOverlay.classList.remove('active');
    }
  } else {
    // Normal fetch işlemi - sunucu üzerinden çalışıyorsa
    fetch(`languages/${lang}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Dil dosyası yüklenemedi: ${response.status}`);
        }
        return response.json();
      })
      .then(translations => {
        console.log('Çeviriler yüklendi:', translations);
        
        // Animasyon için zamanlama
        setTimeout(() => {
          // Sayfa içeriğini güncelle
          updatePageContent(translations);
          
          // Değişim sonrası animasyon sınıflarını uygula
          document.querySelectorAll('[data-i18n]').forEach((element, index) => {
            element.classList.remove('content-changing');
            element.classList.add('content-changed');
            
            // Farklı elemanlara kademeli gecikme ile animasyon uygula
            element.style.animationDelay = `${index * 0.03}s`;
            
            // Animasyon tamamlandıktan sonra content-changed sınıfını kaldır
            setTimeout(() => {
              element.classList.remove('content-changed');
              element.style.animationDelay = '';
            }, 800);
          });
          
          // Kaydırma pozisyonunu koru
          window.scrollTo(0, scrollPosition);
          
          // Overlay'i kapat
          setTimeout(() => {
            langOverlay.classList.remove('active');
            
            // Overlay içindeki parçacıkları temizle
            const particles = langOverlay.querySelectorAll('.lang-particle');
            particles.forEach(particle => {
              if (particle.parentNode === langOverlay) {
                langOverlay.removeChild(particle);
              }
            });
          }, 800);
          
          // Dil tercihini kaydet
          localStorage.setItem('preferredLanguage', lang);
          
          // HTML lang özelliğini güncelle
          document.documentElement.setAttribute('lang', lang);
        }, 600);
      })
      .catch(error => {
        console.error('Dil değiştirme hatası:', error);
        langOverlay.classList.remove('active');
      });
  }
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
    'background1.mp4',
    'background2.mp4',
    'background3.mp4',
    'background4.mp4',
    'background5.mp4',
    'background6.mp4'
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
  const body = document.body;
  const menuLinks = document.querySelectorAll('.nav__link');
  const menuOverlay = document.querySelector('.menu-overlay');
  
  if (!hamburger) return;
  
  hamburger.addEventListener('click', function() {
    body.classList.toggle('menu-open');
  });
  
  // Menü linklerine tıklandığında menüyü kapat
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      body.classList.remove('menu-open');
    });
  });
  
  // Dışarı tıklandığında menüyü kapat
  if (menuOverlay) {
    menuOverlay.addEventListener('click', function() {
      body.classList.remove('menu-open');
    });
  }
  
  // ESC tuşuna basıldığında menüyü kapat
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && body.classList.contains('menu-open')) {
      body.classList.remove('menu-open');
    }
  });
}

// Yönlendirme değişikliği
function handleOrientationChange() {
  console.log('Yönlendirme değişti');
  
  // Menüyü kapat
  document.body.classList.remove('menu-open');
  
  // Animasyonları yenile
  if (typeof AOS !== 'undefined') {
    setTimeout(() => {
      AOS.refresh();
    }, 500);
  }
}

// Başa dön butonu ayarları
function setupBackToTop() {
  const backToTop = document.querySelector('.back-to-top');
  
  if (!backToTop) return;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
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

// İletişim formu ayarları
function setupContactForm() {
  const form = document.getElementById('contactForm');
  
  if (!form) return;
  
  // Form input animasyonları
  const formInputs = form.querySelectorAll('input, textarea');
  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      if (input.value === '') {
        input.parentElement.classList.remove('focused');
      }
    });
  });
  
  // Form gönderimi
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form verilerini al
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Form validasyonu
    if (!name || !email || !message) {
      alert('Lütfen tüm alanları doldurun');
      return;
    }
    
    // Form gönderim işlemi burada olacak
    console.log('Form gönderildi:', { name, email, message });
    
    // Başarı mesajı - bildirim yerine alert kullanılıyor
    alert('Mesajınız gönderildi. Teşekkür ederiz!');
    
    // Formu temizle
    form.reset();
    formInputs.forEach(input => {
      input.parentElement.classList.remove('focused');
    });
  });
}
