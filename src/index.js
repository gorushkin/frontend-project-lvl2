// import process from 'process';
import _ from 'lodash';
import parser from './parsers';

// const workingDir = process.cwd();

const gendiff = (firstPath, secondPath) => {
  const [firstConfig, secondConfig] = parser(firstPath, secondPath);
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
