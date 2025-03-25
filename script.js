// Sticky Navigation
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.style.padding = '1rem 0';
    nav.style.backgroundColor = 'rgba(9, 12, 16, 0.95)';
  } else {
    nav.style.padding = '1.5rem 0';
    nav.style.backgroundColor = 'rgba(9, 12, 16, 0.8)';
  }
});

// Smooth Scrolling for Buttons
document.querySelector('.btn').addEventListener('click', () => {
  document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.video').addEventListener('click', (e) => {
  e.preventDefault();
  alert('Video not available in this demo.');
});

// Add Animation to Service Cards
const serviceCards = document.querySelectorAll('.service__card');
serviceCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
    card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = 'none';
  });
});

// Read More Links
const readMoreLinks = document.querySelectorAll('.read__more');
readMoreLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    alert('More details not available in this demo.');
  });
});

// Form Submission
const form = document.querySelector('.footer__form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nameInput = form.querySelector('input[placeholder="Your Name"]');
  const emailInput = form.querySelector('input[placeholder="Your Email Address"]');

  if (!nameInput.value || !emailInput.value) {
    alert('Please fill in all required fields.');
    return;
  }

  alert('Thank you for your message! We will get back to you soon.');
  form.reset();
});
