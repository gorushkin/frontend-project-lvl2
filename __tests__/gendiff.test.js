import fs from 'fs';
import gendiff from '../src/index';

const jsonPaths = {
  pathFirst: `${__dirname}/fixtures/before.json`,
  pathSecond: `${__dirname}/fixtures/after.json`,
};

const ymlPaths = {
  pathFirst: `${__dirname}/fixtures/before.yml`,
  pathSecond: `${__dirname}/fixtures/after.yml`,
};

const resulPaths = {
  result1: `${__dirname}/fixtures/result1`,
  result2: `${__dirname}/fixtures/result2`,
};

describe('jsonPaths', () => {
  test('чтение и сравнение файлов JSON', () => {
    const pathResult = resulPaths.result1;
    const secondResult = fs.readFileSync(pathResult, 'utf-8');
    const result = gendiff(jsonPaths.pathFirst, jsonPaths.pathSecond);
    expect(secondResult).toEqual(result);
  });

  test('чтение и сравнение файлов в обратном порядке JSON', () => {
    const pathResult = resulPaths.result2;
    const secondResult = fs.readFileSync(pathResult, 'utf-8');
    const result = gendiff(jsonPaths.pathSecond, jsonPaths.pathFirst);
    expect(secondResult).toEqual(result);
  });
});

describe('ymlPaths', () => {
  test('чтение и сравнение файлов YML', () => {
    const pathResult = resulPaths.result1;
    const secondResult = fs.readFileSync(pathResult, 'utf-8');
    const result = gendiff(ymlPaths.pathFirst, ymlPaths.pathSecond);
    expect(secondResult).toEqual(result);
  });

  test('чтение и сравнение файлов в обратном порядке YML', () => {
    const pathResult = resulPaths.result2;
    const secondResult = fs.readFileSync(pathResult, 'utf-8');
    const result = gendiff(ymlPaths.pathSecond, ymlPaths.pathFirst);
    expect(secondResult).toEqual(result);
  });
});
