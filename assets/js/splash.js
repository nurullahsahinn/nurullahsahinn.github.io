(() => {
  const initAOS = () => {
    if (typeof AOS === 'undefined') return;
    AOS.init({
      duration: 800,
      offset: 120,
      once: false,
      disable: false,
      easing: 'ease-in-out',
      delay: 100,
    });
  };

  const startProgressAnimation = () => {
    const progressBar = document.querySelector('.splash-progress-bar');
    const progressPercent = document.querySelector('.splash-progress-percent');
    const loadingText = document.querySelector('.splash-text');
    if (!progressBar || !progressPercent || !loadingText) return;

    let percent = 0;
    loadingText.textContent = 'YÜKLENİYOR...';

    const tick = () => {
      if (percent >= 100) {
        loadingText.textContent = 'TAMAMLANDI!';
        return;
      }

      const increment = percent < 20 ? 2 : percent > 80 ? 0.5 : 1;
      percent = Math.min(100, percent + increment);
      progressBar.style.width = `${percent}%`;
      progressPercent.textContent = `${Math.round(percent)}%`;
      window.setTimeout(tick, percent < 80 ? 30 : 50);
    };

    window.setTimeout(tick, 500);
  };

  const normalizeSplashLogo = () => {
    const splashLogo = document.querySelector('.splash-logo');
    if (!splashLogo) return;

    Object.assign(splashLogo.style, {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '30px',
      fontWeight: '900',
      color: '#f2480b',
      textShadow: '0 0 15px rgba(242, 72, 11, 0.7)',
      zIndex: '2',
    });

    const nsText = splashLogo.querySelector('span');
    if (nsText) {
      Object.assign(nsText.style, {
        marginLeft: '4px',
        fontSize: '26px',
        fontWeight: '900',
        color: '#f2480b',
        textShadow: '0 0 15px rgba(242, 72, 11, 0.7)',
      });
    }
  };

  const hideSplash = () => {
    const splashScreen = document.getElementById('splashScreen');
    if (!splashScreen) return;

    splashScreen.style.opacity = '0';
    splashScreen.style.visibility = 'hidden';
    window.setTimeout(() => {
      splashScreen.remove();
      document.body.classList.add('loaded');
      if (typeof AOS !== 'undefined') AOS.refresh();
    }, 800);
  };

  document.addEventListener('DOMContentLoaded', () => {
    window.setTimeout(() => document.body.classList.add('loaded'), 300);
    normalizeSplashLogo();
    startProgressAnimation();
    initAOS();
  });

  window.addEventListener('load', () => window.setTimeout(hideSplash, 3500));
  window.addEventListener('resize', () => {
    if (typeof AOS !== 'undefined') AOS.refresh();
  });
})();
