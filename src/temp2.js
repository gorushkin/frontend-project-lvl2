import fs from 'fs';
import path from 'path';
import process from 'process';

// const filePaths = {
//   before: "__tests__/__fixtures__/before.json",
//   after: "__tests__/__fixtures__/after.json",
// }

const filePaths = {
  before: "__tests__/fixtures/before.json",
  after: "__tests__/fixtures/after.json",
}

const before = JSON.parse(fs.readFileSync(filePaths.before, 'utf8'));
const after = JSON.parse(fs.readFileSync(filePaths.after, 'utf8'));

const createDiff = (first, second) => {
  const firstKeys = Object.keys(first);
  const secondKeys = Object.keys(second);
  const allKeysSet = new Set([...firstKeys, ...secondKeys]);
  const allKeys = [...allKeysSet];
  const result = allKeys.reduce((acc, key) => {
    const diff = {};
    diff.key = key;
    diff.value1 = (first[key]);
    diff.value2 = (second[key]);
    // acc.push({...diff});
    return [...acc, ...diff];
  }, [])

  return result;

}

const result = createDiff(before, after);
console.log('result: ', result);
// console.log(typeof result);