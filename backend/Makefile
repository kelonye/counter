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

copy-build:
	@cp -rf $(PWD)/build/ ../frontend/src/data

.PHONY: deploy \
		deploy-test \
		deploy-main \
		test \
		verify \
		copy-build

