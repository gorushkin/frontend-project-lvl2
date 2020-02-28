install:
	npm install

start:
	npx babel-node src/bin/gendiff.js test/before.json test/temp/after.json

publish:
	npm publish --dry-run

lint:
	npx eslint . 