// Rastgele arkaplan videosu seçme
document.addEventListener('DOMContentLoaded', function() {
  // Mevcut tüm arkaplan videoları
  const backgroundVideos = [
    'background1.mp4',
    'background2.mp4',
    'background3.mp4',
    'background4.mp4',
    'background5.mp4',
    'background6.mp4'
  ];
  
  // Rastgele bir video seç
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
        element.style[key] = leaveStyles[key];
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

// Tüm sayfa fonksiyonlarını yönetecek ana DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
  // Mevcut tüm arkaplan videoları
  const backgroundVideos = [
    'background1.mp4',
    'background2.mp4',
    'background3.mp4',
    'background4.mp4',
    'background5.mp4',
    'background6.mp4'
  ];
  
  // Rastgele bir video seç
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
  
  // Form Submission (eski DOMContentLoaded eventinden taşındı)
  const form = document.getElementById('contactForm');
  
  if (form) {
    // Add form animations
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
    
    form.addEventListener('submit', function(e) {
      // Form gönderimini işle
      console.log('Form gönderildi');
    });
  }
});

// Notification function
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => {
    notification.remove();
  });
  
  // Create notification
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // Add close button
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
  
  // Show notification
  setTimeout(() => {
    notification.classList.add('notification-visible');
  }, 10);
  
  // Auto-hide after 5 seconds
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
    const scrollPosition = window.scrollY + 100; // 100px offset
    
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
});
