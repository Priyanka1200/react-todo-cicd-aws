#!/bin/bash

BACKUP_DIR="/var/www/taskflow-backups"
LIVE_DIR="/var/www/html"

LATEST_BACKUP=$(ls -dt "$BACKUP_DIR"/backup-* 2>/dev/null | head -1)

if [ -z "$LATEST_BACKUP" ]; then
  echo "Error: No backup found."
  exit 1
fi

echo "Rolling back from: $LATEST_BACKUP"

sudo rsync -a --delete "$LATEST_BACKUP/" "$LIVE_DIR/"
sudo systemctl restart httpd

echo "Rollback completed successfully."
