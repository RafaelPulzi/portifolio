const chokidar = require('chokidar');
const { exec } = require('child_process');
const path = require('path');

const pasta = path.join(__dirname, '..', 'images', 'certificados');

console.log('👀 Monitorando certificados...');

// processa existentes ao iniciar
exec('node gerar-certificados.js');

let timeout = null;

chokidar.watch(pasta, { ignoreInitial: true })
  .on('add', (file) => {
    console.log('📄 Novo arquivo detectado:', file);

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      exec('node gerar-certificados.js', (err, stdout, stderr) => {
        if (err) {
          console.error('Erro:', err);
          return;
        }

        console.log(stdout);
      });
    }, 500);
  });