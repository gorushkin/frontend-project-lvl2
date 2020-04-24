import fs from 'fs';
import path from 'path';
import gendiff from '../src/index';

const getFilePath = (fileName) => path.join(__dirname, '..', '/__fixtures__/', fileName);

const inputFileTypes = [
  ['json'],
  ['yml'],
  ['ini'],
];

const tests = [
  ['before', 'after', 'full', 'fullFormat-directOrder.txt'],
  ['after', 'before', 'full', 'fullFormat-reversOrder.txt'],
  ['before', 'after', 'plain', 'plainFormat-directOrder.txt'],
  ['after', 'before', 'plain', 'plainFormat-reversOrder.txt'],
  ['before', 'after', 'json', 'jsonFormat-directOrder.txt'],
  ['after', 'before', 'json', 'jsonFormat-reversOrder.txt'],
];

const getOutputFile = (name) => {
  const filePath = getFilePath(`${name}`);
  return fs.readFileSync(filePath, 'utf-8');
};

const getInputFilesPath = (fileName1, fileName2, type) => {
  const path1 = getFilePath(`${fileName1}.${type}`);
  const path2 = getFilePath(`${fileName2}.${type}`);
  return [path1, path2];
};

describe.each(inputFileTypes)('type %s', (type) => {
  test.each(tests)(`%s.${type}, %s.${type} --format %s`, (fileName1, fileName2, format, outputFileName) => {
    const [path1, path2] = getInputFilesPath(fileName1, fileName2, type);
    const expectedResult = getOutputFile(outputFileName);
    const result = gendiff(path1, path2, format);
    expect(result).toEqual(expectedResult);
  });
});
