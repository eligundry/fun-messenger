FRONTEND_TAG=eligundry/fun-messenger-frontend:latest
BACKEND_TAG=eligundry/fun-messenger-backend:latest

build_frontend_container:
	docker build -f Dockerfile -t $(FRONTEND_TAG) .

build_backend_container:
	docker build -f Dockerfile.backend -t $(BACKEND_TAG) .

publish: build_frontend_container build_backend_container
	docker push $(FRONTEND_TAG)
	docker push $(BACKEND_TAG)
