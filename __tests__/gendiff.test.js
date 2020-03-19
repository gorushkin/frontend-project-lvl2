import fs from 'fs';
import gendiff from '../src/index';

const jsonPaths = {
  pathFirst: `${__dirname}/__fixtures__/before.json`,
  pathSecond: `${__dirname}/__fixtures__/after.json`,
};

const ymlPaths = {
  pathFirst: `${__dirname}/__fixtures__/before.yml`,
  pathSecond: `${__dirname}/__fixtures__/after.yml`,
};

// const iniPaths = {
//   pathFirst: `${__dirname}/__fixtures__/before.ini`,
//   pathSecond: `${__dirname}/__fixtures__/after.ini`,
// };

const correctFilesPaths = {
  result1: `${__dirname}/__fixtures__/result1`,
  result2: `${__dirname}/__fixtures__/result2`,
};

const correctFiles = {
  file1: fs.readFileSync(correctFilesPaths.result1, 'utf-8'),
  file2: fs.readFileSync(correctFilesPaths.result2, 'utf-8'),
};

describe('jsonPaths', () => {
  test('чтение и сравнение файлов JSON', () => {
    const result = gendiff(jsonPaths.pathFirst, jsonPaths.pathSecond);
    expect(result).toEqual(correctFiles.file1);
  });

  test('чтение и сравнение файлов в обратном порядке JSON', () => {
    const result = gendiff(jsonPaths.pathSecond, jsonPaths.pathFirst);
    expect(result).toEqual(correctFiles.file2);
  });
});

describe('ymlPaths', () => {
  test('чтение и сравнение файлов YML', () => {
    const result = gendiff(ymlPaths.pathFirst, ymlPaths.pathSecond);
    expect(result).toEqual(correctFiles.file1);
  });

  test('чтение и сравнение файлов в обратном порядке YML', () => {
    const result = gendiff(ymlPaths.pathSecond, ymlPaths.pathFirst);
    expect(result).toEqual(correctFiles.file2);
  });
});

// describe('iniPaths', () => {
//   test('чтение и сравнение файлов INI', () => {
//     const result = gendiff(iniPaths.pathFirst, iniPaths.pathSecond);
//     expect(result).toEqual(correctFiles.file1);
//   });

//   test('чтение и сравнение файлов в обратном порядке INI', () => {
//     const result = gendiff(iniPaths.pathSecond, iniPaths.pathFirst);
//     expect(result).toEqual(correctFiles.file2);
//   });
// });
