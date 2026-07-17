/* Software Solutions — main.js fallback (full logic is inline in index.html) */
document.addEventListener('DOMContentLoaded', function() {
  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function() {
      header.classList.toggle('scrolled', window.scrollY > 20);
    });
  }
});
