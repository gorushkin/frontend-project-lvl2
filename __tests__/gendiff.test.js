import fs from 'fs';
import gendiff from '../src/index';

const fixturesPath = `${__dirname}/../__fixtures__/`;

const inputFileTypes = [
  ['json'],
  ['yml'],
  ['ini'],
];

const tests = [
  ['directOrder', 'full'],
  ['reversOrder', 'full'],
  ['directOrder', 'plain'],
  ['reversOrder', 'plain'],
  ['directOrder', 'json'],
];

const getOutputFile = (order, format) => {
  const filePath = `${fixturesPath}${format}Format-${order}.txt`;
  return fs.readFileSync(filePath, 'utf-8');
}

const getInputFilesPath = (order, type) => {
  switch (order) {
    case 'directOrder':
      return [`${fixturesPath}before.${type}`, `${fixturesPath}after.${type}`];
    case 'reversOrder':
      return [`${fixturesPath}after.${type}`, `${fixturesPath}before.${type}`];
    default:
      console.log('wrong order');
      break;
  }
  return [file1, file2];
}

describe.each(inputFileTypes)('type %s', (type) => {
  test.each(tests)(
    `test direction %s --format %s`,
    (order, format) => {
      const [file1, file2] = getInputFilesPath(order, type);
      const expectedResult = getOutputFile(order, format);
      const result = gendiff(file1, file2, format);
      expect(result).toEqual(expectedResult);
    },
  );
});