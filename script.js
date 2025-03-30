document.addEventListener('DOMContentLoaded', function() {
  // Tarayıcıyı ve mobil kontrolü
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
  
  // Sayfa tamamen yüklendiğinde
  window.addEventListener('load', function() {
    // Arkaplan videosunu yükle
    loadBackgroundVideo(isMobile);
    
    // Dil ayarlarını yükle
    setupLanguageSwitcher();
    
    // AOS ve paralax efektlerini başlat
    setTimeout(() => {
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }
      setupParallaxEffects();
    }, 1000);
  });
  
  setupContactForm();
  highlightCurrentSection();
  
  window.addEventListener('scroll', highlightCurrentSection);
  window.addEventListener('orientationchange', handleOrientationChange);
});

function loadBackgroundVideo(isMobile) {
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
  
  const randomIndex = Math.floor(Math.random() * backgroundVideos.length);
  const randomVideo = backgroundVideos[randomIndex];
  
  const source = document.createElement('source');
  source.src = randomVideo;
  source.type = 'video/mp4';
  
  if (isMobile) {
    videoElement.setAttribute('preload', 'metadata');
    
    document.addEventListener('click', function fullLoadVideo() {
      videoElement.setAttribute('preload', 'auto');
      document.removeEventListener('click', fullLoadVideo);
    }, { once: true });
  } else {
    videoElement.setAttribute('preload', 'auto');
  }
  
  videoElement.addEventListener('error', function() {
    console.error('Video yüklenirken hata oluştu. Varsayılan video kullanılıyor.');
    source.src = backgroundVideos[0];
    videoElement.load();
  });
  
  videoElement.appendChild(source);
  videoElement.load();
}

function setupContactForm() {
  const form = document.getElementById('contactForm');
  
  if (!form) return;
  
  const formInputs = form.querySelectorAll('input, textarea');
  
  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.classList.remove('focused');
      }
    });
  });
  
  form.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  if (!name || !email || !message) {
    showNotification('Lütfen tüm alanları doldurun.', 'error');
    return;
  }
  
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Gönderiliyor...';
  submitBtn.disabled = true;
  
  fetch(form.action, {
    method: form.method,
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Form gönderilirken bir hata oluştu.');
  })
  .then(data => {
    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    showNotification('Mesajınız başarıyla gönderildi!', 'success');
  })
  .catch(error => {
    console.error(error);
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    showNotification('Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin.', 'error');
  });
}

const nav = document.querySelector('nav');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > 50) {
    nav.style.padding = '0.8rem 2rem';
    nav.style.backgroundColor = 'rgba(9, 12, 16, 0.95)';
  } else {
    nav.style.padding = '1.5rem 2rem';
    nav.style.backgroundColor = 'rgba(9, 12, 16, 0.8)';
  }
  
  nav.style.transform = 'translateY(0)';
  
  lastScrollY = currentScrollY;
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav__links');
const body = document.body;

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
  body.classList.toggle('menu-open');
});

document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    body.classList.remove('menu-open');
  });
});

document.addEventListener('click', (e) => {
  if (
    navLinks.classList.contains('active') && 
    !e.target.closest('.nav__links') && 
    !e.target.closest('.hamburger')
  ) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    body.classList.remove('menu-open');
  }
});

const contactBtn = document.querySelector('.btn');
if (contactBtn) {
  contactBtn.addEventListener('click', () => {
  document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
});
}

document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const isMobile = window.innerWidth <= 768;
      const offset = isMobile ? -20 : -80;
      
      setTimeout(() => {
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset + offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      }, isMobile ? 300 : 0);
    }
  });
});

document.querySelector('.video').addEventListener('click', (e) => {
});

const youtubeBtn = document.querySelector('.youtube-btn');
if (youtubeBtn) {
  youtubeBtn.addEventListener('click', (e) => {
  });
}

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

const animateElements = (elements, enterStyles, leaveStyles) => {
  elements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      Object.keys(enterStyles).forEach(key => {
        element.style[key] = enterStyles[key];
      });
    });

    element.addEventListener('mouseleave', () => {
      Object.keys(leaveStyles).forEach(key => {
        element.style[key] = leaveStyles[key];
      });
    });
  });
};

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

