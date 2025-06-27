#!/usr/bin/env bash
set -e

TARGET_USER="dev"
TARGET_UID=$(id -u ${TARGET_USER})
TARGET_GID=$(id -g ${TARGET_USER})

# Ensure directories exist
mkdir -p /home/${TARGET_USER}/.ssh
mkdir -p /home/${TARGET_USER}/.config/git

# Fix ownership in case named volumes were created as root
chown -R ${TARGET_UID}:${TARGET_GID} /home/${TARGET_USER}/.ssh /home/${TARGET_USER}/.config
chmod 700 /home/${TARGET_USER}/.ssh

# Execute the passed command as the target user
exec gosu ${TARGET_USER} "$@" 