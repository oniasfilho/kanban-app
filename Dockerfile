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
ARG UID=1000
RUN useradd -m -s /bin/bash -u $UID $USERNAME

# Copy entrypoint script that will fix permissions of mounted volumes then exec as dev
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Work as root initially; entrypoint will switch to $USERNAME
WORKDIR /home/$USERNAME/workspace
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["/bin/bash"] 