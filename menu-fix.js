// Hamburger menü düzeltme - mobil menü sorununu giderme
(function() {
  // Doküman hazır olduğunda
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Menü düzeltme modülü başlatılıyor');
    
    // Elemanları tanımla
    var hamburger = document.querySelector('.hamburger') || document.getElementById('menuButton');
    var body = document.body;
    var menuOverlay = document.querySelector('.menu-overlay');
    var navLinks = document.querySelectorAll('.nav__link');
    
    if (!hamburger) {
      console.error('Hamburger menü bulunamadı');
      return;
    }
    
    console.log('Hamburger menü bulundu:', hamburger);
    
    // Hamburger menü tıklama işleyicisi - tüm olay dinleyicileri temizleyip yeniden ekler
    function resetMenuEvents() {
      // Önceki tüm tıklama olaylarını kaldır
      const newHamburger = hamburger.cloneNode(true);
      hamburger.parentNode.replaceChild(newHamburger, hamburger);
      hamburger = newHamburger;
      
      // Yeni olay ekle
      hamburger.addEventListener('click', function(e) {
        console.log('Hamburger tıklandı (menu-fix.js)');
        e.preventDefault();
        e.stopPropagation();
        body.classList.toggle('menu-open');
      });
    }
    
    // Menü açma/kapama işlevini yeniden tanımla
    resetMenuEvents();
    
    // Menü dışına tıklama ile kapatma
    if (menuOverlay) {
      menuOverlay.addEventListener('click', function() {
        body.classList.remove('menu-open');
      });
    }
    
    // Menü linklerine tıklanınca menüyü kapat
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        body.classList.remove('menu-open');
      });
    });
    
    // Doküman tıklaması ile menü kapanması
    document.addEventListener('click', function(e) {
      if (body.classList.contains('menu-open') && 
          !e.target.closest('.nav__links') && 
          !hamburger.contains(e.target)) {
        body.classList.remove('menu-open');
      }
    });
    
    // ESC tuşuna basıldığında menüyü kapat
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && body.classList.contains('menu-open')) {
        body.classList.remove('menu-open');
      }
    });
    
    console.log('Menü düzeltme modülü hazır');
  });
})();
