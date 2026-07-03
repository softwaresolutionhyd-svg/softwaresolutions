(function () {
  'use strict';

  // Header scroll effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
    });
  });

  // Active nav on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }, { passive: true });

  // Hero spotlight
  const hero = document.querySelector('.hero');
  const spotlight = document.getElementById('spotlight');
  if (hero && spotlight) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      spotlight.style.left = ((e.clientX - rect.left) / rect.width) * 100 + '%';
      spotlight.style.top = ((e.clientY - rect.top) / rect.height) * 100 + '%';
    });
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  // Impact slider
  let currentSlide = 0;
  const totalSlides = 3;
  const track = document.getElementById('sliderTrack');
  const dots = document.querySelectorAll('#sliderDots .dot');

  function goToSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
  }

  document.getElementById('prevSlide').addEventListener('click', () => goToSlide(currentSlide - 1));
  document.getElementById('nextSlide').addEventListener('click', () => goToSlide(currentSlide + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));

  let autoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000);
  document.querySelector('.slider').addEventListener('mouseenter', () => clearInterval(autoSlide));
  document.querySelector('.slider').addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000);
  });

  // Contact form
  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    const subject = encodeURIComponent('New inquiry from ' + name);
    const body = encodeURIComponent(
      'Name: ' + name + '\nEmail: ' + email + '\nPhone: ' + phone + '\n\nMessage:\n' + message
    );
    window.location.href = 'mailto:sheraz@softwaresolutions.com?subject=' + subject + '&body=' + body;
  });

})();
