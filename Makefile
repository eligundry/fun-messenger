FRONTEND_TAG=eligundry/fun-messenger-frontend
BACKEND_TAG=eligundry/fun-messenger-backend

frontend-container:
	docker build -f Dockerfile -t $(FRONTEND_TAG):latest -t $(FRONTEND_TAG):$(shell cat .git/refs/heads/master) .
	docker build -f docker/Dockerfile.frontend-dev -t $(FRONTEND_TAG):dev -t $(FRONTEND_TAG):$(shell cat .git/refs/heads/master) .

backend-container:
	docker build -f Dockerfile.backend -t $(BACKEND_TAG) .
	docker build -f docker/Dockerfile.backend-dev -t $(BACKEND_DEV_TAG) .

containers: frontend-container backend-container

publish: containers
	docker push $(FRONTEND_TAG)
	docker push $(BACKEND_TAG)

up: containers
	docker-compose up

clean-js:
	rm -rf dist/*

clean-python:
	find . -regex '.*\(\.py[co]\)' -delete
	find . -type d -name __pycache__ -delete

clean: clean-js clean-python

nuke: clean-js clean-python
	rm -rf node_modules

js: clean-js
	npm run build

serve-js: clean-js
	npm run serve
