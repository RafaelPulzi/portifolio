let certificados = [];
let filtrados = [];
let pagina = 0;
const porPagina = 9;

const grid = document.getElementById('certificatesGrid');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const searchInput = document.getElementById('searchInput');
const yearFilter = document.getElementById('yearFilter');
const techFilters = document.getElementById('techFilters');

/* ================= LOAD ================= */
fetch(`data/certificados.json?nocache=${Date.now()}`)
  .then(res => res.json())
  .then(data => {
    certificados = data;
    initFilters();
    aplicarFiltros();
  });

/* ================= FILTROS ================= */
function initFilters() {
  // anos
  const anos = [...new Set(certificados.map(c => c.ano).filter(Boolean))];
  anos.sort((a,b) => b - a);
  anos.forEach(a => {
    const opt = document.createElement('option');
    opt.value = a;
    opt.textContent = a;
    yearFilter.appendChild(opt);
  });

  // tecnologias
  const techs = new Set();
  certificados.forEach(c => (c.tecnologias || []).forEach(t => techs.add(t)));

  techs.forEach(t => {
    const btn = document.createElement('button');
    btn.textContent = t;
    btn.onclick = () => {
      btn.classList.toggle('active');
      aplicarFiltros();
    };
    techFilters.appendChild(btn);
  });
}

/* ================= APPLY ================= */
function aplicarFiltros() {
  const texto = searchInput.value.toLowerCase();
  const ano = yearFilter.value;
  const techAtivas = [...techFilters.querySelectorAll('.active')].map(b => b.textContent);

  filtrados = certificados.filter(c => {
    const matchTexto =
      c.nome.toLowerCase().includes(texto) ||
      c.descricao.toLowerCase().includes(texto) ||
      (c.tecnologias || []).some(t => t.toLowerCase().includes(texto));

    const matchAno = !ano || c.ano == ano;

    const matchTech =
      techAtivas.length === 0 ||
      techAtivas.every(t => (c.tecnologias || []).includes(t));

    return matchTexto && matchAno && matchTech;
  });

  pagina = 0;
  render();
  updateButtons();
}

/* ================= RENDER ================= */

function render() {

  grid.innerHTML = '';

  filtrados.forEach(c => {

    const card = document.createElement('article');
    card.className = 'certificate-card';

    const thumb = document.createElement('div');
    thumb.className = 'certificate-image';

    const img = document.createElement('img');
    img.src = c.imagem;
    img.alt = c.nome;
    img.loading = 'lazy';

    thumb.appendChild(img);
    card.appendChild(thumb);

    card.innerHTML += `
      <h3>${c.nome}</h3>
      <p>${c.descricao}</p>
    `;

    gerarThumbnail(c.arquivo, img);

    card.onclick = () => window.open(c.arquivo, '_blank');

    grid.appendChild(card);

  });

  atualizarSlide();
}

async function gerarThumbnail(arquivo, imgEl) {
  // cache
  const cacheKey = `thumb:${arquivo}`;
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    imgEl.src = cached;
    return;
  }

  // imagem normal
  if (arquivo.match(/\.(png|jpg|jpeg|webp)$/i)) {
    imgEl.src = arquivo;
    return;
  }

  // PDF
  if (arquivo.endsWith('.pdf')) {
    try {
      const pdf = await pdfjsLib.getDocument(arquivo).promise;
      const page = await pdf.getPage(1);

      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: ctx, viewport }).promise;

      const dataUrl = canvas.toDataURL('image/webp');
      sessionStorage.setItem(cacheKey, dataUrl);
      imgEl.src = dataUrl;

    } catch (err) {
      console.error('Erro PDF:', err);
      imgEl.src = 'img/pdf-placeholder.png';
    }
  }
}

/* ================= NAV ================= */
prevBtn.onclick = () => {
  pagina--;
  atualizarSlide();
  updateButtons();
};

nextBtn.onclick = () => {
  pagina++;
  atualizarSlide();
  updateButtons();
};

function updateButtons() {
  prevBtn.disabled = pagina === 0;
  nextBtn.disabled = (pagina + 1) * porPagina >= filtrados.length;
}

/* ================= EVENTS ================= */
searchInput.addEventListener('input', aplicarFiltros);
yearFilter.addEventListener('change', aplicarFiltros);



function atualizarSlide(){

  const largura = grid.parentElement.offsetWidth;

  grid.style.transform = `translateX(-${pagina * largura}px)`;

}

/* ================= MOBILE ================= */
let touchStartX = 0;
let touchEndX = 0;

const viewport = document.querySelector(".certificates-viewport");

viewport.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

viewport.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});


function handleSwipe(){

  const distancia = touchEndX - touchStartX;

  if (Math.abs(distancia) < 50) return; // evita swipe pequeno

  if (distancia < 0){
    // swipe para esquerda → próximo
    if((pagina + 1) * porPagina < filtrados.length){
      pagina++;
      atualizarSlide();
      updateButtons();
    }
  }

  if (distancia > 0){
    // swipe para direita → anterior
    if(pagina > 0){
      pagina--;
      atualizarSlide();
      updateButtons();
    }
  }

}