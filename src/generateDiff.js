import _ from 'lodash';

const generateDiff = (obj1, obj2) => {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  const allKeysSet = new Set([...obj1Keys, ...obj2Keys]);
  const allKeys = [...allKeysSet];
  const result = allKeys.reduce((acc, key) => {
    const diff = { key };
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      diff.children = generateDiff(obj1[key], obj2[key]);
      return [...acc, diff];
    }
    if (_.has(obj1, key)) {
      diff.before = obj1[key];
    }
    if (_.has(obj2, key)) {
      diff.after = obj2[key];
    }
    return [...acc, diff];
  }, []);
  return result;
};

export default generateDiff;
