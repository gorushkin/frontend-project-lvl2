import _ from 'lodash';
import sortArr from './utils';

const stringify = (obj, depth) => {
  if (typeof obj === 'object') {
    const spaces = '  '.repeat(depth + 1);
    const tempResult = Object.keys(obj).reduce((acc, key) => [...acc, `${spaces}    ${key}: ${obj[key]}`], []);
    const result = `\n${tempResult.join('\n')}`;
    return `{${result}\n${spaces}}`;
  }
  return obj;
};

const renderFullDiff = (array) => {
  const iter = (diff, depth) => {
    const spaces = '  '.repeat(depth);
    const sortedDiff = sortArr(diff);
    const result = sortedDiff.reduce((acc, note) => {
      if (_.has(note, 'children')) {
        const children = iter(note.children, depth + 2);
        return [...acc, `${spaces}  ${note.key}: {`, ...children, `  ${spaces}}`];
      }
      if (_.has(note, 'value2')) {
        if (_.has(note, 'value1')) {
          if (note.value1 === note.value2) {
            return [...acc, `${spaces}  ${note.key}: ${note.value1}`];
          } return [...acc, `${spaces}- ${note.key}: ${stringify(note.value1, depth)}`, `${spaces}+ ${note.key}: ${stringify(note.value2, depth)}`];
        }
        return [...acc, `${spaces}+ ${note.key}: ${stringify(note.value2, depth)}`];
      }
      return [...acc, `${spaces}- ${note.key}: ${stringify(note.value1, depth)}`];
    }, []);
    return result;
  };

  const finishArray = iter(array, 1);
  const result = `{\n${finishArray.join('\n')}\n}`;
  return result;
};

export default renderFullDiff;
