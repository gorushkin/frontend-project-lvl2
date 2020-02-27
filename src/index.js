import fs from 'fs';
import path from 'path';
// import process from 'process';
import program from 'commander';
import _ from 'lodash';
import {
  version,
} from '../package.json';

// const workingDir = process.cwd();

const gendiff = (firstPath, secondPath) => {
  const absFirstPath = path.resolve(firstPath);
  const absSecondPath = path.resolve(secondPath);
  const firstConfig = JSON.parse(fs.readFileSync(absFirstPath, 'utf8'));
  const secondConfig = JSON.parse(fs.readFileSync(absSecondPath, 'utf8'));
  const firstConfigKeys = Object.keys(firstConfig);
  const secondConfigKeys = Object.keys(secondConfig);
  const result = firstConfigKeys.reduce((acc, element) => {
    if (_.has(secondConfig, element)) {
      if (firstConfig[element] === secondConfig[element]) {
        return [...acc, firstConfig[element]];
      }
      return [...acc, `- ${element}: ${firstConfig[element]}`, `+ ${element}: ${secondConfig[element]}`];
    }
    return [...acc, `- ${element}: ${firstConfig[element]}`];
  }, []);
  const finishResult = secondConfigKeys.reduce((acc, element) => {
    if (_.has(firstConfig, element)) return acc;
    return [...acc, `+ ${element}: ${secondConfig[element]}`];
  }, result);
  console.log('firstConfigKeys: ', firstConfigKeys);
  console.log('secondConfigKeys: ', secondConfigKeys);
  console.log('result: ', result);
  console.log('finishResult: ', finishResult);
};

const app = () => {
  program
    .version(version)
    .arguments('<firstConfig> <secondConfig>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .action((firstConfig, secondConfig) => {
      gendiff(firstConfig, secondConfig);
    })
    .parse(process.argv);
};

export default app;
