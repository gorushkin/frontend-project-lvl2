import fs from 'fs';
import gendiff from '../src/index';

test('чтение и сравнение файлов', () => {
  const pathFirst = `${__dirname}/fixtures/before.json`;
  const pathSecond = `${__dirname}/fixtures/after.json`;
  const pathResult = `${__dirname}/fixtures/result`;
  const secondResult = fs.readFileSync(pathResult, 'utf-8');
  const result = gendiff(pathFirst, pathSecond);
  expect(secondResult).toEqual(result);
});
