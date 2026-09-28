const loader = document.querySelector('[data-site-loader]');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

if (loader) {
  loader.innerHTML = '<div class="loader-lockup"><svg class="loader-mark" viewBox="180 50 280 250" role="img" aria-label="BoxSys"><polygon class="loader-piece" points="367,77 328,57 236,104 234,109 269,127 273,127 366,80" fill="#297ed1"/><polygon class="loader-piece" points="348,105 350,108 385,126 389,126 422,108 420,104 387,87" fill="#297ed1"/><polygon class="loader-piece" points="196,149 198,155 282,198 287,198 319,167 319,163 233,119 228,119" fill="#ed670e"/><polygon class="loader-piece" points="458,149 427,119 422,119 338,162 337,167 369,198 373,198 455,156" fill="#eb5e10"/><polygon class="loader-piece" points="224,183 225,238 308,284 321,289 322,186 292,214 287,215" fill="#e53b2c"/><polygon class="loader-piece" points="430,184 369,216 365,216 334,186 335,288 430,238" fill="#f7920c"/></svg><span class="loader-word">Box<span>Sys</span></span></div>';
  window.addEventListener('load', () => window.setTimeout(() => loader.classList.add('is-hidden'), 1050), { once: true });
  window.setTimeout(() => loader.classList.add('is-hidden'), 5000);
}

if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Abrir navegação' : 'Fechar navegação');
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir navegação');
      navigation.classList.remove('is-open');
    });
  });
}

document.body.classList.add('motion-ready');
const revealItems = document.querySelectorAll('[data-reveal], .reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((element) => revealObserver.observe(element));
} else {
  revealItems.forEach((element) => element.classList.add('is-visible'));
}

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

document.querySelectorAll('[data-whatsapp-helper]').forEach((helper) => {
  const trigger = helper.querySelector('[data-whatsapp-trigger]');
  const options = helper.querySelector('[data-whatsapp-options]');
  if (!trigger || !options) return;

  const close = () => {
    options.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
  };

  trigger.addEventListener('click', () => {
    const willOpen = options.hidden;
    options.hidden = !willOpen;
    trigger.setAttribute('aria-expanded', String(willOpen));
  });

  document.addEventListener('click', (event) => {
    if (!helper.contains(event.target)) close();
  });
});

document.querySelectorAll('[data-interactive-demo]').forEach((demo) => {
  const tabs = [...demo.querySelectorAll('[data-demo-tab]')];
  const panels = [...demo.querySelectorAll('[role="tabpanel"]')];

  const activate = (tab) => {
    const panelId = tab.dataset.demoTab;
    tabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-selected', String(isActive));
      item.tabIndex = isActive ? 0 : -1;
    });
    panels.forEach((panel) => {
      const isActive = panel.id === panelId;
      panel.hidden = !isActive;
      panel.classList.toggle('is-active', isActive);
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = tabs.length - 1;
      else nextIndex = (index + (event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1) + tabs.length) % tabs.length;
      tabs[nextIndex].focus();
      activate(tabs[nextIndex]);
    });
  });
});
