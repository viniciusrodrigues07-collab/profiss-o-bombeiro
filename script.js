// Menu mobile + animações
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    });

    // Fechar menu ao clicar em um link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menu');
      });
    });

    // Fechar menu ao pressionar Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menu');
        toggle.focus();
      }
    });
  }

  // Animação das barras ao entrar na viewport
  const barras = document.querySelectorAll('.barra-fill');
  if ('IntersectionObserver' in window && barras.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const width = fill.dataset.value || '0%';

          // Garante que começa em 0 e força reflow para a transição funcionar
          fill.style.width = '0';
          fill.offsetWidth;

          requestAnimationFrame(() => {
            fill.style.width = width;
          });

          observer.unobserve(fill);
        }
      });
    }, { threshold: 0.25 });

    barras.forEach(barra => observer.observe(barra));
  } else {
    // Fallback: preenche direto se não houver IntersectionObserver
    barras.forEach(barra => {
      barra.style.width = barra.dataset.value || '0%';
    });
  }
});
