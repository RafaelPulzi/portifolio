document.getElementById('year').textContent = new Date().getFullYear();

const text = '“Adorador do mundo e seus pequenos grandes eventos”';
const element = document.getElementById('typewriter');

let index = 0;

function typeLetter() {
  if (index < text.length) {
    element.textContent += text.charAt(index);
    index++;
    setTimeout(typeLetter, 45); // velocidade
  }
}

typeLetter();
