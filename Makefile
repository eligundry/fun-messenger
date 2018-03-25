FRONTEND_TAG=eligundry/fun-messenger-frontend:latest
BACKEND_TAG=eligundry/fun-messenger-backend:latest

frontend_container:
	docker build -f Dockerfile -t $(FRONTEND_TAG) .

backend_container:
	docker build -f Dockerfile.backend -t $(BACKEND_TAG) .

build: frontend_container backend_container

publish: build
	docker push $(FRONTEND_TAG)
	docker push $(BACKEND_TAG)
