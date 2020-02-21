run: node_modules
	@npm run start

deploy:
	@git push || xargs echo
	@surge -d https://counter.surge.sh -p dist

node_modules:
	@npm i

.PHONY: deploy run
