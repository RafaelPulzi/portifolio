document.getElementById('year').textContent = new Date().getFullYear();

const toggle = document.getElementById('themeToggle');
const root = document.documentElement;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
  toggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

toggle?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';

  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  toggle.textContent = next === 'dark' ? '☀️' : '🌙';
});
