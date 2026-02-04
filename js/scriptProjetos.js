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
      nome: "Sistema Inteligente de Coleta Urbana",
      descricao: "Plataforma backend com análise de imagens e roteamento otimizado.",
      tecnologias: ["Python", "Backend", "Data", "API"]
    },
    {
      nome: "Processador de Dados Ambientais",
      descricao: "Pipeline de dados para cálculo e análise ambiental.",
      tecnologias: ["Python", "Data", "Banco de Dados"]
    },
    {
      nome: "API de Automação Financeira",
      descricao: "API REST para análise e automação de gastos financeiros.",
      tecnologias: ["Backend", "API", "Banco de Dados"]
    },
    {
      nome: "Sistema de Priorização da Limpeza Urbana",
      descricao: "IA para priorização de coleta de resíduos em tempo real.",
      tecnologias: ["Python", "Machine Learning", "Backend"]
    },
    {
      nome: "Dashboard de Análise de Resíduos",
      descricao: "Dashboard interativo com métricas ambientais.",
      tecnologias: ["Data", "Frontend", "API"]
    },
    {
      nome: "Gerenciador de Emergias (SCALE)",
      descricao: "Software para cálculo de emergia baseado em inventários de ciclo de vida.",
      tecnologias: ["Python", "Data", "Sustentabilidade"]
    },
    {
      nome: "Sistema Open Finance – Inter",
      descricao: "Aplicação para análise automática de gastos via Open Finance.",
      tecnologias: ["Backend", "API", "Data"]
    },
    {
      nome: "Plataforma de Detecção de Resíduos com YOLO",
      descricao: "Detecção visual de resíduos usando deep learning.",
      tecnologias: ["Python", "IA", "Computer Vision"]
    },
    {
      nome: "Servidor de Monitoramento Ambiental",
      descricao: "Servidor distribuído para coleta de dados ambientais.",
      tecnologias: ["Backend", "Linux", "Cloud"]
    }
  ];


  const catalog = document.getElementById('projectCatalog');
  const searchInput = document.getElementById('searchInput');
  const techFilter = document.getElementById('techFilter');

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

    catalog.appendChild(card);
  });
}

  function filterProjects() {
    const search = searchInput.value.toLowerCase();
    const tech = techFilter.value;

    const filtered = projects.filter(project => {
      const matchesName = project.name.toLowerCase().includes(search);
      const matchesTech = tech === '' || project.technologies.includes(tech);
      return matchesName && matchesTech;
    });

    renderProjetos(filtered);
  }

  searchInput.addEventListener('input', filterProjects);
  techFilter.addEventListener('change', filterProjects);

  renderProjetos(projetos);
