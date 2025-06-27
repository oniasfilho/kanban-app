.PHONY: enter-sandbox sandbox-build sandbox-up sandbox-down

# Pick up current host UID so files inside the container are owned by you
HOST_UID := $(shell id -u)

# Build (or rebuild) the dev image
sandbox-build:
	HOST_UID=$(HOST_UID) docker-compose build

# One-shot interactive sandbox; container removed when you exit
enter-sandbox: sandbox-build
	HOST_UID=$(HOST_UID) docker-compose run --rm dev

# Keep sandbox running in background and attach later if desired
sandbox-up: sandbox-build
	HOST_UID=$(HOST_UID) docker-compose up -d dev

# Tear down background sandbox and associated network (volumes persist)
sandbox-down:
	docker-compose down 