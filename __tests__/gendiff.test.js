import fs from 'fs';
import gendiff from '../src/index';

const fixturesPath = `${__dirname}/../__fixtures__/`

const getPath = (type, order) => `${fixturesPath}${order}.${type}`;

const correctFilesPaths = {
  result1: `${fixturesPath}fullFomatDirectOrder.txt`,
  result2: `${fixturesPath}fullFomatReversOrder.txt`,
  result3: `${fixturesPath}plainFomatDirectOrder.txt`,
  result4: `${fixturesPath}plainFomatReversOrder.txt`,
  result5: `${fixturesPath}jsonFormatDirectOrder.txt`,
};

const correctFiles = {
  file1: fs.readFileSync(correctFilesPaths.result1, 'utf-8'),
  file2: fs.readFileSync(correctFilesPaths.result2, 'utf-8'),
  file3: fs.readFileSync(correctFilesPaths.result3, 'utf-8'),
  file4: fs.readFileSync(correctFilesPaths.result4, 'utf-8'),
  file5: fs.readFileSync(correctFilesPaths.result5, 'utf-8'),
};

const inputFileTypes = [
  ['json'],
  ['yml'],
  ['ini'],
];

const tests = [
  ['before', 'after', 'full', correctFiles.file1],
  ['after', 'before', 'full',  correctFiles.file2],
  ['before', 'after',  'plain', correctFiles.file3],
  ['after', 'before', 'plain', correctFiles.file4],
  ['before', 'after', 'json', correctFiles.file5],
]

describe.each(inputFileTypes)('type %s', (type) => {
  test.each(tests)(
    `%s.${type} %s.${type} --format %s`,
    (firstFile, secondFile, format, expectedResult) => {
      const result = gendiff(getPath(type, firstFile), getPath(type, secondFile), format);
      expect(result).toEqual(expectedResult);
    },
  );
});