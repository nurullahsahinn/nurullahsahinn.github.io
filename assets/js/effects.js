document.addEventListener('DOMContentLoaded', function() {
      // Scroll İlerleme Çubuğu
      window.addEventListener('scroll', function() {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        document.querySelector('.scroll-progress-bar').style.width = progress + '%';
      });

      // Fare İzleyici Efekti
      const cursorFollower = document.querySelector('.cursor-follower');
      
      // Animated Custom Cursor varsa, cursor-follower'ı gizle
      if (cursorFollower) {
        cursorFollower.style.display = 'none';
      }
      
      let mouseX = 0, mouseY = 0;
      let cursorX = 0, cursorY = 0;

      // Fare pozisyonunu güncelleyen fonksiyon
      document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (cursorFollower) {
          cursorFollower.style.opacity = '0'; // Animated cursor ile çakışmasın
        }
      });

      // Link ve butonlar üzerinde fare efektini büyüt
      const hoverElements = document.querySelectorAll('a, button, .btn, .nav__link, .service__card, .project__card, .skills__card, .video, .icon');
      
      hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          cursorFollower.style.width = '50px';
          cursorFollower.style.height = '50px';
          cursorFollower.style.background = 'rgba(242, 72, 11, 0.2)';
        });
        
        element.addEventListener('mouseleave', () => {
          cursorFollower.style.width = '20px';
          cursorFollower.style.height = '20px';
          cursorFollower.style.background = 'rgba(242, 72, 11, 0.5)';
        });
      });

      // Fare izleyiciyi animasyon ile güncelle
      function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.1;
        cursorY += dy * 0.1;
        
        if (cursorFollower) {
          cursorFollower.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
        }
        
        requestAnimationFrame(animateCursor);
      }
      
      animateCursor();

      // Tıklama Splash Efekti
      document.addEventListener('click', function(e) {
        // Sadece mobil olmayan cihazlarda göster
        if (window.innerWidth > 768) {
          // Yeni splash elementi oluştur
          const splash = document.createElement('div');
          splash.className = 'click-splash';
          
          // Pozisyonu ayarla
          splash.style.left = e.clientX + 'px';
          splash.style.top = e.clientY + 'px';
          splash.style.width = '100px';
          splash.style.height = '100px';
          
          // Sayfaya ekle
          document.body.appendChild(splash);
          
          // Animasyon bitince elementi kaldır
          setTimeout(() => {
            splash.remove();
          }, 800);
        }
      });

      // Mobil cihaz kontrolü
      const isMobile = window.innerWidth <= 768;
      
      // Tıklama dalga efekti
      function createBubble(e) {
        // Video arkaplanına tıklandığında dalga efektini oluşturma
        // Böylece parti modunu engellemez
        if (e.target.closest('.video-background') || 
            e.target.closest('.video-particles-container')) {
          // Video arkaplanına tıklandığında dalga oluşturma

          return;
        }
        
        // Diğer alanlara tıklandığında dalga efekti oluştur
        const bubble = document.createElement('div');
        bubble.className = 'water-bubble';
        
        // Rastgele boyut (20-40px)
        const size = Math.random() * 20 + 20;
        
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = e.clientX + 'px';
        bubble.style.top = e.clientY + 'px';
        
        document.body.appendChild(bubble);
        
        setTimeout(() => {
          bubble.remove();
        }, 2000);
      }
      
      document.addEventListener('click', createBubble);

      // Mobil cihazlar için özel işlemler
      if (isMobile) {
        // Sayfa genelinde dokunma dalga efektlerini etkinleştir
        let touchFollower = null;
        let touchRipples = [];
        let touchAnimationFrame = null;
        
        document.body.addEventListener('touchstart', function(e) {
          // Video arkaplanına dokunulduğunda dalga efektini oluşturma
          if (e.target.closest('.video-background') || 
              e.target.closest('.video-particles-container')) {

            return;
          }
          
          // Takipçiyi oluştur
          if (!touchFollower) {
            touchFollower = document.createElement('div');
            touchFollower.className = 'touch-follower';
            touchFollower.style.position = 'fixed';
            touchFollower.style.width = '30px';
            touchFollower.style.height = '30px';
            touchFollower.style.borderRadius = '50%';
            touchFollower.style.background = 'radial-gradient(circle, rgba(242, 72, 11, 0.7) 0%, rgba(242, 72, 11, 0.3) 70%)';
            touchFollower.style.boxShadow = '0 0 10px rgba(242, 72, 11, 0.5)';
            touchFollower.style.pointerEvents = 'none';
            touchFollower.style.zIndex = '9999';
            touchFollower.style.transform = 'translate(-50%, -50%)';
            touchFollower.style.transition = 'transform 0.05s linear, width 0.2s ease, height 0.2s ease';
            document.body.appendChild(touchFollower);
          }
          
          // Dokunma noktasını al
          const touch = e.touches[0];
          const x = touch.clientX;
          const y = touch.clientY;
          
          // Takipçiyi güncelle
          touchFollower.style.left = x + 'px';
          touchFollower.style.top = y + 'px';
          touchFollower.style.opacity = '1';
          
          // Dokunulan noktada küçük bir ripple oluştur
          const ripple = document.createElement('div');
          ripple.className = 'touch-ripple-small';
          ripple.style.position = 'fixed';
          ripple.style.left = x + 'px';
          ripple.style.top = y + 'px';
          ripple.style.width = '10px';
          ripple.style.height = '10px';
          ripple.style.borderRadius = '50%';
          ripple.style.background = 'rgba(242, 72, 11, 0.8)';
          ripple.style.transform = 'translate(-50%, -50%) scale(1)';
          ripple.style.opacity = '0.8';
          ripple.style.pointerEvents = 'none';
          ripple.style.zIndex = '9998';
          document.body.appendChild(ripple);
          
          // Ripple animasyonu
          touchRipples.push({
            element: ripple,
            createdAt: Date.now(),
            duration: 600
          });
          
          // Animasyon fonksiyonu başlat
          if (!touchAnimationFrame) {
            animateTouchRipples();
          }
        }, {passive: true});
        
        // Parmak hareketi takibi - çok daha hızlı
        document.body.addEventListener('touchmove', function(e) {
          // Video arkaplanına dokunulduğunda efekti geçersiz kıl
          if (e.target.closest('.video-background') || 
              e.target.closest('.video-particles-container')) {
            return;
          }
          
          if (touchFollower) {
            const touch = e.touches[0];
            const x = touch.clientX;
            const y = touch.clientY;
            
            // Doğrudan konum güncelleme (transition olmadan)
            touchFollower.style.left = x + 'px';
            touchFollower.style.top = y + 'px';
            
            // Her harekette küçük parçacıklar bırak
            if (Math.random() < 0.3) { // Her 3 hareketten birinde
              const particle = document.createElement('div');
              particle.className = 'touch-particle';
              particle.style.position = 'fixed';
              particle.style.left = (x + (Math.random() * 20 - 10)) + 'px';
              particle.style.top = (y + (Math.random() * 20 - 10)) + 'px';
              particle.style.width = Math.random() * 8 + 2 + 'px';
              particle.style.height = particle.style.width;
              particle.style.borderRadius = '50%';
              particle.style.background = 'rgba(242, 72, 11, ' + (Math.random() * 0.5 + 0.2) + ')';
              particle.style.transform = 'translate(-50%, -50%)';
              particle.style.pointerEvents = 'none';
              particle.style.zIndex = '9997';
              document.body.appendChild(particle);
              
              // Parçacık animasyonu
              touchRipples.push({
                element: particle,
                createdAt: Date.now(),
                duration: 400
              });
            }
          }
        }, {passive: true});
        
        // Dokunma bitince
        document.body.addEventListener('touchend', function(e) {
          // Video arkaplanına dokunulduğunda efekti geçersiz kıl
          if (e.target && (e.target.closest('.video-background') || 
              e.target.closest('.video-particles-container'))) {
            return;
          }
          
          if (touchFollower) {
            // Son konum effekti
            const finalRipple = document.createElement('div');
            finalRipple.className = 'touch-ripple-end';
            finalRipple.style.position = 'fixed';
            finalRipple.style.left = touchFollower.style.left;
            finalRipple.style.top = touchFollower.style.top;
            finalRipple.style.width = '40px';
            finalRipple.style.height = '40px';
            finalRipple.style.borderRadius = '50%';
            finalRipple.style.background = 'radial-gradient(circle, rgba(242, 72, 11, 0.6) 0%, rgba(242, 72, 11, 0) 70%)';
            finalRipple.style.transform = 'translate(-50%, -50%) scale(0)';
            finalRipple.style.pointerEvents = 'none';
            finalRipple.style.zIndex = '9996';
            document.body.appendChild(finalRipple);
            
            // Final ripple animasyonu
            touchRipples.push({
              element: finalRipple,
              createdAt: Date.now(),
              duration: 500,
              endAnimation: true
            });
            
            // Takipçiyi kaldır
            setTimeout(() => {
              if (touchFollower) {
                touchFollower.style.opacity = '0';
                setTimeout(() => {
                  if (touchFollower) {
                    touchFollower.remove();
                    touchFollower = null;
                  }
                }, 200);
              }
            }, 100);
          }
        }, {passive: true});
        
        // Ripple ve parçacık animasyonlarını yönet
        function animateTouchRipples() {
          const now = Date.now();
          let hasActiveRipples = false;
          
          touchRipples.forEach((ripple, index) => {
            const elapsed = now - ripple.createdAt;
            const progress = Math.min(elapsed / ripple.duration, 1);
            
            if (progress < 1) {
              hasActiveRipples = true;
              
              if (ripple.element.className === 'touch-ripple-small') {
                // Küçük ripple büyüme animasyonu
                ripple.element.style.transform = `translate(-50%, -50%) scale(${1 + progress * 2})`;
                ripple.element.style.opacity = (0.8 * (1 - progress)).toString();
              } else if (ripple.element.className === 'touch-particle') {
                // Parçacık hareket ve solma animasyonu
                ripple.element.style.transform = `translate(-50%, -50%) translate(${progress * 20}px, ${progress * 20 - 10}px)`;
                ripple.element.style.opacity = (0.7 * (1 - progress)).toString();
              } else if (ripple.element.className === 'touch-ripple-end') {
                // Son ripple büyüme animasyonu
                ripple.element.style.transform = `translate(-50%, -50%) scale(${progress * 3})`;
                ripple.element.style.opacity = (0.6 * (1 - progress)).toString();
              }
            } else {
              // Animasyon tamamlandı, elementi kaldır
              ripple.element.remove();
              touchRipples.splice(index, 1);
            }
          });
          
          // Hala aktif ripple'lar varsa animasyona devam et
          if (hasActiveRipples) {
            touchAnimationFrame = requestAnimationFrame(animateTouchRipples);
          } else {
            touchAnimationFrame = null;
          }
        }
        
        // Mobil için giriş animasyonları
        const setupMobileAnimations = () => {
          const sections = document.querySelectorAll('section');
          
          // Her bölüm için IntersectionObserver tanımla
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('mobile-fade-in');
                observer.unobserve(entry.target);
              }
            });
          }, {
            threshold: 0.1
          });
          
          // Bölümleri gözlemle
          sections.forEach(section => {
            observer.observe(section);
          });
        };
        
        // Paralaks efekti oluştur
        const setupParallaxEffect = () => {
          const header = document.querySelector('header');
          if (!header) return;
          
          // Eğer başlık bölümünde video arka planı varsa atlayalım
          if (header.querySelector('.video-background')) return;
          
          // Paralaks konteyneri oluştur
          const parallaxContainer = document.createElement('div');
          parallaxContainer.className = 'mobile-parallax-container';
          
          // Paralaks katmanlarını oluştur
          const background = document.createElement('div');
          background.className = 'mobile-parallax-background';
          background.style.backgroundImage = 'url("./assets/images/profile/nurullah-sahin.jpg")';
          background.style.opacity = '0.3';
          
          const middleground = document.createElement('div');
          middleground.className = 'mobile-parallax-middleground';
          middleground.style.backgroundImage = 'linear-gradient(135deg, rgba(242, 72, 11, 0.2), transparent)';
          
          const foreground = document.createElement('div');
          foreground.className = 'mobile-parallax-foreground';
          foreground.style.backgroundImage = 'linear-gradient(45deg, var(--dark-color), transparent)';
          foreground.style.opacity = '0.7';
          
          parallaxContainer.appendChild(background);
          parallaxContainer.appendChild(middleground);
          parallaxContainer.appendChild(foreground);
          
          // Sayfaya ekle (isteğe bağlı olarak yerleştirilebilir)
          const aboutSection = document.querySelector('#about');
          if (aboutSection) {
            aboutSection.insertBefore(parallaxContainer, aboutSection.firstChild);
          }
          
          // Paralaks efektini etkinleştir
          window.addEventListener('deviceorientation', function(e) {
            if (!e.beta || !e.gamma) return;
            
            const tiltX = e.gamma / 10; // -10 ila 10 arası
            const tiltY = e.beta / 10;  // -10 ila 10 arası
            
            background.style.transform = `translate3d(${tiltX * -2}px, ${tiltY * -2}px, 0)`;
            middleground.style.transform = `translate3d(${tiltX * -1}px, ${tiltY * -1}px, 0)`;
            foreground.style.transform = `translate3d(${tiltX * -0.5}px, ${tiltY * -0.5}px, 0)`;
          });
        };
        
        // Sayfa geçiş efekti
        const setupPageTransitions = () => {
          const transitionElement = document.createElement('div');
          transitionElement.className = 'mobile-page-transition';
          document.body.appendChild(transitionElement);
          
          // Bağlantıları dinle
          const links = document.querySelectorAll('a[href^="#"]');
          
          links.forEach(link => {
            link.addEventListener('click', (e) => {
              const target = link.getAttribute('href');
              
              if (target.startsWith('#') && target !== '#') {
                e.preventDefault();
                
                // Geçiş animasyonunu başlat
                transitionElement.classList.add('active');
                
                // Hedef bölüme git
                setTimeout(() => {
                  const targetElement = document.querySelector(target);
                  if (targetElement) {
                    window.scrollTo({
                      top: targetElement.offsetTop - 70,
                      behavior: 'instant'
                    });
                  }
                  
                  // Animasyonu kapat
                  setTimeout(() => {
                    transitionElement.classList.remove('active');
                  }, 100);
                }, 300);
              }
            });
          });
        };
        
        // Mobil animasyonları başlat
        setupMobileAnimations();
        setupParallaxEffect();
        setupPageTransitions();
      } else {
        // Masaüstü cihazlar için fare takibi ve diğer efektler
        // ... existing code ...
      }
    });
