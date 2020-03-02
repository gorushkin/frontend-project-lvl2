import fs from 'fs';
import gendiff from '../src/index';

test('чтение и сравнение файлов', () => {
  const pathFirst = `${__dirname}/fixtures/before.json`;
  const pathSecond = `${__dirname}/fixtures/after.json`;
  const pathResult = `${__dirname}/fixtures/result1`;
  const secondResult = fs.readFileSync(pathResult, 'utf-8');
  const result = gendiff(pathFirst, pathSecond);
  expect(secondResult).toEqual(result);
});

test('чтение и сравнение файлов в обратном порядке', () => {
  const pathFirst = `${__dirname}/fixtures/after.json`;
  const pathSecond = `${__dirname}/fixtures/before.json`;
  const pathResult = `${__dirname}/fixtures/result2`;
  const secondResult = fs.readFileSync(pathResult, 'utf-8');
  const result = gendiff(pathFirst, pathSecond);
  expect(secondResult).toEqual(result);
});
