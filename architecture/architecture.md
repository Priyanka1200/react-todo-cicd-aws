# AWS Architecture

```text
                Developer
                    │
                    ▼
              GitHub Repository
                    │
             Git Push (main)
                    │
                    ▼
            GitHub Actions CI/CD
                    │
                SSH (Port 22)
                    │
                    ▼
          AWS EC2 (Amazon Linux 2023)
                    │
     ┌──────────────┼──────────────┐
     ▼              ▼              ▼
 Backup.sh      Deploy.sh     Rollback.sh
                    │
                npm run build
                    │
                  rsync
                    │
                    ▼
            Apache HTTP Server
                    │
                    ▼
          React TaskFlow Website
```
