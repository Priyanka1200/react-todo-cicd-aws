# 🚀 TaskFlow - React CI/CD Deployment on AWS EC2

> Production-ready React application deployed on AWS EC2 with Apache, GitHub Actions CI/CD, Automated Backup & Rollback.

## 📌 Project Overview

TaskFlow is a production-ready React To-Do application deployed on AWS EC2 using Apache Web Server with a complete CI/CD pipeline powered by GitHub Actions.

The project includes:

- Automated CI/CD deployment
- AWS EC2 hosting
- Apache Web Server
- GitHub Actions
- Automated Backup
- Automatic Rollback
- rsync-based deployment
- Zero manual deployment after Git push

## 🛠️ Tech Stack

- React.js
- JavaScript
- HTML5
- CSS3
- AWS EC2
- Amazon Linux 2023
- Apache HTTP Server
- Git
- GitHub
- GitHub Actions
- Bash Scripting
- rsync

## ✨ Features

- React Task Management Application
- Responsive UI
- Local Storage Support
- GitHub Actions CI/CD
- AWS EC2 Deployment
- Apache Web Server
- Automated Deployment
- Automated Backup
- Automatic Rollback on Deployment Failure
- rsync-based File Synchronization

## 🏗️ Architecture

See the complete architecture here:

[Architecture Diagram](architecture/architecture.md)

## 📂 Project Structure

```
todo-app/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── deployment/
│   ├── backup.sh
│   ├── deploy.sh
│   └── rollback.sh
├── public/
├── src/
├── package.json
└── README.md
```

## ⚙️ CI/CD Workflow

```
Developer
    │
    ▼
Git Push
    │
    ▼
GitHub Repository
    │
    ▼
GitHub Actions
    │
    ▼
SSH to AWS EC2
    │
    ▼
Backup Current Version
    │
    ▼
Git Pull
    │
    ▼
npm install
    │
    ▼
npm run build
    │
    ▼
rsync Deployment
    │
    ▼
Apache Restart
    │
    ▼
Live Website
```

## 🔄 Backup & Rollback

### Backup

- Automatic backup before every deployment
- Timestamp-based backup folders
- rsync-based synchronization

### Rollback

- Automatic rollback on deployment failure
- Latest backup restoration
- Apache automatic restart after rollback

## 🚀 Deployment Steps

1. Push code to GitHub
2. GitHub Actions triggers automatically
3. Connects to AWS EC2 via SSH
4. Creates backup
5. Pulls latest code
6. Installs dependencies
7. Builds React application
8. Deploys using rsync
9. Restarts Apache
10. Live website updated automatically

## 📸 Screenshots

### Application

![Application](screenshots/Application.png)

### GitHub Actions CI/CD

![GitHub Actions](screenshots/GitHub-Actions.png)

### AWS EC2 Instance

![AWS EC2](screenshots/AWS-EC2.png)

### Apache Deployment

![Apache Deployment](screenshots/Apache-Deployment.png)

### Repository Structure

![Repository](screenshots/Repository.png)
