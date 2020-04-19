import _ from 'lodash';

const getDiff = (key, obj1, obj2) => {
    const diff = { key }
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
    return diff;
}

const generateDiff = (obj1, obj2) => {
  const allKeys = _.union(_.keys(obj1), _.keys(obj2));
  const result = allKeys.reduce((acc, key) => {
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      const children = generateDiff(obj1[key], obj2[key]);
      const parentNode = {
        key,
        children
      }
      return [...acc, parentNode];
    }
        // const beforeValue = (_.has(obj1, key)) ? obj1[key] : false;
    // const afterValue = (_.has(obj2, key)) ? obj2[key] : false;
    const diff = getDiff(key, obj1, obj2);
    return [...acc, diff];
  }, []);
  return result;
};

export default generateDiff;