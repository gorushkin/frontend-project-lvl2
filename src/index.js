import fs from 'fs';
import path from 'path';
// import process from 'process';
import _ from 'lodash';


// const workingDir = process.cwd();

const gendiff = (firstPath, secondPath) => {
  const absFirstPath = path.resolve(firstPath);
  const absSecondPath = path.resolve(secondPath);
  const firstConfig = JSON.parse(fs.readFileSync(absFirstPath, 'utf8'));
  const secondConfig = JSON.parse(fs.readFileSync(absSecondPath, 'utf8'));
  const firstConfigKeys = Object.keys(firstConfig);
  const secondConfigKeys = Object.keys(secondConfig);
  const tempArray = firstConfigKeys.reduce((acc, element) => {
    if (_.has(secondConfig, element)) {
      if (firstConfig[element] === secondConfig[element]) {
        return [...acc, `    ${element}: ${firstConfig[element]}`];
      }
      return [...acc, `  - ${element}: ${firstConfig[element]}`, `  + ${element}: ${secondConfig[element]}`];
    }
    return [...acc, `  - ${element}: ${firstConfig[element]}`];
  }, []);
  const finishArray = secondConfigKeys.reduce((acc, element) => {
    if (_.has(firstConfig, element)) return acc;
    return [...acc, `  + ${element}: ${secondConfig[element]}`];
  }, tempArray);
  const result = `{\n${finishArray.join('\n')}\n}`;
  return result;
};

export default gendiff;
