import _ from 'lodash';

const sortData = (data) => {
  const result = data.slice().sort((a, b) => {
    if (a >= b) {
      return 1;
    }
    return -1;
  });
  return result;
};

const generateDiff = (obj1, obj2) => {
  const allKeys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedKeys = allKeys.slice().sort();
  const result = sortedKeys.map((key) => {
    if (!_.has(obj1, key)) {
      const type = 'added';
      const after = obj2[key];
      const diff = {
        key, type, after,
      };
      return diff;
    }
    if (!_.has(obj2, key)) {
      const type = 'removed';
      const before = obj1[key];
      const diff = {
        key, type, before,
      };
      return diff;
    }
    const before = obj1[key];
    const after = obj2[key];
    if (_.isObject(before) && _.isObject(after)) {
      const children = generateDiff(before, after);
      const type = 'nested';
      const parentNode = {
        key, type, children,
      };
      return parentNode;
    }
    if (before === after) {
      const type = 'unchanged';
      const diff = {
        key, type, before, after,
      };
      return diff;
    }
    const type = 'changed';
    const diff = {
      key, type, before, after,
    };
    return diff;
  });
  return result;
};

export default (obj1, obj2) => {
  const result = generateDiff(obj1, obj2);
  return result;
};
