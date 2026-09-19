# Jenkins CI/CD Pipeline Documentation

## 🚀 Overview
The repository includes a declarative `Jenkinsfile` for continuous integration and build automation.

## 📋 Pipeline Stages
1. **Checkout**: Source code retrieval from Git repository.
2. **Environment Setup**: Validates Node.js runtime and environment dependencies.
3. **Automated Testing**: Executes `npm test` unit test suite.
4. **Build & Verify**: Validates structural HTML/CSS/JS web assets.
