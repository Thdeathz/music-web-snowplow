genkey:
	node -e "console.log(require('crypto').randomBytes(128).toString('hex'))"

devrun:
	@docker exec -d ${COMPOSE_PROJECT_NAME}-api-1 yarn dev
	@docker exec -it $(COMPOSE_PROJECT_NAME)-web-1 yarn dev

devup:
	docker compose up -d --remove-orphans

devdown:
	docker compose down --remove-orphans

devinstall:
	@docker exec -it $(COMPOSE_PROJECT_NAME)-api-1 yarn
	@docker exec -it $(COMPOSE_PROJECT_NAME)-web-1 yarn
	@test -f web/.env || cp web/.env.example web/.env
	@test -f api/.env || cp api/.env.example api/.env

prisma-format:
	docker exec -it $(COMPOSE_PROJECT_NAME)-api-1 yarn prisma format

devmigrate:
	docker exec -it $(COMPOSE_PROJECT_NAME)-api-1 yarn prisma migrate dev --name init --create-only

devdeploy:
	docker exec -it $(COMPOSE_PROJECT_NAME)-api-1 yarn prisma migrate deploy

devreset:
	@docker exec -it $(COMPOSE_PROJECT_NAME)-api-1 yarn prisma migrate reset --force
	@docker exec -it $(COMPOSE_PROJECT_NAME)-api-1 yarn seed

devseed:
	docker exec -it $(COMPOSE_PROJECT_NAME)-api-1 yarn seed

devclean: devdown
	@docker rmi $$(docker images -a -q)
	@docker volume rm $$(docker volume ls -q)
