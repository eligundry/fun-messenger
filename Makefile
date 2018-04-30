FRONTEND_TAG=eligundry/fun-messenger-frontend:latest
FRONTEND_DEV_TAG=eligundry/fun-messenger-frontend:dev
BACKEND_TAG=eligundry/fun-messenger-backend:latest
BACKEND_DEV_TAG=eligundry/fun-messenger-backend:dev

frontend_container:
	docker build -f Dockerfile -t $(FRONTEND_TAG) .
	docker build -f docker/Dockerfile.frontend-dev -t $(FRONTEND_DEV_TAG) .

backend_container:
	docker build -f Dockerfile.backend -t $(BACKEND_TAG) .
	docker build -f docker/Dockerfile.backend-dev -t $(BACKEND_DEV_TAG) .

containers: frontend_container backend_container

publish: containers
	docker push $(FRONTEND_TAG)
	docker push $(BACKEND_TAG)

up: containers
	docker-compose up
