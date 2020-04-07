import _ from 'lodash';
import sortArr from './utils';

const stringify = (obj) => {
  if (typeof obj === 'object') {
    const tempResult = Object.keys(obj).reduce((acc, key) => [...acc, `{${key}: ${obj[key]}}`], []);
    return tempResult;
  }
  return obj;
};

const renderJsonDiff = (array) => {
  const iter = (diff, path) => {
    const sortedDiff = sortArr(diff);
    const result = sortedDiff.reduce((acc, note) => {
      if (_.has(note, 'children')) {
        const currentPath = `${path}${note.key}.`;
        const children = iter(note.children, currentPath);
        return [...acc, ...children];
      }
      const { key } = note;
      const valuebefore = (_.has(note, 'value1')) ? `,"valuebefore": "${stringify(note.value1)}"` : '';
      const valueafter = (_.has(note, 'value2')) ? `,"valueafter": "${stringify(note.value2)}"` : '';
      const currentNote = `{"key": "${path}${key}"${valuebefore}${valueafter}}`;
      return [...acc, currentNote];
    }, []);
    return result;
  };

  const finishArray = iter(array, '');
  const result = `[${finishArray.join(',')}]`;
  return result;
};

export default renderJsonDiff;
