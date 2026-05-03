// ============================================================
//  ROOT ACADEMY — main.js
//  Navbar scroll · animaciones scroll · back-to-top con flecha
//  · formulario con validación y feedback
// ============================================================
 
document.addEventListener('DOMContentLoaded', () => {
 
  /* ── 1. Navbar: se oscurece al hacer scroll ──────────────── */
  const navbar = document.querySelector('.navbar') || document.querySelector('.header__container');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }
 
  /* ── 2. Link activo según página actual ──────────────────── */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar ul li a, .header__container .navbar ul li a').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
  });
 
  /* ── 3. Animaciones al hacer scroll ─────────────────────── */
  //  Compatible con .anim (tus HTMLs) y .reveal (versión alternativa)
  const animEls = document.querySelectorAll('.anim, .reveal');
 
  if (animEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 70); // delay escalonado suave
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
 
    animEls.forEach(el => observer.observe(el));
  }
 
  /* ── 4. Botón "volver arriba" con flecha SVG ─────────────── */
  const backBtn = document.createElement('button');
  backBtn.id = 'back-to-top';
  backBtn.setAttribute('aria-label', 'Volver arriba');
 
  // Flecha SVG limpia (chevron hacia arriba)
  backBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
         viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2.5"
         stroke-linecap="round" stroke-linejoin="round">
      <polyline points="18 15 12 9 6 15"/>
    </svg>
  `;
 
  // Estilos inline robustos (funcionan sin importar qué CSS tenga la página)
  Object.assign(backBtn.style, {
    position:       'fixed',
    bottom:         '28px',
    right:          '28px',
    zIndex:         '999',
    width:          '46px',
    height:         '46px',
    borderRadius:   '50%',
    background:     '#494c7d',
    color:          'white',
    border:         '1px solid rgba(131,199,199,0.4)',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    cursor:         'pointer',
    opacity:        '0',
    pointerEvents:  'none',
    transition:     'opacity 0.3s, background 0.3s, transform 0.2s',
    boxShadow:      '0 4px 16px rgba(0,0,0,0.5)',
  });
 
  document.body.appendChild(backBtn);
 
  // Mostrar u ocultar según posición del scroll
  window.addEventListener('scroll', () => {
    const show = window.scrollY > 300;
    backBtn.style.opacity       = show ? '1' : '0';
    backBtn.style.pointerEvents = show ? 'auto' : 'none';
  }, { passive: true });
 
  // Efectos hover
  backBtn.addEventListener('mouseenter', () => {
    backBtn.style.background  = 'rgb(11, 10, 46)';
    backBtn.style.transform   = 'translateY(-3px)';
    backBtn.style.borderColor = '#494c7d';
  });
  backBtn.addEventListener('mouseleave', () => {
    backBtn.style.background  = '#494c7d';
    backBtn.style.transform   = 'translateY(0)';
    backBtn.style.borderColor = 'rgba(131,199,199,0.4)';
  });
 
  // Clic → scroll suave al inicio
  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
 
  /* ── 5. Formulario: validación + feedback visual ─────────── */
  // Compatible con .form__container (contactos.html) y otras variantes
  const form = document.querySelector('.form__container, .form-contacto, .contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
 
      const submitBtn = form.querySelector('input[type="submit"], button[type="submit"]');
      const isInput   = submitBtn.tagName === 'INPUT';
      const original  = isInput ? submitBtn.value : submitBtn.textContent;
 
      // Validar campos requeridos
      let valid = true;
      form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#ff6b6b';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });
 
      if (!valid) {
        const msg = '⚠ Completa los campos requeridos';
        if (isInput) submitBtn.value = msg;
        else submitBtn.textContent   = msg;
        setTimeout(() => {
          if (isInput) submitBtn.value = original;
          else submitBtn.textContent   = original;
        }, 2500);
        return;
      }
 
      // Simular envío — reemplaza con fetch a tu backend cuando lo tengas
      if (isInput) submitBtn.value = 'Enviando…';
      else submitBtn.textContent   = 'Enviando…';
      submitBtn.disabled = true;
 
      setTimeout(() => {
        if (isInput) submitBtn.value = '✓ Mensaje enviado';
        else submitBtn.textContent   = '✓ Mensaje enviado';
        submitBtn.style.background = '#2a7a55';
        form.reset();
 
        setTimeout(() => {
          if (isInput) submitBtn.value = original;
          else submitBtn.textContent   = original;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }, 1200);
    });
  }
 
});