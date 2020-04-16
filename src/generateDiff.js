import _ from 'lodash';

const generateDiff = (obj1, obj2) => {
  const allKeys = _.union(_.keys(obj1), _.keys(obj2));
  const result = allKeys.reduce((acc, key) => {
    const diff = {
      key
    };
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      diff.children = generateDiff(obj1[key], obj2[key]);
      diff.status = 'object';
      return [...acc, diff];
    }
    if (_.has(obj1, key)) {
      diff.before = obj1[key];
      if (_.has(obj2, key)) {
        diff.after = obj2[key];
        if ((diff.before === diff.after)) {
          diff.status = 'unchanged';
        } else {
          diff.status = 'changed';
        }
      } else {
        diff.status = 'removed';
      }
    } else {
      diff.after = obj2[key];
      diff.status = 'added';
    }
    return [...acc, diff];
  }, []);
  return result;
};

export default generateDiff;