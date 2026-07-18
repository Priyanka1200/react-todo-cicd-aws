#!/bin/bash

set -Eeuo pipefail

PROJECT_DIR="$HOME/react-todo-cicd-aws"
LIVE_DIR="/var/www/html"
BACKUP_CREATED=false

rollback_on_failure() {
  EXIT_CODE=$?

  if [ "$BACKUP_CREATED" = true ]; then
    echo "Deployment failed! Starting automatic rollback..."
    "$PROJECT_DIR/deployment/rollback.sh"
  else
    echo "Deployment failed before backup was created. Rollback skipped."
  fi

  exit "$EXIT_CODE"
}

trap rollback_on_failure ERR

echo "Starting TaskFlow deployment..."

cd "$PROJECT_DIR"

echo "Pulling latest code..."
git pull origin main

echo "Creating backup..."
"$PROJECT_DIR/deployment/backup.sh"
BACKUP_CREATED=true

echo "Installing dependencies..."
npm install

echo "Creating production build..."
npm run build

echo "Deploying new build..."
sudo rsync -a --delete build/ "$LIVE_DIR/"

echo "Restarting Apache..."
sudo systemctl restart httpd

trap - ERR

echo "Deployment completed successfully."
