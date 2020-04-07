import _ from 'lodash';
import sortArr from './utils'

const stringify = (obj) => {
  if (typeof obj === 'object') {
    return '[complex value]';
  }
  return obj;
};

const renderPlainDiff = (array) => {
  const iter = (diff, path) => {
    const sortedDiff = sortArr(diff);
    const result = sortedDiff.reduce((acc, note) => {
      if (_.has(note, 'children')) {
        const currentPath = `${path}${note.key}.`;
        const children = iter(note.children, currentPath);
        return [...acc, ...children];
      }
      if (_.has(note, 'value2')) {
        if (_.has(note, 'value1')) {
          if (note.value1 === note.value2) {
            return acc;
          } return [...acc, `Property '${path}${note.key}' was changed from ${stringify(note.value1)} to ${stringify(note.value2)}`];
        }
        return [...acc, `Property '${path}${note.key}' was added with value: ${stringify(note.value2)}`];
      }
      return [...acc, `Property '${path}${note.key}' was deleted`];
    }, []);
    return result;
  };

  const finishArray = iter(array, '');
  const result = `${finishArray.join('\n')}`;
  return result;
};

export default renderPlainDiff;
