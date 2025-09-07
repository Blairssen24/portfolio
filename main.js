/* =============================================================
   Data Analyst Portfolio — Script
   - jQuery + Bootstrap + AOS
   - Smooth scroll, counters, filters, modal, contact demo, theme toggle, preloader
   ============================================================= */

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// AOS
AOS.init({ duration: 800, once: true, offset: 80 });

// Smooth scroll for in‑page anchors (ignore Bootstrap toggles)
$(document).on('click', 'a[href^="#"]:not([data-bs-toggle])', function (e) {
  const target = $(this.getAttribute('href'));
  if (target.length) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: target.offset().top - 70 }, 600);
  }
});

// Back to top & Skills animation on scroll
const $toTop = $('#toTop');
$(window).on('scroll', function(){
  if ($(this).scrollTop() > 200) { $toTop.fadeIn(); } else { $toTop.fadeOut(); }
  const skillsTop = $('#skills').offset()?.top - 300;
  if (skillsTop && $(this).scrollTop() > skillsTop) {
    $('.skill-fill').each(function(){
      const pct = $(this).data('skill');
      $(this).css('width', pct + '%');
    });
  }
});
$toTop.on('click', function(){ $('html, body').animate({scrollTop:0}, 500); });

// Counters (simple, fast)
function animateCounter($el){
  const target = +$el.data('count');
  const start = performance.now();
  const dur = 1200;
  function tick(now){
    const p = Math.min((now - start) / dur, 1);
    $el.text(Math.floor(p * target).toLocaleString());
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
$('.counter').each(function(){ animateCounter($(this)); });

// Portfolio filters
$('.filter-btn').on('click', function(){
  const filter = $(this).data('filter');
  $('.filter-btn').removeClass('active');
  $(this).addClass('active');
  if (filter === 'all') {
    $('.portfolio-card').show();
  } else {
    $('.portfolio-card').hide();
    $(`.portfolio-card[data-category="${filter}"]`).fadeIn(150);
  }
});

// Case Study modal population
const caseModal = document.getElementById('caseModal');
if (caseModal) {
  caseModal.addEventListener('show.bs.modal', function (event) {
    const btn = event.relatedTarget;
    const title = btn?.getAttribute('data-title') || 'Case Study';
    const body = btn?.getAttribute('data-body') || 'Details coming soon…';
    caseModal.querySelector('#caseModalTitle').textContent = title;
    caseModal.querySelector('#caseModalBody').textContent = body;
  });
}

// Contact form (demo only)
$('#contactForm').on('submit', function(e){
  e.preventDefault();
  const form = this;
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const name = $(form).find('[name="name"]').val();
  alert(`Thanks, ${name}! Your message has been received.`);
  form.reset();
});

// Theme toggle with persistence
const themeBtn = document.getElementById('themeBtn');
function setTheme(dark){
  document.documentElement.classList.toggle('dark', dark);
  localStorage.setItem('theme-dark', dark ? '1' : '0');
}
if (themeBtn) {
  themeBtn.addEventListener('click', ()=> setTheme(!document.documentElement.classList.contains('dark')));
}
setTheme(localStorage.getItem('theme-dark') === '1');

// Preloader hide (on load + safety timeout)
window.addEventListener('load', function(){ setTimeout(function(){ $('#preloader').fadeOut(350); }, 150); });
setTimeout(function(){ $('#preloader').fadeOut(350); }, 3000);

// Ensure Bootstrap ScrollSpy recalculates after load
window.addEventListener('load', function(){
  const dataSpyList = [].slice.call(document.querySelectorAll('[data-bs-spy="scroll"]'));
  dataSpyList.forEach(function (dataSpyEl) {
    bootstrap.ScrollSpy.getOrCreateInstance(dataSpyEl);
  });
});
