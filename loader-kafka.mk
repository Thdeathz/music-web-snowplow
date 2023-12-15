kafka-up:
	cd ./loader-kafka && docker compose up -d --remove-orphans

kafka-install:
	@cd ./loader-kafka && docker compose exec -it server yarn
	@test -f loader-kafka/.env || cp loader-kafka/.env.example loader-kafka/.env

kafka-run:
	cd ./loader-kafka && docker compose exec -it server yarn dev

kafka-down:
	cd ./loader-kafka && docker compose down --remove-orphans
