install:
	npm install

start:
	npx babel-node src/bin/gendiff.js --format json __fixtures__/before.json __fixtures__/after.json

json:
	npx babel-node src/bin/gendiff.js --format json __fixtures__/beforetemp.json __fixtures__/aftertemp.json

test:
	npm test

temp:
	node src/test/plain_diff.js

test-coverage:
	npm test -- --coverage

publish:
	npm publish --dry-run

lint:
	npx eslint .

.PHONY: test