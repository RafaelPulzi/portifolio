    function loadPhoto(event) {
      const photoDiv = document.getElementById('photo');
      const file = event.target.files[0];

      if (!file) return;

      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);

      photoDiv.innerHTML = '';
      photoDiv.appendChild(img);
    }

    document.getElementById('year').textContent = new Date().getFullYear();
    const projetos = [

{
nome:"Portfólio Profissional",

descricao:"Website pessoal desenvolvido para apresentar projetos, certificados e experiências profissionais em tecnologia.",

readme:"Este projeto consiste no desenvolvimento completo de um portfólio profissional responsivo utilizando HTML, CSS e JavaScript puro. A aplicação inclui sistema de tema claro e escuro, catálogo dinâmico de projetos com filtros de busca, visualização interativa de certificados e um sistema de modal para exibição detalhada de projetos. O objetivo do projeto foi criar uma plataforma moderna para apresentar habilidades técnicas, projetos desenvolvidos e experiência em programação, com foco em performance, design minimalista e organização de conteúdo.",

tecnologias:["HTML","CSS","JavaScript","Frontend","UI/UX"],

imagens:[
"images/projetos/portfolio1.png",
"images/projetos/portfolio2.png"
],

demo:"",

github:"https://github.com/RafaelPulzi/portifolio"
},

{
nome:"Sistema Solar Interativo em JavaScript",

descricao:"Simulação visual do sistema solar desenvolvida em JavaScript com animação orbital dos planetas.",

readme:"Este projeto implementa uma simulação interativa do sistema solar utilizando JavaScript para manipulação dinâmica do DOM e animações orbitais. O sistema apresenta os planetas orbitando ao redor do Sol de forma visual e didática, permitindo compreender conceitos básicos de astronomia e movimento orbital. O projeto foi desenvolvido com foco educacional e também como prática de manipulação gráfica, animações e organização de lógica em JavaScript.",

tecnologias:["JavaScript","HTML","CSS","Simulação","Frontend"],

imagens:[
"images/projetos/solar1.png",
"images/projetos/solar2.png"
],

demo:"",

github:"https://github.com/RafaelPulzi/SistemaSolarJS"
},

{
nome:"Servidor GEO com Arduino Uno",

descricao:"Sistema embarcado utilizando Arduino Uno para coleta e transmissão de dados geográficos.",

readme:"Este projeto consiste no desenvolvimento de um servidor de dados geográficos utilizando Arduino Uno para coleta e transmissão de informações ambientais e de localização. O sistema foi projetado para aplicações de monitoramento geográfico e sensoriamento ambiental, permitindo integrar sensores e módulos de comunicação para enviar dados coletados para sistemas externos. O objetivo do projeto foi explorar aplicações de Internet das Coisas (IoT) utilizando microcontroladores e comunicação serial com dispositivos externos.",

tecnologias:["Arduino","C++","IoT","Hardware","Sensores"],

imagens:[
"images/projetos/geo1.png",
"images/projetos/geo2.png"
],

demo:"",

github:"https://github.com/RafaelPulzi/ServidorGEO-ArduinoUno"
},

{
nome:"Determinante Simplificado de Crédito de Carbono",

descricao:"Ferramenta computacional para estimativa simplificada de créditos de carbono baseada em parâmetros ambientais.",

readme:"Este projeto implementa um modelo computacional simplificado para cálculo de determinantes relacionados à geração de créditos de carbono. A ferramenta foi desenvolvida com foco em análise ambiental e sustentabilidade, permitindo estimar indicadores relacionados a emissões e compensações de carbono a partir de parâmetros definidos pelo usuário. O projeto combina conceitos de análise ambiental, sustentabilidade e programação para criar uma ferramenta de apoio à avaliação de impacto ambiental.",

tecnologias:["Python","Data Analysis","Sustentabilidade","Environmental Data"],

imagens:[
"images/projetos/carbono1.png",
"images/projetos/carbono2.png"
],

demo:"",

github:"https://github.com/RafaelPulzi/Determinante-Credito-Carbono-Simplificado"
}

];







  const catalog = document.getElementById('projectCatalog');
  const searchInput = document.getElementById('searchInput');
  const techFilter = document.getElementById('techFilter');

function populateTechFilter() {

  const techSet = new Set();

  projetos.forEach(project => {
    project.tecnologias.forEach(tech => {
      techSet.add(tech);
    });
  });

  techSet.forEach(tech => {
    const option = document.createElement("option");
    option.value = tech;
    option.textContent = tech;
    techFilter.appendChild(option);
  });

}


  function renderProjetos(lista) {
  catalog.innerHTML = "";

  lista.forEach(p => {
    const card = document.createElement("article");
    card.className = "project-card";

    card.innerHTML = `
      <h3>${p.nome}</h3>
      <p>${p.descricao}</p>
      <div class="project-tags">
        ${p.tecnologias.map(t => `<span>${t}</span>`).join("")}
      </div>
    `;

    card.onclick = () => openProjectModal(p);

    catalog.appendChild(card);
  });
}

  function filterProjects() {
    const search = searchInput.value.toLowerCase();
    const tech = techFilter.value;

    const filtered = projetos.filter(project => {
      const matchesName = project.nome.toLowerCase().includes(search);
      const matchesTech =
        tech === "" || project.tecnologias.includes(tech);

      return matchesName && matchesTech;
    });

    renderProjetos(filtered);
  }

  populateTechFilter();

  searchInput.addEventListener('input', filterProjects);
  techFilter.addEventListener('change', filterProjects);




  renderProjetos(projetos);



const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalGallery = document.getElementById("modalGallery");
const modalTech = document.getElementById("modalTech");
const modalDemo = document.getElementById("modalDemo");
const modalGithub = document.getElementById("modalGithub");

function openProjectModal(project){

modalTitle.textContent = project.nome;
modalDescription.textContent = project.readme;

modalGallery.innerHTML = "";
project.imagens?.forEach(img=>{
const image = document.createElement("img");
image.src = img;
modalGallery.appendChild(image);
});

modalTech.innerHTML = project.tecnologias
.map(t=>`<span>${t}</span>`)
.join("");

modalDemo.href = project.demo || "#";
modalGithub.href = project.github || "#";

modal.classList.add("open");

}

document.getElementById("modalClose").onclick = () =>
modal.classList.remove("open");

modal.onclick = (e)=>{
if(e.target === modal){
modal.classList.remove("open");
}
};