deploy:
	@./node_modules/.bin/truffle migrate

deploy-test:
	@./node_modules/.bin/truffle migrate --network ropsten

deploy-main:
	@./node_modules/.bin/truffle migrate --network main

test:
	@./node_modules/.bin/truffle test

verify:
	@./node_modules/.bin/truffle run verify

.PHONY: verify test deploy-main deploy-test deploy
