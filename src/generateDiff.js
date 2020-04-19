import _ from 'lodash';

const getDiff = (key, obj1, obj2) => {
  if (_.has(obj1, key)) {
    if (_.has(obj2, key)) {
      if ((obj1[key] === obj2[key])) {
        return {
          key,
          before: obj1[key],
          after: obj2[key],
          status: 'unchanged',
        };
      }
      return {
        key,
        before: obj1[key],
        after: obj2[key],
        status: 'changed',
      };
    }
    return {
      key,
      before: obj1[key],
      status: 'removed',
    };
  }
  return {
    key,
    after: obj2[key],
    status: 'added',
  };
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
    const currentNode = getDiff(key, obj1, obj2);
    return [...acc, currentNode];
  }, []);
  return result;
};

export default generateDiff;
