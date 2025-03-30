// Mobil menü düzeltmesi ve masaüstü benzeri deneyim
document.addEventListener('DOMContentLoaded', function() {
  console.log('Mobil menü masaüstü deneyimi hazırlanıyor');
  
  // Gerekli elemanlar
  const hamburger = document.querySelector('.hamburger');
  const body = document.body;
  const menuOverlay = document.querySelector('.menu-overlay');
  const navLinks = document.querySelectorAll('.nav__link');
  const navContainer = document.querySelector('nav');
  
  // Hamburger menü tıklaması - masaüstü deneyimine benzer animasyon
  if (hamburger) {
    hamburger.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      body.classList.toggle('menu-open');
      console.log('Menü durumu:', body.classList.contains('menu-open') ? 'açık' : 'kapalı');
    });
  }
  
  // Menü dışına tıklama ile kapat - masaüstü benzeri
  if (menuOverlay) {
    menuOverlay.addEventListener('click', function() {
      body.classList.remove('menu-open');
    });
  }
  
  // Menü linklerine tıklama masaüstü deneyimine benzer
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
          });
          body.classList.remove('menu-open');
        }
      }
    });
  });
  
  // ESC tuşu ile kapatma - masaüstü deneyimi
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && body.classList.contains('menu-open')) {
      body.classList.remove('menu-open');
    }
  });
  
  // Ekran yeniden boyutlandırma durumunda menü kapansın
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && body.classList.contains('menu-open')) {
      body.classList.remove('menu-open');
    }
  });
  
  // Kaydırma işlemi sırasında navigasyon çubuğunun arka planını güncelleme
  let scrollPosition = 0;
  window.addEventListener('scroll', function() {
    scrollPosition = window.scrollY;
    
    if (scrollPosition > 50) {
      navContainer.style.background = "rgba(9, 12, 16, 0.95)";
      navContainer.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
    } else {
      navContainer.style.background = "rgba(9, 12, 16, 0.8)";
      navContainer.style.boxShadow = "none";
    }
  });
  
  // Dokunmatik cihazlar için ek iyileştirmeler
  if ('ontouchstart' in window) {
    // Dokunmatik cihazlar için karşılıklı dokunmatik geri bildirim
    const touchElements = document.querySelectorAll('.nav__link, .btn, .icon, .back-to-top, .service__card, .project__card, .skills__card');
    
    touchElements.forEach(function(element) {
      element.addEventListener('touchstart', function() {
        this.classList.add('touch-active');
      });
      
      element.addEventListener('touchend', function() {
        this.classList.remove('touch-active');
      });
      
      element.addEventListener('touchcancel', function() {
        this.classList.remove('touch-active');
      });
    });
  }
  
  console.log('Mobil menü masaüstü deneyimi tamamlandı');
});
