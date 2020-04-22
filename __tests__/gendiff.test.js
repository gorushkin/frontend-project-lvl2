import fs from 'fs';
import gendiff from '../src/index';

const fixturesPath = (path) => `${__dirname}/../__fixtures__/${path}`;

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

const getOutputData = (order, format) => {
  const filePath = fixturesPath(`${format}Format-${order}.txt`);
  return fs.readFileSync(filePath, 'utf-8');
};

const filesOrders = {
  directOrder: (type) => [fixturesPath(`before.${type}`), fixturesPath(`after.${type}`)],
  reversOrder: (type) => [fixturesPath(`after.${type}`), fixturesPath(`before.${type}`)],
};

const getInputFilesPath = (order, type) => filesOrders[order](type);

describe.each(inputFileTypes)('type %s', (type) => {
  test.each(tests)(
    'test direction %s --format %s',
    (order, format) => {
      const [path1, path2] = getInputFilesPath(order, type);
      const expectedResult = getOutputData(order, format);
      const result = gendiff(path1, path2, format);
      expect(result).toEqual(expectedResult);
    },
  );
});
