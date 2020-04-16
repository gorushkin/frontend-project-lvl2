import _ from 'lodash';
import sortArr from './utils';

const stringify = (obj) => {
  if (typeof obj === 'object') {
    return '[complex value]';
  }
  return obj;
};

const notesGenerators = {
  unchanged: (acc) => acc,
  changed: (acc, note, path) => [...acc, `Property '${path}${note.key}' was changed from ${stringify(note.before)} to ${stringify(note.after)}`],
  added: (acc, note, path) => [...acc, `Property '${path}${note.key}' was added with value: ${stringify(note.after)}`],
  removed: (acc, note, path) => [...acc, `Property '${path}${note.key}' was deleted`],
}

const renderPlainDiff = (array) => {
  const iter = (diff, path) => {
    const sortedDiff = sortArr(diff);
    const result = sortedDiff.reduce((acc, note) => {
      if (_.has(note, 'children')) {
        const currentPath = `${path}${note.key}.`;
        const children = iter(note.children, currentPath);
        return [...acc, ...children];
      }
      return notesGenerators[note.status](acc, note, path);

    }, []);
    return result;
  };

  const finishArray = iter(array, '');
  const result = `${finishArray.join('\n')}`;
  return result;
};

export default renderPlainDiff;
