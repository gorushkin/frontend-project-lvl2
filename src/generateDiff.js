import _ from 'lodash';

const sortArr = (arr) => {
  const result = arr.slice().sort((a, b) => {
    if (a.key >= b.key) {
      return 1;
    }
    return -1;
  });
  return result;
};

const sortData = (data) => {
  const sortedDiff = sortArr(data);
  const result = sortedDiff.map((note) => {
    if (_.has(note, 'children')) {
      const children = sortData(note.children);
      const { key } = note;
      const newNote = { key, children };
      return newNote;
    }
    return note;
  });
  return result;
};

const getCurrentDiff = (key, obj1, obj2) => {
  if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
    const children = generateDiff(obj1[key], obj2[key]);
    const parentNode = { key, children };
    return parentNode;
  }
  if ((_.has(obj1, key)) && (_.has(obj2, key))) {
    const before = obj1[key];
    const after = obj2[key];
    const status = (before === after) ? 'unchanged' : 'changed';
    const diff = { key, before, after, status };
    return diff;
  }
  if ((_.has(obj1, key)) && !(_.has(obj2, key))) {
    const before = obj1[key];
    const status = 'removed';
    const diff = { key, before, status };
    return diff;
  }
  const after = obj2[key];
  const status = 'added';
  const diff = { key, after, status };
  return diff;
};

const generateDiff = (obj1, obj2) => {
  const allKeys = _.union(_.keys(obj1), _.keys(obj2));
  const unsortedData = allKeys.map((key) => {
    const currentNode = getCurrentDiff(key, obj1, obj2);
    return currentNode;
  });
  const result = sortData(unsortedData);
  return result;
};

export default generateDiff;
