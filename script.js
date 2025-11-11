// Dashboard interactivity by Shammaq Faisal
(function(){
  // ===== Update footer year =====
  const yearEls = [document.getElementById('year'), document.getElementById('year2'), document.getElementById('year3')];
  yearEls.forEach(el => { if(el) el.textContent = new Date().getFullYear(); });

  // ===== Theme Switcher (Home Page) =====
  const themeToggle = document.getElementById('themeToggle');
  function applyTheme(theme){
    if(theme === 'dark') document.body.classList.add('dark');
    else document.body.classList.remove('dark');
    localStorage.setItem('theme', theme);
    if(themeToggle) themeToggle.checked = (theme === 'dark');
  }
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);
  if(themeToggle){
    themeToggle.addEventListener('change', () => applyTheme(themeToggle.checked ? 'dark' : 'light'));
  }

  // ===== Contact Form Validation =====
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const formMsg = document.getElementById('formMsg');

    function validEmail(e){ return /\S+@\S+\.\S+/.test(e); }

    contactForm.addEventListener('submit', function(ev){
      ev.preventDefault();
      formMsg.textContent = '';
      if(!name.value.trim()){ formMsg.textContent = 'Please enter your name.'; name.focus(); return; }
      if(!validEmail(email.value)){ formMsg.textContent = 'Please enter a valid email.'; email.focus(); return; }
      if(message.value.trim().length < 10){ formMsg.textContent = 'Message must be at least 10 characters.'; message.focus(); return; }

      // Success
      formMsg.style.color = 'green';
      formMsg.textContent = 'Message sent successfully!';
      contactForm.reset();
      setTimeout(()=> formMsg.textContent = '', 4000);
    });
  }

  // ===== Skill Progress Animation =====
  const progressEls = document.querySelectorAll('.progress');
  function animateProgress(){
    progressEls.forEach(el => {
      const bar = el.querySelector('.progress-bar');
      const pct = parseInt(el.getAttribute('data-percent') || 0, 10);
      if(!bar || bar.dataset.animated === 'true') return;
      const rect = el.getBoundingClientRect();
      if(rect.top < window.innerHeight - 100){
        bar.style.width = pct + '%';
        bar.dataset.animated = 'true';
      }
    });
  }
  window.addEventListener('scroll', animateProgress);
  window.addEventListener('load', animateProgress);

  // ===== Project Filter =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  if(filterBtns.length){
    const projects = document.querySelectorAll('.project-item');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        projects.forEach(p => {
          const tags = (p.dataset.tags || '').split(',').map(s => s.trim());
          p.style.display = (f === 'all' || tags.includes(f)) ? '' : 'none';
        });
      });
    });
    document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
  }

  // ===== Live Clock + Session Timer =====
  const clockEl = document.getElementById('liveClock');
  const sessionEl = document.getElementById('sessionTimer');
  let sessionSeconds = 0;
  let sessionInterval;

  function updateClock(){
    if(clockEl){
      const now = new Date();
      clockEl.textContent = now.toLocaleTimeString();
    }
  }

  function updateSession(){
    sessionSeconds++;
    if(sessionEl){
      const m = String(Math.floor(sessionSeconds / 60)).padStart(2, '0');
      const s = String(sessionSeconds % 60).padStart(2, '0');
      sessionEl.textContent = `${m}:${s}`;
    }
  }

  // Start timers
  if(clockEl) setInterval(updateClock, 1000);
  if(sessionEl) setInterval(updateSession, 1000);
  updateClock();

})();
