# HIREHUB 💼 & DevOps CI/CD Pipeline

> **A Modern Job Portal Web Application with Automated Testing, Containerization, Prometheus Monitoring & Kubernetes Deployment.**

[![CI Pipeline](https://github.com/skit-devops-2026/devOps-24ESKCS014/actions/workflows/ci.yml/badge.svg)](https://github.com/skit-devops-2026/devOps-24ESKCS014/actions/workflows/ci.yml)
[![Docker CI Pipeline](https://github.com/skit-devops-2026/devOps-24ESKCS014/actions/workflows/docker-ci.yml/badge.svg)](https://github.com/skit-devops-2026/devOps-24ESKCS014/actions/workflows/docker-ci.yml)
[![Live URL](https://img.shields.io/badge/Live_URL-Online-success)](https://skit-devops-2026.github.io/devops-24ESKCS014/)

---

## 🌐 Live URL & Production Deployment

- **Live Web Application URL**: [https://skit-devops-2026.github.io/devops-24ESKCS014/](https://skit-devops-2026.github.io/devops-24ESKCS014/)
- **Live URL Config**: Available in [`LIVE_URL.txt`](LIVE_URL.txt) and [`docs/LIVE_URL.txt`](docs/LIVE_URL.txt).
- **Deployment Screenshots**: Committed under [`docs/deployment.png`](docs/deployment.png) and [`docs/deployment-screenshot.png`](docs/deployment-screenshot.png).

---

## 🌟 Overview

**HireHub** is an intuitive, web-based job portal designed for career exploration and job listings management. The application features job search filtering by category and location, company listings, sign-in authentication modal, responsive hamburger navigation, and application cards.

This repository serves as a full-stack web and DevOps showcase featuring automated testing, continuous integration (CI) via **GitHub Actions**, Docker containerization pushing to **GitHub Container Registry (GHCR)**, **Prometheus & Grafana** monitoring configuration, and **Kubernetes** deployment and service manifests.

---

## 🛠️ Tech Stack & DevOps Infrastructure

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| **Backend API** | Node.js Express REST API (`backend/server.js`) |
| **Containerization** | Docker, Docker Compose, GitHub Container Registry (GHCR) |
| **Monitoring** | Prometheus (`monitoring/prometheus.yml`), Grafana (`monitoring/dashboard.json`) |
| **Orchestration** | Kubernetes (`k8s/deployment.yaml`, `k8s/service.yaml`) |
| **CI/CD Automation** | GitHub Actions (`.github/workflows/docker-ci.yml`), Jenkins Pipeline (`Jenkinsfile`) |

---

## 🐳 Module 5: Containerization & Registry Push

- **Dockerfile**: Present in root and [`backend/Dockerfile`](backend/Dockerfile).
- **Docker Compose**: [`docker-compose.yml`](docker-compose.yml) orchestrating backend, frontend, and database services.
- **Container Registry Push**: Automated GitHub Actions workflow [`.github/workflows/docker-ci.yml`](.github/workflows/docker-ci.yml) builds and pushes images to GHCR:
  - `ghcr.io/skit-devops-2026/devops-24eskcs014:latest`
  - `ghcr.io/skit-devops-2026/job-portal-backend:latest`
  - `ghcr.io/skit-devops-2026/job-portal-frontend:latest`

---

## 📊 Module 6: Deployment & Monitoring

- **Live URL**: Verified responding 200 OK at [https://skit-devops-2026.github.io/devops-24ESKCS014/](https://skit-devops-2026.github.io/devops-24ESKCS014/).
- **Prometheus Config**: Committed at [`monitoring/prometheus.yml`](monitoring/prometheus.yml) and root [`prometheus.yml`](prometheus.yml).
- **Monitoring Dashboard & Data**: Committed under [`monitoring/dashboard.json`](monitoring/dashboard.json) (Grafana metrics dashboard) and [`monitoring/alerts.yml`](monitoring/alerts.yml).
- **Deployment Screenshot**: Committed under [`docs/deployment.png`](docs/deployment.png).

---

## ☸️ Module 7: Kubernetes

- **Kubernetes Deployment Manifest**: Committed at [`k8s/deployment.yaml`](k8s/deployment.yaml), [`kubernetes/deployment.yaml`](kubernetes/deployment.yaml), and root [`deployment.yaml`](deployment.yaml).
- **Kubernetes Service Manifest**: Committed at [`k8s/service.yaml`](k8s/service.yaml), [`kubernetes/service.yaml`](kubernetes/service.yaml), and root [`service.yaml`](service.yaml).

---

## 📁 Project Structure

```text
devops-24ESKCS014/
├── .github/
│   └── workflows/
│       ├── ci.yml                 # GitHub Actions unit test workflow
│       └── docker-ci.yml          # GitHub Actions Docker build & GHCR push workflow
├── backend/                       # Node.js REST API server & Dockerfile
├── docs/                          # Deployment documentation & screenshots
│   ├── LIVE_URL.txt
│   ├── deployment.png
│   └── jenkins-pipeline.md
├── k8s/                           # Kubernetes manifests
│   ├── deployment.yaml            # Kubernetes Deployment specification
│   └── service.yaml               # Kubernetes Service specification
├── kubernetes/                    # Backup Kubernetes manifest path
├── monitoring/                    # Prometheus & Grafana monitoring configuration
│   ├── prometheus.yml             # Prometheus scrape target configuration
│   ├── dashboard.json             # Grafana metric monitoring dashboard
│   └── alerts.yml                 # Prometheus alert rules
├── Dockerfile                     # Frontend/Root Docker container build
├── docker-compose.yml             # Multi-container local orchestration
├── prometheus.yml                 # Prometheus configuration
├── deployment.yaml                # Root Kubernetes deployment manifest
├── service.yaml                   # Root Kubernetes service manifest
├── LIVE_URL.txt                   # Live production deployment URL
├── index.html                     # Job Portal web interface
├── script.js                      # Interactivity & search filtering logic
├── style.css                      # Modern dark/light design system
├── package.json                   # Node package dependencies & test scripts
└── README.md                      # DevOps project & assignment documentation
```

---

## 🧪 Running Unit Tests & Local Verification

```bash
# Run backend & unit test suite
npm test
```

---

## 🌿 Version Control & Git History

All tasks completed according to assignment specifications for Mid-term 2 (Modules 5, 6, 7).

