document.addEventListener('DOMContentLoaded', function() {
  const backgroundVideos = [
    'background1.mp4',
    'background2.mp4',
    'background3.mp4',
    'background4.mp4',
    'background5.mp4',
    'background6.mp4'
  ];
  
  const randomVideo = backgroundVideos[Math.floor(Math.random() * backgroundVideos.length)];
  
  const videoElement = document.getElementById('background-video');
  
  const source = document.createElement('source');
  source.src = randomVideo;
  source.type = 'video/mp4';
  
  videoElement.appendChild(source);
  
  videoElement.addEventListener('error', function() {
    console.error('Video yüklenirken hata oluştu. Varsayılan video kullanılıyor.');
    source.src = backgroundVideos[0];
    videoElement.load();
  });
  
  videoElement.load();
});

const nav = document.querySelector('nav');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > 50) {
    nav.style.padding = '1rem 2rem';
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
  body.classList.toggle('menu-open'); // Prevent body scroll when menu is open
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

document.querySelector('.btn').addEventListener('click', () => {
  document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
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

document.addEventListener('DOMContentLoaded', function() {
  const backgroundVideos = [
    'background1.mp4',
    'background2.mp4',
    'background3.mp4',
    'background4.mp4',
    'background5.mp4',
    'background6.mp4'
  ];
  
  const randomVideo = backgroundVideos[Math.floor(Math.random() * backgroundVideos.length)];
  
  const videoElement = document.getElementById('background-video');
  
  const source = document.createElement('source');
  source.src = randomVideo;
  source.type = 'video/mp4';
  
  videoElement.appendChild(source);
  
  videoElement.addEventListener('error', function() {
    console.error('Video yüklenirken hata oluştu. Varsayılan video kullanılıyor.');
    source.src = backgroundVideos[0];
    videoElement.load();
  });
  
  videoElement.load();
  
  const form = document.getElementById('contactForm');
  
  if (form) {
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
    });
  }
});

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

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    animateOnScroll();
  }, 100);
  
  window.addEventListener('scroll', () => {
    highlightCurrentSection();
  });
  
  highlightCurrentSection();
  
  window.addEventListener('orientationchange', () => {
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
  });
  
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
