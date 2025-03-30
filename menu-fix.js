// Mobil menü düzeltmesi ve masaüstü benzeri deneyim
document.addEventListener('DOMContentLoaded', function() {
  console.log('Mobil menü hazırlanıyor');
  
  // Gerekli elemanlar
  const hamburger = document.querySelector('.hamburger');
  const body = document.body;
  const menuOverlay = document.querySelector('.menu-overlay');
  const navLinks = document.querySelectorAll('.nav__link');
  
  // Hamburger menü tıklaması
  if (hamburger) {
    hamburger.addEventListener('click', function(e) {
      e.preventDefault();
      body.classList.toggle('menu-open');
      console.log('Menü durumu:', body.classList.contains('menu-open') ? 'açık' : 'kapalı');
    });
  }
  
  // Menü dışına tıklama
  if (menuOverlay) {
    menuOverlay.addEventListener('click', function() {
      body.classList.remove('menu-open');
    });
  }
  
  // Menü linklerine tıklama
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      body.classList.remove('menu-open');
    });
  });
  
  // ESC tuşu ile kapatma
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && body.classList.contains('menu-open')) {
      body.classList.remove('menu-open');
    }
  });
  
  console.log('Mobil menü aktivasyonu tamamlandı');
});
