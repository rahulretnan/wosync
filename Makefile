
compose_file=./docker/wordpress/docker-compose.yml


name=wosync_wordpress

BASE_PATH=$(PWD)



build-deploy:
	@echo
	@echo "🏭Building & 🚀Deploying $(stage) services"
	@echo
	@COMPOSE_DOCKER_CLI_BUILD=1 BASE_PATH=$(BASE_PATH) docker compose -f $(compose_file) -p $(name) up -d --build

restart:
	@echo
	@echo "🔁Restart$(stage) service"
	@echo
	@COMPOSE_DOCKER_CLI_BUILD=1 BASE_PATH=$(BASE_PATH) docker compose -f $(compose_file) -p $(name) restart $(service)

deploy:
	@echo
	@echo "🚀Deploying $(stage) services"
	@echo
	@COMPOSE_DOCKER_CLI_BUILD=1 BASE_PATH=$(BASE_PATH) docker compose -f $(compose_file) -p $(name) up -d

deploy-mac:
	@echo
	@echo "🚀Deploying $(stage) services"
	@echo
	@COMPOSE_DOCKER_CLI_BUILD=1 BASE_PATH=$(BASE_PATH) docker-compose -f $(compose_file_mac) -p $(name) up -d

delete:
	@echo
	@echo "🧹Deleting $(stage) services"
	@echo
ifneq (,$(findstring i, $(MAKEFLAGS)))
	@COMPOSE_DOCKER_CLI_BUILD=1 BASE_PATH=$(BASE_PATH) docker compose -f $(compose_file) -p $(name) down -v
else
	@COMPOSE_DOCKER_CLI_BUILD=1 BASE_PATH=$(BASE_PATH) docker compose -f $(compose_file) -p $(name) down
endif

delete-mac:
	@echo
	@echo "🧹Deleting $(stage) services"
	@echo
ifneq (,$(findstring i, $(MAKEFLAGS)))
	@COMPOSE_DOCKER_CLI_BUILD=1 BASE_PATH=$(BASE_PATH) docker-compose -f $(compose_file) -p $(name) down -v
else
	@COMPOSE_DOCKER_CLI_BUILD=1 BASE_PATH=$(BASE_PATH) docker-compose -f $(compose_file) -p $(name) down
endif

create-env-stage:
	@echo
	@echo "🚀Moving secrets of $(stage) to .env"
	@echo
	@chmod +x ./scripts/create-env.sh
	@./scripts/create-env.sh "$(PWD)" "$(stage)"


recreate-wordpress:
	@npm i
ifneq ($(OS), darwin)
	@echo $(OS)
	@echo "🚀Recreating $(stage) services"
	@$(MAKE) --no-print-directory delete -i
	@$(MAKE) --no-print-directory deploy
else
	@echo
	@echo "🚀Recreating MacOS $(stage) services"
	@$(MAKE) --no-print-directory delete-mac -i
	@$(MAKE) --no-print-directory deploy-mac
endif

update-wordpress:
	@npm i
ifneq ($(OS), darwin)
	@echo $(OS)
	@echo "🚀Recreating $(stage) services"
	@$(MAKE) --no-print-directory deploy
else
	@echo
	@echo "🚀Recreating MacOS $(stage) services"
	@$(MAKE) --no-print-directory deploy-mac
endif

release:
	# release: patch/minor/major
	npm run release -- --release-as $(release)

release-changelog:
	$(BASE_PATH)/scripts/release-changelog.sh "$(BASE_PATH)" "$(stage)"


setup:
	@echo
	@echo "Installing dependency packages"
	@echo
	@sed 's/#.*//' $(BASE_PATH)/scripts/dependency.txt | xargs npm install
	@echo
	@echo "Installing devDependency packages"
	@echo
	@sed 's/#.*//' $(BASE_PATH)/scripts/dev-dependency.txt | xargs npm install -D
	@echo
	@echo "Configuring project setup"
	@echo
	@npm pkg set scripts.postinstall="husky install"

package-update:
	@echo
	@echo "Updating dependency packages"
	@echo
	@sed 's/#.*//' $(BASE_PATH)/scripts/dependency.txt | xargs npm install
	@echo
	@echo "Updating devDependency packages"
	@echo
	@sed 's/#.*//' $(BASE_PATH)/scripts/dev-dependency.txt | xargs npm install -D

initial-setup:
	@echo
	@echo "Initial setup started"
	@echo
	@echo "Installing global dependencies"
	@echo
	@npm install -g yarn semver gitmoji-changelog
	@echo
	@echo "Installing local dependencies"
	@echo
	@npm install

