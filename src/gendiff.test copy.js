import fs from 'fs';
import gendiff from '../src/index';

const fixturesPath = `${__dirname}/../__fixtures__/`

const jsonPaths = {
  pathFirst: `${fixturesPath}before.json`,
  pathSecond: `${fixturesPath}after.json`,
};

const ymlPaths = {
  pathFirst: `${fixturesPath}before.yml`,
  pathSecond: `${fixturesPath}after.yml`,
};

const iniPaths = {
  pathFirst: `${fixturesPath}before.ini`,
  pathSecond: `${fixturesPath}after.ini`,
};

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

describe('jsonPaths', () => {
  test('чтение и сравнение файлов JSON. Вывод в полном формате', () => {
    const result = gendiff(jsonPaths.pathFirst, jsonPaths.pathSecond);
    expect(result).toEqual(correctFiles.file1);
  });

  test('чтение и сравнение файлов в обратном порядке JSON. Вывод в полном формате', () => {
    const result = gendiff(jsonPaths.pathSecond, jsonPaths.pathFirst);
    expect(result).toEqual(correctFiles.file2);
  });

  test('чтение и сравнение файлов JSON. Вывод в плоском формате', () => {
    const result = gendiff(jsonPaths.pathFirst, jsonPaths.pathSecond, 'plain');
    expect(result).toEqual(correctFiles.file3);
  });

  test('чтение и сравнение файлов в обратном порядке JSON. Вывод в плоском формате', () => {
    const result = gendiff(jsonPaths.pathSecond, jsonPaths.pathFirst, 'plain');
    expect(result).toEqual(correctFiles.file4);
  });

  test('чтение и сравнение файлов JSON. Вывод в формате JSON', () => {
    const result = gendiff(jsonPaths.pathFirst, jsonPaths.pathSecond, 'json');
    expect(result).toEqual(correctFiles.file5);
  });
});

describe('ymlPaths', () => {
  test('чтение и сравнение файлов YML. Вывод в полном формате', () => {
    const result = gendiff(ymlPaths.pathFirst, ymlPaths.pathSecond);
    expect(result).toEqual(correctFiles.file1);
  });

  test('чтение и сравнение файлов в обратном порядке YML. Вывод в полном формате', () => {
    const result = gendiff(ymlPaths.pathSecond, ymlPaths.pathFirst);
    expect(result).toEqual(correctFiles.file2);
  });

  test('чтение и сравнение файлов YML. Вывод в плоском формате', () => {
    const result = gendiff(ymlPaths.pathFirst, ymlPaths.pathSecond, 'plain');
    expect(result).toEqual(correctFiles.file3);
  });

  test('чтение и сравнение файлов в обратном порядке YML. Вывод в плоском формате', () => {
    const result = gendiff(ymlPaths.pathSecond, ymlPaths.pathFirst, 'plain');
    expect(result).toEqual(correctFiles.file4);
  });
});

describe('iniPaths', () => {
  test('чтение и сравнение файлов INI. Вывод в полном формате', () => {
    const result = gendiff(iniPaths.pathFirst, iniPaths.pathSecond);
    expect(result).toEqual(correctFiles.file1);
  });

  test('чтение и сравнение файлов в обратном порядке INI. Вывод в полном формате', () => {
    const result = gendiff(iniPaths.pathSecond, iniPaths.pathFirst);
    expect(result).toEqual(correctFiles.file2);
  });

  test('чтение и сравнение файлов INI. Вывод в плоском формате', () => {
    const result = gendiff(iniPaths.pathFirst, iniPaths.pathSecond, 'plain');
    expect(result).toEqual(correctFiles.file3);
  });

  test('чтение и сравнение файлов в обратном порядке INI. Вывод в плоском формате', () => {
    const result = gendiff(iniPaths.pathSecond, iniPaths.pathFirst, 'plain');
    expect(result).toEqual(correctFiles.file4);
  });
});
