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
  
  // Auto-hide nav on scroll down (only on mobile)
  if (window.innerWidth <= 768) {
    if (currentScrollY > lastScrollY && currentScrollY > 300) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }
  }
  
  lastScrollY = currentScrollY;
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav__links');
const body = document.body;

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
  body.classList.toggle('menu-open'); // Prevent body scroll when menu is open
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    body.classList.remove('menu-open');
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
    body.classList.remove('menu-open');
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

// Form Submission
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  
  if (form) {
    // Add form animations
    const formInputs = form.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
      // Add focus effect
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentElement.classList.remove('focused');
        }
      });
    });
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(form);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      
      if (!name || !email || !message) {
        showNotification('Lütfen tüm alanları doldurun.', 'error');
        return;
      }
      
      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Gönderiliyor...';
      submitBtn.disabled = true;
      
      // Email gönderme (formspree.io servisi kullanarak)
      const formAction = 'https://formspree.io/f/xgegplvk';
      
      fetch(formAction, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        if (response.ok) {
          showNotification('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.', 'success');
          form.reset();
          // Reset form state
          formInputs.forEach(input => {
            input.parentElement.classList.remove('focused');
          });
        } else {
          response.json().then(data => {
            showNotification('Mesaj gönderilirken bir hata oluştu: ' + (data.error || 'Bilinmeyen hata'), 'error');
          });
        }
      })
      .catch(error => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        showNotification('Mesaj gönderilirken bir hata oluştu: ' + error.message, 'error');
      });
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
  handleSwipe();
}, false);

// Kaydırma yönünü belirle ve işle
function handleSwipe() {
  // Yatay kaydırma mesafesi
  const swipeDistanceX = touchEndX - touchStartX;
  // Dikey kaydırma mesafesi
  const swipeDistanceY = touchEndY - touchStartY;
  
  // Sadece menü açıkken ve yeterince yatay kaydırma varsa işlem yap
  // Dikey kaydırma çok fazlaysa, muhtemelen sayfa kaydırma işlemidir
  if (
    Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY) && 
    Math.abs(swipeDistanceX) > 50
  ) {
    // Eğer soldan sağa kaydırma yapıldıysa ve menü açıksa kapat
    if (swipeDistanceX > 0 && !navLinks.classList.contains('active')) {
      hamburger.classList.add('active');
      navLinks.classList.add('active');
      body.classList.add('menu-open');
    } 
    // Eğer sağdan sola kaydırma yapıldıysa ve menü açıksa kapat
    else if (swipeDistanceX < 0 && navLinks.classList.contains('active')) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      body.classList.remove('menu-open');
    }
  }
}

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
        body.classList.remove('menu-open');
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
