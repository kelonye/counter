run: node_modules
	@npm run start

deploy:
	@git push || xargs echo
	@npm run build
	@surge -d https://vb-counter.surge.sh -p build

node_modules:
	@npm i

.PHONY: deploy run
