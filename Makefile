install:
	npm install

json:
	npx babel-node src/bin/gendiff.js __fixtures__/before.json __fixtures__/after.json

plainjson:
	npx babel-node src/bin/gendiff.js --format plain __fixtures__/before.json __fixtures__/after.json

yml:
	npx babel-node src/bin/gendiff.js __fixtures__/before.yml __fixtures__/after.yml

ini:
	npx babel-node src/bin/gendiff.js __fixtures__/before.ini __fixtures__/after.ini

test:
	npm test

start:
	npx babel-node src/index.js

temp:
	node src/test/plain_diff.js

test-coverage:
	npm test -- --coverage

publish:
	npm publish --dry-run

lint:
	npx eslint .

.PHONY: test