function showNotification(message, type = 'info') {
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => {
    notification.remove();
  });
  
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  const closeBtn = document.createElement('span');
  closeBtn.className = 'notification-close';
  closeBtn.innerHTML = '&times;';
  closeBtn.addEventListener('click', () => {
    notification.classList.add('notification-hiding');
    setTimeout(() => {
      notification.remove();
    }, 300);
  });
  
  notification.appendChild(closeBtn);
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('notification-visible');
  }, 10);
  
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.classList.add('notification-hiding');
      setTimeout(() => {
        if (document.body.contains(notification)) {
          notification.remove();
        }
      }, 300);
    }
  }, 5000);
}

let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}, false);

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
}, false);

function handleSwipe() {
  const swipeDistanceX = touchEndX - touchStartX;
  const swipeDistanceY = touchEndY - touchStartY;
  
  if (
    Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY) && 
    Math.abs(swipeDistanceX) > 50
  ) {
    if (swipeDistanceX > 0 && !navLinks.classList.contains('active')) {
      hamburger.classList.add('active');
      navLinks.classList.add('active');
      body.classList.add('menu-open');
    } 
    else if (swipeDistanceX < 0 && navLinks.classList.contains('active')) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      body.classList.remove('menu-open');
    }
  }
}

const animateOnScroll = () => {
  const animatedElements = document.querySelectorAll('[data-aos]');
  
  if ('IntersectionObserver' in window) {
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
        } else if (!entry.target.classList.contains('aos-once')) {
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

function handleOrientationChange() {
  setTimeout(() => {
      if (navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
      }
      
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }
    }, 200);
}
  
  function highlightCurrentSection() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav__link');
    
    let currentSection = '';
  const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      const href = item.getAttribute('href').replace('#', '');
      
      if (href === currentSection) {
        item.classList.add('active');
      }
    });
  }

function setupLanguageSwitcher() {
  console.log('Dil değiştirici ayarlanıyor...');
  
  // Tarayıcı dilini tespit et
  const detectBrowserLanguage = () => {
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.startsWith('tr') ? 'tr' : 'en';
  };
  
  // Dil kontrolü - tercih edilen dili al, yoksa tarayıcı dilini veya varsayılan olarak tr kullan
  const savedLang = localStorage.getItem('preferredLanguage');
  const preferredLang = savedLang || detectBrowserLanguage();
  
  console.log('Tercih edilen dil:', preferredLang);
  
  // İlk yüklendiğinde dil ayarını uygula
  setTimeout(() => {
    changeLang(preferredLang);
    
    // Navbar butonlarını güncelle
    const navLangButtons = document.querySelectorAll('.nav-language-btn');
    navLangButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-lang') === preferredLang) {
        btn.classList.add('active');
      }
    });
    
    console.log('Dil butonları güncellendi');
  }, 300);
  
  // Navbar dil butonları için olay dinleyicileri
  const navLangButtons = document.querySelectorAll('.nav-language-btn');
  navLangButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      console.log('Dil butonu tıklandı:', this.getAttribute('data-lang'));
      if (!this.classList.contains('active')) {
        const lang = this.getAttribute('data-lang');
        handleLanguageChange(lang, navLangButtons, this);
      }
    });
  });
  
  console.log('Dil değiştirici ayarlandı');
}

// Dil değişikliği işleyici
function handleLanguageChange(lang, buttons, clickedButton) {
  // Dil değiştirme animasyonu
  buttons.forEach(b => b.classList.add('disabled'));
  clickedButton.classList.add('switching');
  
  setTimeout(() => {
    changeLang(lang);
    buttons.forEach(b => b.classList.remove('disabled'));
    clickedButton.classList.remove('switching');
  }, 300);
}

