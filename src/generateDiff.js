import _ from 'lodash';

const getCurrentDiff = (key, obj1, obj2) => {
  if (_.has(obj1, key)) {
    const before = obj1[key];
    if (_.has(obj2, key)) {
      const after = obj2[key];
      if (before === after) {
        const status = 'unchanged';
        const diff = {
          key,
          before,
          after,
          status,
        };
        return diff;
      }
      const status = 'changed';
      const diff = {
        key,
        before,
        after,
        status,
      };
      return diff;
    }
    const status = 'removed';
    const diff = {
      key,
      before,
      status,
    };
    return diff;
  }
  const after = obj2[key];
  const status = 'added';
  const diff = {
    key,
    after,
    status,
  };
  return diff;
};

const generateDiff = (obj1, obj2) => {
  const allKeys = _.union(_.keys(obj1), _.keys(obj2));
  const result = allKeys.reduce((acc, key) => {
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      const children = generateDiff(obj1[key], obj2[key]);
      const parentNode = {
        key,
        children,
      };
      return [...acc, parentNode];
    }
    const currentNode = getCurrentDiff(key, obj1, obj2);
    return [...acc, currentNode];
  }, []);
  return result;
};

export default generateDiff;
