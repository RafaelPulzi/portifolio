// Atualizar ano
document.getElementById('year').textContent =
  new Date().getFullYear();

const toggle = document.getElementById('dark-toggle');
const root = document.documentElement;

/* ========================
   INICIAR EM MODO CLARO
======================== */
root.setAttribute('data-theme', 'light');
toggle.checked = false;

/* ========================
   Carregar tema salvo
======================== */
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  enableDark();
  toggle.checked = true;
}

/* ========================
   Alternar tema
======================== */
toggle.addEventListener('change', () => {
  if (toggle.checked) {
    enableDark();
  } else {
    disableDark();
  }
});

function enableDark() {
  root.setAttribute('data-theme', 'dark');
  root.classList.add('dark-active');
  localStorage.setItem('theme', 'dark');
}

function disableDark() {
  root.setAttribute('data-theme', 'light');
  root.classList.remove('dark-active');
  localStorage.setItem('theme', 'light');
}

/* ========================
   Menu Mobile
======================== */
const menuToggle = document.querySelector('.menu-toggle');
const menuLinks = document.querySelector('.menu-links');

menuToggle?.addEventListener('click', () => {
  menuLinks.classList.toggle('open');
});

document.querySelectorAll('.menu-links a').forEach(link => {
  link.addEventListener('click', () => {
    menuLinks.classList.remove('open');
  });
});