function changeLang(lang) {
  document.documentElement.setAttribute('lang', lang);
  
  localStorage.setItem('preferredLanguage', lang);

  // Dil değiştirme animasyonu
  document.body.classList.add('lang-transition');
  
  // Navbar butonlarını güncelle
  const navLangButtons = document.querySelectorAll('.nav-language-btn');
  navLangButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    }
  });
  
  // Dil değişimi sırasında sayfayı hafifçe karartma
  const overlay = document.createElement('div');
  overlay.classList.add('lang-overlay');
  document.body.appendChild(overlay);
  
  console.log(`Dil dosyası yükleniyor: languages/${lang}.json`);
  
  // Dil dosyasını yükle ve çevirileri uygula
  fetch(`languages/${lang}.json`)
    .then(response => {
      console.log('Dosya cevabı alındı:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP hata! Durum: ${response.status}`);
      }
      return response.json();
    })
    .then(translations => {
      console.log('Çeviriler başarıyla yüklendi');
      
      // Yükleme ekranı çevirisini güncelle
      const loadingText = document.querySelector('.loading-text');
      if (loadingText) {
        const key = 'loading.text';
        const text = translations[key] || (lang === 'tr' ? 'Yükleniyor' : 'Loading');
        loadingText.innerHTML = text + '<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>';
      }
      
      setTimeout(() => {
        updatePageContent(translations);
        
        // Animasyonu temizle
        setTimeout(() => {
          document.body.classList.remove('lang-transition');
          overlay.remove();
        }, 300);
      }, 100);
    })
    .catch(error => {
      console.error('Dil dosyası yüklenirken hata oluştu:', error);
      
      // Yedek çevirileri kullan
      const backupTranslations = window.translations && window.translations[lang];
      if (backupTranslations) {
        console.log('Yedek çeviriler kullanılıyor');
        updatePageContent(backupTranslations);
      }
      
      // Hata olsa bile animasyonu temizle
      setTimeout(() => {
        document.body.classList.remove('lang-transition');
        overlay.remove();
      }, 300);
    });
}

function updatePageContent(translations) {
  const elements = document.querySelectorAll('[data-i18n]');
  
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    
    if (translations[key]) {
      // Animasyon sınıfını ekle
      element.classList.add('content-changing');
      
      // Kısa bir gecikme sonra içeriği güncelle
      setTimeout(() => {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translations[key];
        } else {
          element.innerHTML = translations[key];
        }
        
        // Animasyon tamamlandıktan sonra sınıfı kaldır
        setTimeout(() => {
          element.classList.remove('content-changing');
        }, 200);
      }, 100);
    }
  });
}

window.addEventListener('load', () => {
  setupParallaxEffects();
  setupLazyLoading();
  setupFormElements();
  
  // setupLanguageSwitcher artık sayfa yüklendiğinde çağrılmayacak
  // çünkü yükleme ekranı kapandıktan sonra çağrılacak
});

function setupLazyLoading() {
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.setAttribute('loading', 'lazy');
    });
  } else {
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
}

function setupParallaxEffects() {
  const parallaxElements = document.querySelectorAll('.parallax');
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    parallaxElements.forEach(element => {
      const originalSpeed = parseFloat(element.getAttribute('data-speed')) || 0.1;
      element.setAttribute('data-speed', originalSpeed / 2);
    });
  }
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.getAttribute('data-speed')) || 0.1;
      const offset = scrollY * speed;
      
      if (element.classList.contains('parallax-bg')) {
        element.style.backgroundPositionY = `${offset}px`;
      } else {
        if (isMobile && offset > 30) {
          element.style.transform = `translateY(30px)`;
        } else {
          element.style.transform = `translateY(${offset}px)`;
        }
      }
    });
  });
  
  window.addEventListener('resize', () => {
    const newIsMobile = window.innerWidth <= 768;
    if (newIsMobile !== isMobile) {
      location.reload();
    }
  });
}

function setupFormElements() {
  if (window.innerWidth <= 768) {
    const formInputs = document.querySelectorAll('.footer__form input, .footer__form textarea');
    formInputs.forEach(input => {
      input.style.fontSize = '16px';
    });
  }
}
