install:
	npm install

start:
	npx babel-node src/bin/gendiff.js __fixtures__/after.json __fixtures__/before.json

json:
	npx babel-node src/bin/gendiff.js --format json __fixtures__/after.json __fixtures__/before.json

ini:
	npx babel-node src/bin/gendiff.js --format json __fixtures__/before.ini __fixtures__/after.ini

short:
	npx babel-node src/bin/gendiff.js __fixtures__/before_copy.json __fixtures__/after_copy.json

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