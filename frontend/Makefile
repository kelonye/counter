run: node_modules
	@npm run start

deploy:
	@npm run build
	@surge -d https://decentralized-counter.surge.sh -p build

node_modules:
	@yarn

.PHONY: deploy run
