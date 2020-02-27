install:
	npm install

start:
	npx babel-node src/bin/gendiff.js /home/gorushkin/webdev/frontend-project-lvl2/before.json temp/after.json

publish:
	npm publish --dry-run

lint:
	npx eslint . 