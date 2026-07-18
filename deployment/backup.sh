#!/bin/bash

BACKUP_DIR="/var/www/taskflow-backups"
LIVE_DIR="/var/www/html"
TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
CURRENT_BACKUP="$BACKUP_DIR/backup-$TIMESTAMP"

echo "Creating backup..."

sudo mkdir -p "$CURRENT_BACKUP"
sudo rsync -a --delete "$LIVE_DIR/" "$CURRENT_BACKUP/"

echo "Backup created successfully: backup-$TIMESTAMP"
