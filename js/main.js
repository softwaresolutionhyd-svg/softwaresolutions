(function () {
  'use strict';

  const SI_BASE = 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons';

  const technologies = [
    { name: 'Angular', slug: 'angular', color: '#DD0031' },
    { name: 'Vue.js', slug: 'vuedotjs', color: '#4FC08D' },
    { name: 'React', slug: 'react', color: '#61DAFB' },
    { name: '.Net Core', slug: 'dotnet', color: '#512BD4' },
    { name: 'Express', slug: 'express', color: '#ffffff' },
    { name: 'Node.js', slug: 'nodedotjs', color: '#5FA04E' },
    { name: 'Cypress', slug: 'cypress', color: '#69D3A7' },
    { name: 'MongoDB', slug: 'mongodb', color: '#47A248' },
    { name: 'NestJS', slug: 'nestjs', color: '#E0234E' },
    { name: 'OpenAI', slug: 'openai', color: '#412991' },
    { name: 'Google Cloud', slug: 'googlecloud', color: '#4285F4' },
    { name: 'Python', slug: 'python', color: '#3776AB' },
    { name: 'AWS', slug: 'amazonwebservices', color: '#FF9900' },
    { name: 'FastAPI', slug: 'fastapi', color: '#009688' },
    { name: 'Next.js', slug: 'nextdotjs', color: '#ffffff' },
    { name: 'Kubernetes', slug: 'kubernetes', color: '#326CE5' },
    { name: 'Redis', slug: 'redis', color: '#FF4438' },
    { name: 'Selenium', slug: 'selenium', color: '#43B02A' },
    { name: 'Azure', slug: 'microsoftazure', color: '#0078D4' },
    { name: 'PostgreSQL', slug: 'postgresql', color: '#4169E1' },
    { name: 'Single-Spa', slug: 'singlespa', color: '#1976D2', custom: true },
    { name: 'RabbitMQ', slug: 'rabbitmq', color: '#FF6600' },
    { name: 'Playwright', slug: 'playwright', color: '#2EAD33' },
    { name: 'Amazon EKS', slug: 'amazoneks', color: '#FF9900' }
  ];

  const customSvg = {
    singlespa: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 12h6l-2 8 10-8h-6l2-8z" fill="currentColor"/></svg>'
  };

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

  // Tech grid
  const techGrid = document.getElementById('techGrid');
  if (techGrid) {
    technologies.forEach(tech => {
      const card = document.createElement('div');
      card.className = 'tech-card';
      card.style.setProperty('--brand', tech.color);

      let iconUrl;
      if (tech.custom) {
        iconUrl = 'data:image/svg+xml,' + encodeURIComponent(customSvg.singlespa);
      } else {
        iconUrl = SI_BASE + '/' + tech.slug + '.svg';
      }

      card.innerHTML =
        '<div class="tech-icon">' +
          '<img class="tech-img" src="' + iconUrl + '" alt="' + tech.name + '" loading="lazy">' +
          '<span class="tech-mask" style="background-color:' + tech.color + ';-webkit-mask-image:url(\'' + iconUrl + '\');mask-image:url(\'' + iconUrl + '\');"></span>' +
        '</div>' +
        '<div class="tech-name">' + tech.name + '</div>';

      techGrid.appendChild(card);
    });
  }

  // Team 3D tilt
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = 'perspective(1200px) rotateX(' + (-y * 8) + 'deg) rotateY(' + (x * 8) + 'deg)';
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
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
