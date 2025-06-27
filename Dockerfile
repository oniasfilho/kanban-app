# syntax=docker/dockerfile:1

# -------- Base image --------
# Use latest stable Node with Debian (includes apt for git/ssh packages)
FROM node:20

# Install git, OpenSSH and gosu (for dropping root privileges)
RUN apt-get update \
    && apt-get install -y --no-install-recommends git openssh-client gosu \
    && rm -rf /var/lib/apt/lists/*

# ---------- Create unprivileged user -----------
ARG USERNAME=dev
ARG HOST_UID=1001
# If UID already exists, fallback to available UID
RUN if id -u $USERNAME >/dev/null 2>&1; then \
      echo "User $USERNAME already exists"; \
    else \
      useradd -m -s /bin/bash -u $HOST_UID $USERNAME; \
    fi

# Copy entrypoint script that will fix permissions of mounted volumes then exec as dev
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Work as root initially; entrypoint will switch to $USERNAME
WORKDIR /home/$USERNAME/workspace
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["/bin/bash"] 