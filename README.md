# HIREHUB 💼 & DevOps CI/CD Pipeline

> **A Modern Job Portal Web Application with Automated Testing & CI/CD Pipeline Integration.**

[![CI Pipeline](https://github.com/skit-devops-2026/devOps-24ESKCS014/actions/workflows/ci.yml/badge.svg)](https://github.com/skit-devops-2026/devOps-24ESKCS014/actions/workflows/ci.yml)

---

## 🌟 Overview

**HireHub** is an intuitive, web-based job portal designed for career exploration and job listings management. The application features job search filtering by category and location, company listings, sign-in authentication modal, responsive hamburger navigation, and application cards.

This repository serves as a full-stack web and DevOps showcase featuring automated testing, continuous integration (CI) via **GitHub Actions**, continuous integration building via **Jenkins Pipeline**, and a git branching model.

---

## ✨ Features

### 🔍 Interactive Search & Filter
- Search jobs dynamically by role, title, or location.
- Category filtering: Programming, Data Science, Design, Management, Networking, Cybersecurity.
- Location filtering: Canada, Hyderabad, Mumbai, Texas, Lagos, New York.

### 💼 Job Cards & Application Modal
- Displays company logo, title, experience level, location, and interactive action buttons.
- Interactive authentication login modal supporting form interaction and overlay dismiss.

### 📱 Responsive & Mobile-First Interface
- Fully responsive layout engineered for mobile devices, tablets, laptops, and large desktops.
- Slide-out mobile navigation drawer with smooth transitions.

---

## 🛠️ Tech Stack & DevOps Infrastructure

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| **Test Runner** | Node.js Built-in Test Suite (`node --test`), `node:assert` |
| **CI Automation** | GitHub Actions Workflow (`.github/workflows/ci.yml`) |
| **Jenkins Pipeline** | Declarative Jenkinsfile (`Jenkinsfile`) |
| **Version Control** | Git & GitHub (`skit-devops-2026/devOps-24ESKCS014`) |

---

## 📁 Project Structure

```text
job portal/
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI workflow configuration
├── tests/
│   └── app.test.js            # Automated unit test suite
├── images/                    # Website logos and visual assets
├── job/                       # Related project resources
├── index.html                 # Main landing page HTML structure
├── script.js                  # Frontend interactivity & DOM logic
├── style.css                  # Modern UI styles & responsive CSS
├── package.json               # Node project configuration & scripts
├── Jenkinsfile                # Declarative Jenkins build pipeline
├── .gitignore                 # Excluded build artifacts and environment files
└── README.md                  # Project & DevOps documentation
```

---

## 🧪 Running Automated Unit Tests

The repository includes automated unit tests written for Node.js (`node --test`) to test logic, state management, and structural integrity.

### Prerequisites
- **Node.js**: v18.0.0 or higher

### Command Execution
To run the automated test suite locally:

```bash
npm test
```

Expected Output:
```text
✔ search filter utility handles keyword matching correctly
✔ login modal status tracker manages open and closed states
✔ job card dataset contains required properties
✔ mobile navigation drawer toggle state function works
✔ git ignore configuration avoids unwanted build artifacts
```

---

## ⚙️ Continuous Integration (CI) Pipelines

### 1. GitHub Actions Pipeline (`.github/workflows/ci.yml`)
The GitHub Actions workflow triggers automatically on:
- Pushes to `main` and feature branches (`feature/*`, `docs/*`).
- Pull Requests targetting `main`.

**Workflow Steps:**
1. Checkout repository code (`actions/checkout@v4`).
2. Setup Node.js runtime environment (`actions/setup-node@v4`).
3. Execute automated test suite (`npm test`).

### 2. Jenkins Pipeline (`Jenkinsfile`)
A declarative `Jenkinsfile` is included in the project root to support local or remote Jenkins automation servers.

**Jenkins Pipeline Stages:**
1. **Checkout**: Retrieves source code from Git SCM.
2. **Environment Setup**: Verifies Node.js and NPM versions.
3. **Test Suite**: Executes `npm test` automated test suite.
4. **Build & Verify**: Validates static assets (`index.html`, `style.css`, `script.js`).

---

## 🌿 Git Branching & Merging Strategy

The repository strictly follows feature-branch workflow practices:
- `main`: Production-ready code branch.
- `feature/unit-tests`: Feature branch for adding unit tests and package configuration.
- `feature/ci-pipeline`: Feature branch for GitHub Actions integration.
- `feature/jenkins-pipeline`: Feature branch for Jenkinsfile creation.
- `docs/devops-setup`: Feature branch for documentation updates.

All feature branches are merged into `main` via documented Pull Requests.
