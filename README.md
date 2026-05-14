# 🌿 Rafael Pulzi | Digital Garden & Portfolio

[![Live Demo](https://img.shields.io/badge/Live-Demo-2ea44f?style=for-the-badge)](https://rafaelpulzi.github.io/portifolio/)
[![Made with Vanilla JS](https://img.shields.io/badge/Vanilla-JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)]()

> *"Navigating the complexities of data to build meaningful, quiet order in a chaotic digital sea."*

A highly optimized, zero-framework personal portfolio designed as a "Digital Garden". This project reflects my identity as a Computer Scientist, Backend Developer, and Data Analyst, prioritizing clean architecture, intelligent automation, and a calm, thoughtful user experience.

## ✨ Core Features

* **🧠 Intelligent Dynamic Portfolio (`Craft & Logic`):** Instead of hardcoded projects, the site dynamically fetches my open-source repositories directly from the **GitHub Public API**.
* **⚖️ Weighted Categorization Engine:** A custom JavaScript algorithm parses repository names, descriptions, languages, and topics using regex word boundaries to automatically sort projects into domains (Data & Analysis, Backend & Automation, AI & IoT, etc.).
* **💾 Smart Caching:** Implements `localStorage` caching with a 2-hour TTL to prevent GitHub API rate limits and ensure lightning-fast load times.
* **📬 Serverless Contact Form:** Fully functional contact form integrated with **EmailJS**, providing inline validation, loading states, and success feedback without requiring a backend.
* **🌓 Adaptive Theming:** Seamless Dark/Light mode toggle utilizing native CSS variables for instant, repaint-free theme switching.
* **📜 Integrated Certificate Viewer:** A custom modal overlay to view credentials and certificates via iframe without leaving the ecosystem.

## 🛠️ Architecture & Tech Stack

This project was built deliberately without heavy frontend frameworks (like React or Vue) to demonstrate mastery over the DOM, browser APIs, and core web technologies.

* **Structure:** Semantic HTML5
* **Styling:** Pure CSS3 (Flexbox, CSS Grid, Custom Properties/Variables)
* **Logic:** Vanilla JavaScript (ES6+, Async/Await, Fetch API, Intersection Observer)
* **Integrations:** GitHub REST API, EmailJS

## ⚙️ The Cognitive Pipeline

The development workflow showcased in this portfolio mirrors my real-world engineering approach:
`Idea` ➔ `Ralph (Orchestration)` ➔ `Claude Opus (Reasoning)` ➔ `Dev Containers (Isolation)` ➔ `GitHub (Versioning)` ➔ `Production`

## 🚀 Running Locally

To run this project locally and test the dynamic integrations:

1. Clone the repository:
   ```bash
   git clone [https://github.com/RafaelPulzi/portifolio.git](https://github.com/RafaelPulzi/portifolio.git)

```

2. Navigate to the directory:
```bash
cd portifolio

```


3. Open `index.html` in your browser, or use a local development server (like VS Code Live Server) to prevent CORS issues when loading local PDFs/iframes.

## 🔧 Configuration (For Forking)

If you wish to fork this design for your own use, update the following variables in `index.html`:

1. **GitHub API:** Change `const GITHUB_USER = 'RafaelPulzi';` in the `<script>` block to your GitHub username.
2. **EmailJS:** Replace the `emailjs.init()`, Service ID, and Template ID inside the contact form logic with your own keys from [EmailJS](https://www.emailjs.com/).
3. **Assets:** Replace the paths in the `certificates` array and hero buttons with your own PDF files.

---

*The universe is, and we are.*
