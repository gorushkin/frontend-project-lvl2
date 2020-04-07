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
};

const filesOrders = {
  directOrder: (type) => [`${fixturesPath}before.${type}`, `${fixturesPath}after.${type}`],
  reversOrder: (type) => [`${fixturesPath}after.${type}`, `${fixturesPath}before.${type}`],
};

const getInputFilesPath = (order, type) => filesOrders[order](type);

describe.each(inputFileTypes)('type %s', (type) => {
  test.each(tests)(
    'test direction %s --format %s',
    (order, format) => {
      const [file1, file2] = getInputFilesPath(order, type);
      const expectedResult = getOutputFile(order, format);
      const result = gendiff(file1, file2, format);
      expect(result).toEqual(expectedResult);
    },
  );
});
