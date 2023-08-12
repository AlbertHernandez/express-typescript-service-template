start-dev:
	docker-compose up my-service-dev

start-production:
	docker-compose up my-service-production

test:
	npm run test

lint:
	npm run lint

lint-fix:
	npm run lint:fix

build:
	npm run build
