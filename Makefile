install:
	npm install

start:
	npx babel-node src/bin/gendiff.js __tests__/fixtures/before.json __tests__/fixtures/after.json

test:
	npm test

test-coverage:
	npm test -- --coverage

publish:
	npm publish --dry-run

lint:
	npx eslint .

.PHONY: test