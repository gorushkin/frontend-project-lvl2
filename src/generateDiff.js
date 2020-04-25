import _ from 'lodash';

const sortData = (data) => {
  const result = data.slice().sort((a, b) => {
    if (a.key >= b.key) {
      return 1;
    }
    return -1;
  });
  return result;
};

const sortDiff = (data) => {
  const sortedDiff = sortData(data);
  const result = sortedDiff.map((note) => {
    if (note.type === 'parent') {
      const children = sortDiff(note.children);
      const { key } = note;
      const { type } = note;
      const newNote = { key, type, children };
      return newNote;
    }
    return note;
  });
  return result;
};

const generateDiff = (obj1, obj2) => {
  const allKeys = _.union(_.keys(obj1), _.keys(obj2));
  const result = allKeys.map((key) => {
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      const children = generateDiff(obj1[key], obj2[key]);
      const type = 'parent';
      const parentNode = { key, type, children };
      return parentNode;
    }
    if ((_.has(obj1, key)) && (_.has(obj2, key))) {
      const before = obj1[key];
      const after = obj2[key];
      const type = 'child';
      const status = (before === after) ? 'unchanged' : 'changed';
      const diff = {
        key, type, before, after, status,
      };
      return diff;
    }
    if ((_.has(obj1, key))) {
      const before = obj1[key];
      const status = 'removed';
      const type = 'child';
      const diff = {
        key, type, before, status,
      };
      return diff;
    }
    const type = 'child';
    const after = obj2[key];
    const status = 'added';
    const diff = {
      key, type, after, status,
    };
    return diff;
  });
  return result;
};

export default (obj1, obj2) => {
  const unsortedDiff = generateDiff(obj1, obj2);
  const resultDiff = sortDiff(unsortedDiff);
  return resultDiff;
};
