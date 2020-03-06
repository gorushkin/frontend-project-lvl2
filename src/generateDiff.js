import fs, { accessSync } from 'fs';
import path from 'path';
import process from 'process';
import lodash from 'lodash';
import render from './render';

const generateDiffs = (obj1, obj2) => {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  const allKeysSet = new Set([...obj1Keys, ...obj2Keys]);
  const allKeys = [...allKeysSet];
  const result = allKeys.reduce((acc, key) => {
    const diff = {key};
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      diff.children = generateDiffs(obj1[key], obj2[key]);
      return [...acc, diff];
    }
    if (lodash.has(obj1, key)) {
      diff.value1 = obj1[key];
    }
    if (lodash.has(obj2, key)) {
      diff.value2 = obj2[key];
    }
    return [...acc, diff];
  }, [])
  return result;
}

export default generateDiffs;