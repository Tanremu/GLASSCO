// ===== Mobile menu =====
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobile-nav');

if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
}

document.querySelectorAll('.mobile-nav-link').forEach(link => {
  if (link.tagName === 'A') {
    link.addEventListener('click', () => {
      burger?.classList.remove('open');
      mobileNav?.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

// ===== Tabs =====
document.querySelectorAll('[data-tabs]').forEach(container => {
  const btns = container.querySelectorAll('.tab-btn');
  const panels = container.querySelectorAll('.tab-content');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      panels.forEach(p => p.classList.toggle('active', p.dataset.tab === target));
    });
  });
});

// ===== Modals =====
function openModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.remove('open'); document.body.style.overflow = ''; }
}

document.querySelectorAll('[data-modal]').forEach(btn => {
  btn.addEventListener('click', e => { e.preventDefault(); openModal(btn.dataset.modal); });
});
document.querySelectorAll('[data-close-modal]').forEach(btn => {
  btn.addEventListener('click', () => {
    const overlay = btn.closest('.modal-overlay');
    if (overlay) { overlay.classList.remove('open'); document.body.style.overflow = ''; }
  });
});
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) { overlay.classList.remove('open'); document.body.style.overflow = ''; }
  });
});

// ===== Forms → spasibo.html =====
document.querySelectorAll('form[data-submit]').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const tel = form.querySelector('input[type=tel]');
    if (tel && tel.value.replace(/\D/g,'').length < 9) {
      tel.focus(); tel.style.borderColor = '#EF4444';
      tel.setAttribute('placeholder', 'Введите корректный номер!');
      return;
    }
    window.location.href = 'spasibo.html';
  });
});

// ===== Phone mask =====
document.querySelectorAll('input[type=tel]').forEach(input => {
  input.addEventListener('focus', () => { input.style.borderColor = ''; });
  input.addEventListener('input', e => {
    let v = e.target.value.replace(/[^\d+]/g, '');
    if (v && !v.startsWith('+')) {
      if (v.startsWith('992')) v = '+' + v;
      else if (v.startsWith('0')) v = '+992' + v.slice(1);
      else v = '+992' + v;
    }
    e.target.value = v;
  });
});

// ===== Calculator =====
const calcPanels = document.querySelectorAll('.calc-panel');
const calcStepEls = document.querySelectorAll('.calc-step');
let currentCalcStep = 0;

function goToCalcStep(step) {
  if (step < 0 || step >= calcPanels.length) return;
  calcPanels.forEach((p, i) => p.classList.toggle('active', i === step));
  calcStepEls.forEach((s, i) => {
    s.classList.remove('active', 'done');
    if (i < step) s.classList.add('done');
    if (i === step) s.classList.add('active');
  });
  currentCalcStep = step;
  const el = document.querySelector('.calc-wrapper');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.querySelectorAll('[data-next-step]').forEach(btn => {
  btn.addEventListener('click', () => goToCalcStep(currentCalcStep + 1));
});
document.querySelectorAll('[data-prev-step]').forEach(btn => {
  btn.addEventListener('click', () => goToCalcStep(currentCalcStep - 1));
});

if (calcPanels.length > 0) goToCalcStep(0);

// Calculator price preview
function updateCalcPrice() {
  const w = parseFloat(document.getElementById('win-width')?.value) || 1400;
  const h = parseFloat(document.getElementById('win-height')?.value) || 1600;
  const area = (w / 1000) * (h / 1000);
  const price = Math.round(area * 1250);
  const el = document.getElementById('calc-price');
  if (el) el.textContent = price.toLocaleString('ru-RU') + ' сомов';
}
document.getElementById('win-width')?.addEventListener('input', updateCalcPrice);
document.getElementById('win-height')?.addEventListener('input', updateCalcPrice);

// ===== Radio cards =====
document.querySelectorAll('.radio-card').forEach(card => {
  card.addEventListener('click', () => {
    const group = card.closest('.radio-group');
    group?.querySelectorAll('.radio-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    const inp = card.querySelector('input[type=radio]');
    if (inp) inp.checked = true;
  });
});

// ===== Accordion =====
document.querySelectorAll('.accordion-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const isOpen = btn.classList.contains('open');
    const list = btn.closest('.accordion-list');
    list?.querySelectorAll('.accordion-btn').forEach(b => {
      b.classList.remove('open');
      b.nextElementSibling?.classList.remove('open');
    });
    if (!isOpen) {
      btn.classList.add('open');
      btn.nextElementSibling?.classList.add('open');
    }
  });
});

// ===== Portfolio filter =====
document.querySelectorAll('.portfolio-filter .tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.portfolio-filter .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.portfolio-item').forEach(item => {
      item.style.display = (filter === 'all' || item.dataset.cat === filter) ? '' : 'none';
    });
  });
});

// ===== Sticky header scroll =====
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (!header) return;
  if (header.classList.contains('light')) return;
  if (window.scrollY > 60) {
    header.style.background = 'rgba(13,27,42,1)';
  } else {
    header.style.background = 'rgba(13,27,42,0.97)';
  }
});
