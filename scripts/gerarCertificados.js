const fs = require('fs');
const path = require('path');
const poppler = require('pdf-poppler');
const sharp = require('sharp');

/* ================= CONFIG ================= */

const BASE = path.join(__dirname, '..');
const CERT_DIR = path.join(BASE, 'images', 'certificados');
const IMG_DIR = path.join(BASE, 'images', 'certificadosImagens');
const DATA_DIR = path.join(BASE, 'data');
const JSON_PATH = path.join(DATA_DIR, 'certificados.json');

const IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.webp'];
const PDF_EXT = '.pdf';

/* ================= SETUP ================= */

fs.mkdirSync(IMG_DIR, { recursive: true });
fs.mkdirSync(DATA_DIR, { recursive: true });

if (!fs.existsSync(CERT_DIR)) {
  console.error('❌ Pasta images/certificados não existe');
  process.exit(1);
}

/* ================= AUTO TAG ENGINE ================= */

const TAG_RULES = {
  python: 'Python',
  java: 'Java',
  node: 'Node.js',
  react: 'React',
  docker: 'Docker',
  aws: 'AWS',
  azure: 'Azure',
  linux: 'Linux',
  sql: 'SQL',
  data: 'Data',
  dados: 'Data',
  ml: 'Machine Learning',
  ai: 'Inteligência Artificial',
  ia: 'Inteligência Artificial',
  backend: 'Backend',
  frontend: 'Frontend',
  cloud: 'Cloud',
  security: 'Segurança'
};

function gerarTags(nomeArquivo) {
  const nome = nomeArquivo.toLowerCase();
  const tags = new Set();

  for (const chave in TAG_RULES) {
    if (nome.includes(chave)) {
      tags.add(TAG_RULES[chave]);
    }
  }

  return [...tags];
}


async function gerarThumbnailPDF(pdfPath, outPath) {
  const tmpBase = outPath.replace('.webp', '');

  await poppler.convert(pdfPath, {
    format: 'png',
    out_dir: path.dirname(tmpBase),
    out_prefix: path.basename(tmpBase),
    page: 1
  });

  await sharp(`${tmpBase}-1.png`)
    .resize(600, 400, { fit: 'inside' })
    .webp({ quality: 85 })
    .toFile(outPath);

  fs.unlinkSync(`${tmpBase}-1.png`);
}

/* ================= PROCESSAMENTO ================= */

async function processar() {
  const arquivos = fs.readdirSync(CERT_DIR);

  const existentes = fs.existsSync(JSON_PATH)
    ? JSON.parse(fs.readFileSync(JSON_PATH))
    : [];

  const mapa = Object.fromEntries(
    existentes.map(c => [c.id, c])
  );

  const certificados = [];

  for (const file of arquivos) {
    const ext = path.extname(file).toLowerCase();
    const base = path.parse(file).name;
    const id = base.toLowerCase().replace(/\s+/g, '-');

    const src = path.join(CERT_DIR, file);
    const thumb = path.join(IMG_DIR, `${base}.webp`);

    if (ext === PDF_EXT && !fs.existsSync(thumb)) {
      await gerarThumbnailPDF(src, thumb);
    }

    if (IMAGE_EXT.includes(ext) && !fs.existsSync(thumb)) {
      await sharp(src)
        .resize(600, 400, { fit: 'inside' })
        .webp({ quality: 85 })
        .toFile(thumb);
    }

    const tagsAuto = gerarTags(base);

    certificados.push({
      id,
      nome: base.replace(/[-_]/g, ' '),
      descricao: mapa[id]?.descricao ?? 'Certificação profissional.',
      tecnologias: mapa[id]?.tecnologias?.length
        ? mapa[id].tecnologias
        : tagsAuto,
      instituicao: mapa[id]?.instituicao ?? '',
      ano: mapa[id]?.ano ?? '',
      arquivo: `/images/certificados/${file}`,
      imagem: `/images/certificadosImagens/${base}.webp`
    });
  }

  fs.writeFileSync(JSON_PATH, JSON.stringify(certificados, null, 2));
  console.log(`✔ ${certificados.length} certificados processados`);
}

processar();


