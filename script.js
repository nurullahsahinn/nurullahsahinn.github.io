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
  
  const backgroundVideos = [
    'background1.mp4',
    'background2.mp4',
    'background3.mp4',
    'background4.mp4',
    'background5.mp4',
    'background6.mp4',
    'background7.mp4',
    'background8.mp4',
    'background9.mp4',
    'background10.mp4',
    'background11.mp4'
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
        "nav.about": "Hakkımda",
        "nav.skills": "Beceriler",
        "nav.services": "Yeterlilikler",
        "nav.experience": "Deneyim",
        "nav.projects": "Projeler",
        "nav.education": "Eğitim",
        "nav.contact": "İletişim",
        "header.greeting": "Merhaba",
        "header.im": "Ben",
        "header.title": "Yazılım Mühendisi · <span>Full Stack & AI</span>",
        "header.description": "Atatürk Üniversitesi Yazılım Mühendisliği mezunuyum. İleri seviye RAG mimarileri, full-stack geliştirme ve gömülü sistemler alanlarında uygulamalı proje deneyimine sahibim. AB fonlu hackathonda birincilik ve TÜBİTAK 2209-A araştırma desteği ile akademik ve pratik üretkenliğimi kanıtladım.",
        "header.contact": "İletişime Geç",
        "header.github": "GitHub Profilim",
        "about.title": "Hakkımda",
        "about.subtitle": "Yazılım Mühendisi",
        "about.description": "Atatürk Üniversitesi Yazılım Mühendisliği programından 2026'da mezun olan bir yazılım mühendisiyim. Staj sürecinde Atatürk Üniversitesi için KVKK uyumlu, self-hosted bir kurumsal yapay zeka destek platformunu (AsistTR) sıfırdan tasarlayıp production ortamına aldım; sistem üniversitenin ~60.000 öğrencilik ağında aktif olarak kullanılacak.",
        "about.description.original": "Atatürk Üniversitesi Yazılım Mühendisliği programından 2026'da mezun olan bir yazılım mühendisiyim. Teknolojiye olan tutkum ve yüksek motivasyonum sayesinde, Unity, C#, C, C++ ve Python gibi dillerle projeler geliştirdim. Yeni teknolojilere hızla adapte olabiliyor, farklı projelerde aktif rol almaktan keyif alıyorum.",
        "about.atugem": "İleri seviye RAG mimarileri (RAPTOR, HippoRAG2, Agentic RAG, Self-Reflective RAG, Speculative RAG), full-stack geliştirme ve gömülü sistemler (NVIDIA Jetson, Pixhawk PX4) alanlarında uygulamalı proje deneyimine sahibim.",
        "about.atugem.original": "Atatürk Üniversitesi Atugem Teknoloji Kulübünde Model Uydu ve Otonom Sualtı Aracı takımlarının ARGE birimlerinde aktif olarak görev aldım.",
        "about.bap": "AB fonlu bir hackathonda birincilik ve TÜBİTAK 2209-A ve LKAB-B araştırma desteği ile akademik ve pratik üretkenliğimi kanıtladım.",
        "about.bap.original": "TEKNOFEST 2025 kapsamında Aerodinamik ve Güç Verimliliği ile Akıllı Mini Uydu projesi ve Otonom Sualtı Araçlarının Konfigürasyonuna yönelik geliştirdiğimiz proje, Atatürk Üniversitesi Bilimsel Araştırma Projeleri (BAP) desteği almaya hak kazandı. Sualtı projesinde araştırmacı olarak görev almaktayım.",
        "about.cv.new": "Staj sürecinde Atatürk Üniversitesi için KVKK uyumlu, self-hosted bir kurumsal yapay zeka destek platformunu (AsistTR) sıfırdan tasarlayıp production ortamına aldım. İleri seviye RAG mimarileri (RAPTOR, HippoRAG2, Agentic RAG), full-stack ve gömülü sistemler (NVIDIA Jetson, Pixhawk PX4) alanlarında deneyim kazandım. AB fonlu hackathonda birincilik ve TÜBİTAK 2209-A & LKAB-B araştırma desteği ile projelerimi tamamladım.",
        "about.contact": "İletişim",
        "skills.title": "Beceriler ve <span>Yetenekler</span>",
        "skills.technical": "Teknik Beceriler",
        "skills.technical.python": "Python",
        "skills.technical.java": "Java",
        "skills.technical.c": "C / C++ / C#",
        "skills.technical.web": "HTML / CSS / PHP",
        "skills.technical.mysql": "MySQL",
        "skills.technical.linux": "TEMEL LİNUX BİLGİSİ",
        "skills.technical.git": "GİT / GITHUB",
        "skills.technical.hackintosh": "Hackintosh Kurulumu ve Optimizasyonu",
        "skills.technical.hardware": "Bilgisayar Donanımı ve Sistem Toplama",
        "skills.technical.unity": "Unity - Oyun ve XR (AR/VR) Geliştirme",
        "skills.technical.ai": "AI/LLM - Langchain, Langgraph, RAG, Chatbot",
        "skills.technical.automation": "Makine Öğrenmesi",
        "skills.ai": "Yapay Zeka & RAG",
        "skills.ai.items": "Python, LangChain, RAG mimarileri (Contextual Retrieval, RAPTOR, HippoRAG2, Agentic RAG, Speculative RAG, Self-Reflective RAG, LazyGraphRAG), Anthropic Claude API, Google Gemini API, Prompt Engineering, vLLM, Ollama, pgvector (HNSW), Langfuse, RAGAS",
        "skills.backend": "Backend & Sistem Mimarisi",
        "skills.backend.items": "Node.js, Express.js, Socket.IO, BullMQ, Redis (Pub/Sub, Cache), REST API, PostgreSQL, Docker, Nginx, WebRTC",
        "skills.frontend": "Frontend & Mobil",
        "skills.frontend.items": "React 18 (Vite), TailwindCSS, Zustand, PWA, Flutter (Dart), HTML / CSS",
        "skills.embedded": "Gömülü Sistemler & Robotik",
        "skills.embedded.items": "NVIDIA Jetson (Orin Nano, Xavier NX), Pixhawk PX4, Raspberry Pi, Arduino, Sensör Füzyonu, XBee Mesh Network",
        "skills.tools": "Araçlar & Diğer",
        "skills.tools.items": "Git / GitHub, Linux (Systemd, Bash Scripting), C# (.NET), Kali Linux (Ağ Güvenliği, CVE Analizi), MySQL, Unity - XR (AR/VR) Geliştirme",
        "skills.personal": "Kişisel Beceriler",
        "skills.personal.time": "Zaman yönetimi",
        "skills.personal.team": "Ekip çalışması",
        "skills.personal.analytical": "Analitik Düşünme",
        "skills.personal.innovation": "İnovatif Yaklaşım",
        "services.subtitle": "Uzmanlık Alanlarım",
        "services.title": "<span>Teknik</span> Yetenekler",
        "services.dev.title": "Yazılım Geliştirme",
        "services.dev.description": "Python, Node.js, React, Flutter ve C# ile full-stack uygulama geliştirme; production ortamına alma ve sistem mimarisi konusunda deneyim.",
        "services.fullstack.title": "Full Stack Geliştirme",
        "services.fullstack.description": "React 18 (Vite), Node.js/Express.js, PostgreSQL, Socket.IO ve Docker ile uçtan uca web uygulamaları geliştirme ve DevOps süreçleri.",
        "services.hackintosh.title": "Hackintosh Uzmanı",
        "services.hackintosh.description": "Çeşitli bilgisayar sistemlerine Hackintosh kurulumu ve optimizasyonu konusunda kapsamlı deneyim.",
        "services.hardware2.title": "Bilgisayar Donanımı",
        "services.hardware2.description": "Farklı ihtiyaçlara yönelik özel masaüstü bilgisayar sistemleri toplama ve optimizasyon konusunda deneyim.",
        "services.hardware.title": "Gömülü Sistemler & Robotik",
        "services.hardware.description": "NVIDIA Jetson, Pixhawk PX4, Raspberry Pi and Arduino üzerinde gerçek zamanlı sistemler, sensör füzyonu ve otonom kontrol mimarileri.",
        "services.database.title": "Veritabanı & Altyapı",
        "services.database.description": "PostgreSQL, Redis, Docker ve Nginx ile ölçeklenebilir altyapı; BullMQ iş kuyrukları ve WebSocket mimarileri.",
        "services.unity.title": "Unity & XR Geliştirme",
        "services.unity.description": "Unity ile oyun geliştirme, sanal gerçeklik (VR) ve artırılmış gerçeklik (AR) uygulamaları geliştirme.",
        "services.ai.title": "AI & LLM Çözümleri",
        "services.ai.description": "Contextual Retrieval, RAPTOR, HippoRAG2 ve Agentic RAG gibi ileri seviye RAG mimarileri ile kurumsal yapay zeka platformları ve akıllı chatbot sistemleri geliştirme.",
        "experience.subtitle": "İş Deneyimim",
        "experience.title": "Profesyonel <span>Deneyim</span>",
        "experience.atabaum.title": "Yazılım Mühendisi (Stajyer)",
        "experience.atabaum.company": "ATABAUM — Atatürk Üniversitesi Bilgisayar Bilimleri Araştırma ve Uygulama Merkezi",
        "experience.atabaum.period": "Ocak 2025 – Mayıs 2025",
        "experience.atabaum.project": "AsistTR — Kurumsal Yapay Zeka Destekli Canlı Destek & Helpdesk Platformu",
        "experience.atabaum.desc1": "Intercom ve tawk.to'ya alternatif, KVKK uyumlu, self-hosted bir kurumsal yapay zeka iletişim platformunu (AsistTR) sıfırdan tasarlayıp ATABAUM sunucularında production ortamına aldım; platform Atatürk Üniversitesi'nin ~60.000 öğrencilik kampüs ağında aktif olarak kullanılmaya başlanılacak.",
        "experience.atabaum.desc2": "Contextual Retrieval, RAPTOR hiyerarşik özetleme, HippoRAG2 ve Agentic RAG tekniklerini birleştiren çok aşamalı bir RAG pipeline'ı geliştirdim; Langfuse ile tüm pipeline'ı izleyip RAGAS ile Faithfulness ve Answer Relevancy metriklerini otomatik ölçtüm.",
        "experience.atabaum.desc3": "Kurumsal veri gizliliği için tüm LLM işlemlerini yerel Qwen3-35B (vLLM) üzerinde çalıştırdım; KVKK uyumlu AI gateway kurdum. Socket.IO trafiğini Redis Adapter üzerinden yönlendirerek yatay ölçeklenebilir WebSocket mimarisi kurdum.",
        "experience.atabaum.desc4": "Gerçek zamanlı canlı destek, SLA takipli kanban ticket sistemi, IMAP/SMTP e-posta entegrasyonu, WebRTC sesli/görüntülü görüşme, canlı çeviri altyazı ve Shadow DOM izolasyonlu gömülebilir widget dahil ürünün uçtan uca teslimini üstlendim.",
        "projects.subtitle": "Projelerim",
        "projects.title": "<span>Son</span> Projelerim",
        "projects.kamuflow.title": "KamuFlow AI",
        "projects.kamuflow.description": "Vatandaşların kamu başvurularında doğru kuruma, belgeye ve dilekçeye ulaşmasını kolaylaştıran RAG destekli akıllı kamu asistanı. Flutter mobil uygulama, Node.js/Express backend, React yönetim paneli ve PostgreSQL + pgvector hibrit retrieval.",
        "projects.kamuflow.award": "<i class=\"fas fa-trophy\"></i> 1.lik Ödülü — AB Fonlu Hackathon (Bilim Erzurum & UNDP, TBB)",
        "projects.kamuflow.button": "Detaylar",
        "projects.translationEvolution.title": "Translation Evolution",
        "projects.translationEvolution.description": "SMT, NMT ve LLM çeviri mimarilerini karşılaştıran interaktif eğitim platformu. Tokenization → embedding → attention süreçlerini adım adım görselleştiren simülasyon motoru. Gemini API ile atasözü ve deyimlerin kültürel karşılıklarını bulma stratejileri.",
        "projects.translationEvolution.button": "Detaylar",
        "projects.nonGravitySatellite.title": "Non Gravity Model Uydu",
        "projects.satellite.description_detailed": "TÜRKSAT Model Uydu Yarışması 2025 için yazılım lideri olarak geliştirdiğim uçtan uca model uydu yazılım sistemi. Sıfırdan tasarlanmış, tam otomatik telemetri (1 Hz), gerçek zamanlı video akışı (240x180@2fps), SD karta yüksek kaliteli video kaydı (640x480@15fps), IoT S2S bonus görevi ve SAHA protokolü ile taşıyıcı-görev yükü haberleşmesi içerir.",
        "projects.nonGravitySatellite.summary_title": "Proje Özeti",
        "projects.nonGravitySatellite.summary_text": "TÜRKSAT Model Uydu Yarışması 2025 için NONGRAVITY Takımı (286570) tarafından geliştirilen tam otomatik görev yükü sistemi. Roket ile fırlatılan model uydudan 400m'de ayrılarak kendi paraşütüyle inerken kesintisiz telemetri (1 Hz, 30 alan), XBee üzerinden gerçek zamanlı video akışı ve SD karta H.264/MP4 kayıt yapar. İniş hızları: Taşıyıcı 12-14 m/s, Görev Yükü 6-8 m/s. IoT S2S bonus görevi kapsamında görev boyunca 412-707m mesafede 2 yer istasyonundan sürekli sıcaklık verisi alır. SAHA protokolü ile taşıyıcı-görev yükü haberleşmesi ve ARAS alarm sistemi içerir. Tüm yazılım bileşenleri (Python, C#, Arduino) sıfırdan geliştirilmiştir.",
        "projects.nonGravitySatellite.architecture_title": "Sistem Mimarisi",
        "projects.nonGravitySatellite.architecture_carrier_module": "Taşıyıcı Modül: Arduino Nano tabanlıdır. Sensör verilerini toplama, ayrılma mekanizmasını kontrol etme ve temel telemetri verilerini iletme görevlerini üstlenir.",
        "projects.nonGravitySatellite.architecture_payload_module": "Görev Yükü Modülü: Raspberry Pi Zero 2 W tabanlıdır. Kamera görüntüsü aktarma, konum bilgisi iletme ve multi-spektral filtreleme sistemini kontrol etme görevlerini yerine getirir.",
        "projects.nonGravitySatellite.architecture_ground_station": "Yer İstasyonu: C# tabanlı bir masaüstü uygulamasıdır. Telemetri verilerini görselleştirme, komut gönderme, kamera görüntüsünü izleme ve kaydetme işlevlerini sağlar.",
        "projects.nonGravitySatellite.hardware_title": "Kullanılan Ana Donanımlar",
        "projects.nonGravitySatellite.hardware_processors": "İşlemciler: Raspberry Pi Zero 2W (Görev Yükü), Arduino Nano (Taşıyıcı), Arduino Nano + Mega 2560 (IoT İstasyonları)",
        "projects.nonGravitySatellite.hardware_sensors": "Sensörler: BMP280 Basınç (I2C 0x76/0x77), 10-DOF IMU (ADXL345, ITG3200, HMC5883L), UbloxNeo-8M GPS (UART), ADS1115 16-bit ADC (Pil izleme), DS3231 RTC",
        "projects.nonGravitySatellite.hardware_communication": "Haberleşme: XBee 3 Pro Modül (63mW, 250 Kbps), API Mode 1, PAN ID 0x6570, Mesh Network (Kanal 12, 13, 14)",
        "projects.nonGravitySatellite.hardware_camera": "Kamera: Raspberry Pi Camera Module 3 (11.9MP) - İkili Sistem: SD Kayıt (640x480@15fps H.264) + XBee Stream (240x180@2fps MJPEG)",
        "projects.nonGravitySatellite.hardware_power": "Güç: NCR18650B Li-Ion 3400mAh x2 (Görev Yükü), Beston 9V USB-C (Taşıyıcı), LM2596 Step-Down + LM2577 Step-Up Regülatörler",
        "projects.nonGravitySatellite.hardware_mechanical": "Aktuatörler: 2x SG90 Servo (Multi-spektral filtre + Ayrılma), Passive Buzzer (Kurtarma sinyali)",
        "projects.nonGravitySatellite.software_title": "Yazılım Mimarisi",
        "projects.nonGravitySatellite.software_ground_station": "Yer İstasyonu: C# Windows Forms (.NET Framework) - Gerçek zamanlı telemetri grafikleri, 3D uydu görselleştirmesi (OpenGL), harita (GMap.NET), canlı video, ARAS alarm sistemi, CSV export.",
        "projects.nonGravitySatellite.software_carrier_module": "Taşıyıcı Sistem: Arduino Nano (C++) - BMP280 basınç, otomatik ayrılma @400m, SAHA protokolü (XBee), buzzer kurtarma.",
        "projects.nonGravitySatellite.software_payload_module": "Görev Yükü: Python 3.11 (Raspberry Pi) - Çok iş parçacıklı mimari, 1 Hz telemetri, ikili video sistemi, sensör füzyonu, SD kayıt, XBee haberleşme, IoT veri alma, systemd servisi.",
        "projects.nonGravitySatellite.software_iot": "IoT İstasyonları: Arduino Nano + Mega 2560 (C++) - BMP280 sıcaklık, XBee 3 Pro (Kanal 12/13), 412-707m mesafe iletişimi.",
        "projects.satellite.award": "<i class=\"fas fa-award\"></i> TÜBİTAK 2209-A programında tam onay!",
        "projects.satellite.button": "Detaylar",
        "projects.sualti.title": "Otonom Sualtı Aracı - AXOLOTL",
        "projects.sualti.description": "Teknofest kapsamında yazılım lideri olarak yürüttüğüm otonom sualtı yarışması. TEKNOFEST 2025 İnsansız Su Altı Sistemleri Yarışması için geliştirilen AXOLOTL, otonom görevler gerçekleştirebilen bir sualtı aracıdır.",
        "projects.axolotl.summary_text": "AXOLOTL projesi, TEKNOFEST 2025 İnsansız Su Altı Sistemleri Yarışması için geliştirilmiş olup, su altı koşullarında otonom görevler gerçekleştirebilen bir su altı aracıdır. Proje, TÜBİTAK 2209-A Üniversite Öğrencileri Araştırma Projeleri Destekleme Programı'ndan destek almıştır.",
        "projects.axolotl.features_title": "Temel Özellikler:",
        "projects.axolotl.feature_design": "Özgün ve yerli tasarım: Tüm teknik çizimler, tasarımlar, mühendislik analizleri ve yazılımlar takım üyeleri tarafından geliştirilmiştir.",
        "projects.axolotl.feature_hardware": "Gelişmiş Donanım: Jetson Xavier NX (yapay zeka ve görüntü işleme), Pixhawk PX4 (görev yönetimi ve motor kontrolü).",
        "projects.axolotl.feature_motors": "Motorlar: 6 adet fırçasız motor.",
        "projects.axolotl.feature_sensors": "Sensörler: Derinlik, basınç, IMU/pusula, ultrasonik sensörler, su kaçak sensörleri.",
        "projects.axolotl.feature_mechanical": "Mekanik Tasarım: Axolotl formunda hidrodinamik tasarım, PETG malzeme, modüler ve sızdırmaz gövde.",
        "projects.axolotl.feature_software": "Yazılım: Python tabanlı görüntü işleme (OpenCV, NumPy), görev yürütme ve motor kontrol algoritmaları.",
        "projects.axolotl.feature_safety": "Güvenlik: Su sızıntı sensörleri, acil yüzey çıkış sistemi, enerji kesme sistemi.",
        "projects.axolotl.updates_text": "Proje, Jetson Nano'dan Jetson Xavier NX'e geçiş ve Lidar yerine Arducam MINI M12 kamera sistemi kullanımı gibi önemli donanım güncellemeleriyle performansı artırmayı hedeflemektedir. Mekanik tasarımda sızdırmazlık ve hidrodinamik verimlilik ön planda tutulmuştur.",
        "projects.underwater.award": "<i class=\"fas fa-award\"></i> TÜBİTAK 2209-A programında tam onay!",
        "projects.sualti.button": "Detaylar",
        "education.subtitle": "Akademik Geçmişim",
        "education.title": "Eğitim <span>Bilgilerim</span>",
        "education.atauni.name": "Atatürk Üniversitesi",
        "education.atauni.degree": "Lisans Derecesi · Yazılım Mühendisliği",
        "education.atauni.year": "2023 – 2026 · Mezun",
        "education.iste.name": "İskenderun Teknik Üniversitesi (İSTE)",
        "education.iste.degree": "Lisans Derecesi · Bilgisayar Mühendisliği",
        "education.iste.year": "2022 - 2023",
        "education.mersin.name": "Mersin Üniversitesi",
        "education.mersin.degree": "Lisans Derecesi · Bilgisayar Teknolojileri ve Bilişim Sistemleri",
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
        "loading.text": "Yükleniyor"
      },
      'en': {
        "nav.about": "About",
        "nav.skills": "Skills",
        "nav.services": "Qualifications",
        "nav.experience": "Experience",
        "nav.projects": "Projects",
        "nav.education": "Education",
        "nav.contact": "Contact",
        "header.greeting": "Hello",
        "header.im": "I'm",
        "header.title": "Software Engineer · <span>Full Stack & AI</span>",
        "header.description": "I'm a Software Engineering graduate from Atatürk University. I have hands-on project experience in advanced RAG architectures, full-stack development, and embedded systems. I have proven my academic and practical productivity with 1st place at an EU-funded hackathon and TÜBİTAK 2209-A research support.",
        "header.contact": "Contact Me",
        "header.github": "My GitHub Profile",
        "about.title": "About Me",
        "about.subtitle": "Software Engineer",
        "about.description": "I am a software engineer who graduated from Atatürk University's Software Engineering program in 2026. During my internship, I designed and deployed a KVKK-compliant, self-hosted enterprise AI support platform (AsistTR) for Atatürk University from scratch; the system will be actively used across the university's network of ~60,000 students.",
        "about.description.original": "I am a software engineer who graduated from Atatürk University's Software Engineering program in 2026. Thanks to my passion for technology and high motivation, I developed projects using languages like Unity, C#, C, C++, and Python. I can quickly adapt to new technologies and enjoy taking active roles in different projects.",
        "about.atugem": "I have hands-on project experience in advanced RAG architectures (RAPTOR, HippoRAG2, Agentic RAG, Self-Reflective RAG, Speculative RAG), full-stack development, and embedded systems (NVIDIA Jetson, Pixhawk PX4).",
        "about.atugem.original": "I actively served in the R&D units of the Model Satellite and Autonomous Underwater Vehicle teams at Atatürk University Atugem Technology Club.",
        "about.bap": "I have proven my academic and practical productivity with 1st place at an EU-funded hackathon and TÜBİTAK 2209-A and LKAB-B research support.",
        "about.bap.original": "Our projects developed within the scope of TEKNOFEST 2025 for Aerodynamics and Power Efficiency with Smart Mini Satellite and the Configuration of Autonomous Underwater Vehicles won Atatürk University Scientific Research Projects (BAP) support.",
        "about.cv.new": "During my internship, I designed and deployed a KVKK-compliant, self-hosted enterprise AI platform (AsistTR) from scratch. I gained experience in advanced RAG architectures (RAPTOR, HippoRAG2, Agentic RAG), full-stack and embedded systems (NVIDIA Jetson, Pixhawk PX4). I completed my projects with 1st place at an EU-funded hackathon and TÜBİTAK 2209-A & LKAB-B research support.",
        "about.contact": "Contact",
        "skills.title": "Skills and <span>Abilities</span>",
        "skills.technical": "Technical Skills",
        "skills.technical.python": "Python",
        "skills.technical.java": "Java",
        "skills.technical.c": "C / C++ / C#",
        "skills.technical.web": "HTML / CSS / PHP",
        "skills.technical.mysql": "MySQL",
        "skills.technical.linux": "BASIC LINUX KNOWLEDGE",
        "skills.technical.git": "GIT / GITHUB",
        "skills.technical.hackintosh": "Hackintosh Installation and Optimization",
        "skills.technical.hardware": "Computer Hardware and System Assembly",
        "skills.technical.unity": "Unity - Game and XR (AR/VR) Development",
        "skills.technical.ai": "AI/LLM - Langchain, Langgraph, RAG, Chatbot",
        "skills.technical.automation": "Machine Learning",
        "skills.ai": "AI & RAG",
        "skills.ai.items": "Python, LangChain, RAG Architectures (RAPTOR, HippoRAG2, Agentic RAG, Speculative RAG, Self-Reflective RAG, LazyGraphRAG), Anthropic Claude API, Google Gemini API, Prompt Engineering, vLLM, Ollama, pgvector (HNSW), Langfuse, RAGAS",
        "skills.backend": "Backend & System Architecture",
        "skills.backend.items": "Node.js, Express.js, Socket.IO, BullMQ, Redis (Pub/Sub, Cache), REST API, PostgreSQL, Docker, Nginx, WebRTC",
        "skills.frontend": "Frontend & Mobile",
        "skills.frontend.items": "React 18 (Vite), TailwindCSS, Zustand, PWA, Flutter (Dart), HTML / CSS",
        "skills.embedded": "Embedded Systems & Robotics",
        "skills.embedded.items": "NVIDIA Jetson (Orin Nano, Xavier NX), Pixhawk PX4, Raspberry Pi, Arduino, Sensor Fusion, XBee Mesh Network",
        "skills.tools": "Tools & Other",
        "skills.tools.items": "Git / GitHub, Linux (Systemd, Bash Scripting), C# (.NET), Kali Linux (Network Security, CVE Analysis), MySQL, Unity - XR (AR/VR) Development",
        "skills.personal": "Personal Skills",
        "skills.personal.time": "Time management",
        "skills.personal.team": "Teamwork",
        "skills.personal.analytical": "Analytical Thinking",
        "skills.personal.innovation": "Innovative Approach",
        "services.subtitle": "My Expertise",
        "services.title": "<span>Technical</span> Skills",
        "services.dev.title": "Software Development",
        "services.dev.description": "Experience in full-stack application development with Python, Node.js, React, Flutter, and C#; deploying to production environments and system architecture design.",
        "services.fullstack.title": "Full Stack Development",
        "services.fullstack.description": "End-to-end web application development with React 18 (Vite), Node.js/Express.js, PostgreSQL, Socket.IO, and Docker, including DevOps processes.",
        "services.hackintosh.title": "Hackintosh Expert",
        "services.hackintosh.description": "Extensive experience in Hackintosh installation and optimization on various computer systems.",
        "services.hardware2.title": "Computer Hardware",
        "services.hardware2.description": "Experience in assembling and optimizing custom desktop computer systems for various needs.",
        "services.hardware.title": "Embedded Systems & Robotics",
        "services.hardware.description": "Real-time systems, sensor fusion, and autonomous control architectures on NVIDIA Jetson, Pixhawk PX4, Raspberry Pi, and Arduino platforms.",
        "services.database.title": "Database & Infrastructure",
        "services.database.description": "Scalable infrastructure with PostgreSQL, Redis, Docker, and Nginx; BullMQ job queues and WebSocket architectures.",
        "services.unity.title": "Unity & XR Development",
        "services.unity.description": "Game development with Unity, and developing virtual reality (VR) and augmented reality (AR) applications.",
        "services.ai.title": "AI & LLM Solutions",
        "services.ai.description": "Enterprise AI platforms and intelligent chatbot systems using advanced RAG architectures like Contextual Retrieval, RAPTOR, HippoRAG2, and Agentic RAG.",
        "experience.subtitle": "Work Experience",
        "experience.title": "Professional <span>Experience</span>",
        "experience.atabaum.title": "Software Engineer (Intern)",
        "experience.atabaum.company": "ATABAUM — Atatürk University Computer Science Research and Application Center",
        "experience.atabaum.period": "January 2025 – May 2025",
        "experience.atabaum.project": "AsistTR — Enterprise AI-Powered Live Support & Helpdesk Platform",
        "experience.atabaum.desc1": "Designed and deployed a KVKK-compliant, self-hosted enterprise AI communication platform (AsistTR) as an alternative to Intercom and tawk.to on ATABAUM servers from scratch; the platform will be actively used across Atatürk University's campus network of ~60,000 students.",
        "experience.atabaum.desc2": "Developed a multi-stage RAG pipeline combining Contextual Retrieval, RAPTOR hierarchical summarization, HippoRAG2, and Agentic RAG techniques; monitored the entire pipeline with Langfuse and automatically measured Faithfulness and Answer Relevancy metrics with RAGAS.",
        "experience.atabaum.desc3": "Ran all LLM operations on local Qwen3-35B (vLLM) for enterprise data privacy; set up a KVKK-compliant AI gateway. Built a horizontally scalable WebSocket architecture by routing Socket.IO traffic through Redis Adapter.",
        "experience.atabaum.desc4": "Took end-to-end ownership of the product delivery including real-time live support, SLA-tracked kanban ticket system, IMAP/SMTP email integration, WebRTC audio/video calls, live translation subtitles, and an embeddable widget with Shadow DOM isolation.",
        "projects.subtitle": "My Projects",
        "projects.title": "<span>Recent</span> Projects",
        "projects.kamuflow.title": "KamuFlow AI",
        "projects.kamuflow.description": "A RAG-powered smart public assistant that helps citizens reach the right institution, document, and petition in public applications. Flutter mobile app, Node.js/Express backend, React admin panel, and PostgreSQL + pgvector hybrid retrieval.",
        "projects.kamuflow.award": "<i class=\"fas fa-trophy\"></i> 1st Place — EU-Funded Hackathon (Bilim Erzurum & UNDP, TBB)",
        "projects.kamuflow.button": "Details",
        "projects.translationEvolution.title": "Translation Evolution",
        "projects.translationEvolution.description": "An interactive educational platform comparing SMT, NMT, and LLM translation architectures. Built a simulation engine visualizing tokenization → embedding → attention step by step. Designed strategies for finding cultural equivalents of proverbs and idioms with Gemini API.",
        "projects.translationEvolution.button": "Details",
        "projects.nonGravitySatellite.title": "Non Gravity Model Satellite",
        "projects.satellite.description_detailed": "End-to-end model satellite software system I developed as software leader for TÜRKSAT Model Satellite Competition 2025. Built from scratch with fully automatic telemetry (1 Hz), real-time video streaming (240x180@2fps), high-quality SD card video recording (640x480@15fps), IoT S2S bonus mission, and SAHA protocol for carrier-payload communication.",
        "projects.nonGravitySatellite.summary_title": "Project Summary",
        "projects.nonGravitySatellite.summary_text": "Fully automatic payload system developed by NONGRAVITY Team (286570) for TÜRKSAT Model Satellite Competition 2025. After separation at 400m from rocket-launched model satellite, it descends with its own parachute while transmitting continuous telemetry (1 Hz, 30 fields), real-time video via XBee, and H.264/MP4 recording to SD. Descent speeds: Carrier 12-14 m/s, Payload 6-8 m/s. IoT S2S bonus mission continuously receives temperature data throughout the flight from 2 ground stations at 412-707m distance. Includes SAHA protocol for carrier-payload communication and ARAS alarm system. All software components (Python, C#, Arduino) built from scratch.",
        "projects.nonGravitySatellite.architecture_title": "System Architecture",
        "projects.nonGravitySatellite.architecture_carrier_module": "Carrier Module: Based on Arduino Nano. It undertakes the tasks of collecting sensor data, controlling the separation mechanism, and transmitting basic telemetry data.",
        "projects.nonGravitySatellite.architecture_payload_module": "Payload Module: Based on Raspberry Pi Zero 2 W. It performs the tasks of transferring camera images, transmitting location information, and controlling the multi-spectral filtering system.",
        "projects.nonGravitySatellite.architecture_ground_station": "Ground Station: A C#-based desktop application. It provides functions for visualizing telemetry data, sending commands, monitoring and recording camera images.",
        "projects.nonGravitySatellite.hardware_title": "Main Hardware Used",
        "projects.nonGravitySatellite.hardware_processors": "Processors: Raspberry Pi Zero 2W (Payload), Arduino Nano (Carrier), Arduino Nano + Mega 2560 (IoT Stations)",
        "projects.nonGravitySatellite.hardware_sensors": "Sensors: BMP280 Pressure (I2C 0x76/0x77), 10-DOF IMU (ADXL345, ITG3200, HMC5883L), UbloxNeo-8M GPS (UART), ADS1115 16-bit ADC (Battery monitor), DS3231 RTC",
        "projects.nonGravitySatellite.hardware_communication": "Communication: XBee 3 Pro Module (63mW, 250 Kbps), API Mode 1, PAN ID 0x6570, Mesh Network (Channel 12, 13, 14)",
        "projects.nonGravitySatellite.hardware_camera": "Camera: Raspberry Pi Camera Module 3 (11.9MP) - Dual System: SD Recording (640x480@15fps H.264) + XBee Stream (240x180@2fps MJPEG)",
        "projects.nonGravitySatellite.hardware_power": "Power: NCR18650B Li-Ion 3400mAh x2 (Payload), Beston 9V USB-C (Carrier), LM2596 Step-Down + LM2577 Step-Up Regulators",
        "projects.nonGravitySatellite.hardware_mechanical": "Actuators: 2x SG90 Servo (Multi-spectral filter + Separation), Passive Buzzer (Recovery signal)",
        "projects.nonGravitySatellite.software_title": "Software Architecture",
        "projects.nonGravitySatellite.software_ground_station": "Ground Station: C# Windows Forms (.NET Framework) - Real-time telemetry charts, 3D satellite visualization (OpenGL), map (GMap.NET), live video, ARAS alarm system, CSV export.",
        "projects.nonGravitySatellite.software_carrier_module": "Carrier System: Arduino Nano (C++) - BMP280 pressure, automatic separation @400m, SAHA protocol (XBee), buzzer recovery.",
        "projects.nonGravitySatellite.software_payload_module": "Payload: Python 3.11 (Raspberry Pi) - Multi-threaded architecture, 1 Hz telemetry, dual video system, sensor fusion, SD recording, XBee communication, IoT data reception, systemd service.",
        "projects.nonGravitySatellite.software_iot": "IoT Stations: Embedded Systems: Arduino Nano + Mega 2560 (C++) - BMP280 temperature, XBee 3 Pro (Channel 12/13), 412-707m distance communication.",
        "projects.satellite.award": "<i class=\"fas fa-award\"></i> Full approval in TÜBİTAK 2209-A program!",
        "projects.satellite.button": "Details",
        "projects.sualti.title": "Autonomous Underwater Vehicle - AXOLOTL",
        "projects.sualti.description": "Autonomous underwater vehicle competition I led as software leader within the scope of Teknofest. AXOLOTL, developed for the TEKNOFEST 2025 Unmanned Underwater Systems Competition, is an autonomous underwater vehicle capable of performing autonomous tasks.",
        "projects.axolotl.summary_text": "The AXOLOTL project, developed for the TEKNOFEST 2025 Unmanned Underwater Systems Competition, is an underwater vehicle capable of performing autonomous tasks in underwater conditions. The project has received support from the TÜBİTAK 2209-A University Students Research Projects Support Program.",
        "projects.axolotl.features_title": "Key Features:",
        "projects.axolotl.feature_design": "Original and domestic design: All technical drawings, designs, engineering analyses, and software were developed by team members.",
        "projects.axolotl.feature_hardware": "Advanced Hardware: Jetson Xavier NX (artificial intelligence and image processing), Pixhawk PX4 (task management and motor control).",
        "projects.axolotl.feature_motors": "Motors: 6 brushless motors.",
        "projects.axolotl.feature_sensors": "Sensors: Depth, pressure, IMU/compass, ultrasonic sensors, water leak sensors.",
        "projects.axolotl.feature_mechanical": "Mechanical Design: Hydrodynamic design in Axolotl form, PETG material, modular and sealed body.",
        "projects.axolotl.feature_software": "Software: Python-based image processing (OpenCV, NumPy), task execution, and motor control algorithms.",
        "projects.axolotl.feature_safety": "Safety: Water leak sensors, emergency surfacing system, power cut-off system.",
        "projects.axolotl.updates_text": "The project aims to improve performance with significant hardware updates such as transitioning from Jetson Nano to Jetson Xavier NX and using the Arducam MINI M12 camera system instead of Lidar. Sealing and hydrodynamic efficiency are prioritized in the mechanical design.",
        "projects.underwater.award": "<i class=\"fas fa-award\"></i> Full approval in TÜBİTAK 2209-A program!",
        "projects.sualti.button": "Details",
        "education.subtitle": "My Academic Background",
        "education.title": "Education <span>History</span>",
        "education.atauni.name": "Atatürk University",
        "education.atauni.degree": "Bachelor's Degree · Software Engineering",
        "education.atauni.year": "2023 – 2026 · Graduate",
        "education.iste.name": "İskenderun Technical University (İSTE)",
        "education.iste.degree": "Bachelor's Degree · Computer Engineering",
        "education.iste.year": "2022 - 2023",
        "education.mersin.name": "Mersin University",
        "education.mersin.degree": "Bachelor's Degree · Computer Technology and Information Systems",
        "education.mersin.year": "2021 - 2022",
        "education.aztu.name": "Azerbaijan Technical University",
        "education.aztu.degree": "Bachelor's Degree · Computer Engineering",
        "education.aztu.year": "2019 - 2020",
        "contact.title": "Get in <span>Touch!</span>",
        "contact.subtitle": "You can contact me for your projects",
        "contact.description": "You can use the form below to contact me or reach me through my social media accounts.",
        "contact.form.name": "Your Name",
        "contact.form.email": "Your Email",
        "contact.form.message": "Your Message",
        "contact.form.submit": "Send Message",
        "loading.text": "Loading"
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
    'background6.mp4',
    'background7.mp4',
    'background8.mp4',
    'background9.mp4',
    'background10.mp4',
    'background11.mp4'
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

// Video üzerine kırmızı parçacıklar ekleyen fonksiyon
function createVideoParticles() {
  const videoBackground = document.querySelector('.video-background');
  if (!videoBackground) {
    console.error('Video arka planı bulunamadı');
    return;
  }
  
  console.log('Video parçacıkları oluşturuluyor...');
  
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
      const touchTimeout = setTimeout(() => {
        touchActive = false;
      }, 100);
    }
  }, { passive: true });
  
  document.addEventListener('touchend', () => {
    touchActive = false;
  }, { passive: true });
  
  // Parti modunda olduğunu göster
  const showPartyModeActive = () => {
    console.log('Parti modu aktif!');
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
      console.log('Parti modu kapandı.');
    }, 8000);
  };
  
  // Çift tıklama ile parti modu
  videoBackground.addEventListener('dblclick', (e) => {
    // Video arka planına çift tıklandığında parti modunu etkinleştir
    partyMode = !partyMode;
    
    // Parti modunu belirli bir süre sonra kapat
    clearTimeout(partyTimeout);
    
    if (partyMode) {
      console.log('Parti modu açıldı!');
      showPartyModeActive();
    } else {
      particlesContainer.classList.remove('party-mode');
      console.log('Parti modu kapandı.');
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
        console.log('Mobil parti modu açıldı!');
        showPartyModeActive();
      } else {
        particlesContainer.classList.remove('party-mode');
        console.log('Mobil parti modu kapandı.');
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
  console.log('Video parçacıkları oluşturuldu ve eklendi.');
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
