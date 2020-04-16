import _ from 'lodash';
import sortArr from './utils';

const stringify = (obj, depth) => {
  if (typeof obj === 'object') {
    const spaces = '  '.repeat(depth + 1);
    const notes = Object.keys(obj).map((key) => `${spaces}    ${key}: ${obj[key]}`);
    const result = [`{\n${notes.join('\n')}\n${spaces}}`];
    return result;
  }
  return obj;
};

const notesGenerators = {
  unchanged: (spaces, note, depth) => [`${spaces}  ${note.key}: ${stringify(note.before, depth)}`],
  changed: (spaces, note, depth) => [`${spaces}- ${note.key}: ${stringify(note.before, depth)}`, `${spaces}+ ${note.key}: ${stringify(note.after, depth)}`],
  added: (spaces, note, depth) => [`${spaces}+ ${note.key}: ${stringify(note.after, depth)}`],
  removed: (spaces, note, depth) => [`${spaces}- ${note.key}: ${stringify(note.before, depth)}`],
}

const renderFullDiff = (array) => {
  const iter = (diff, depth) => {
    const spaces = '  '.repeat(depth);
    const sortedDiff = sortArr(diff);
    const result = sortedDiff.map((note) => {
      if (_.has(note, 'children')) {
        const children = iter(note.children, depth + 2);
        return [`${spaces}  ${note.key}: {`, ...children, `  ${spaces}}`];
      }
      return notesGenerators[note.status](spaces, note, depth);
    });
    return result;
  };
  const rowArrow = iter(array, 1);
  const flatedArr = _.flattenDeep(rowArrow);
  const result = `{\n${flatedArr.join('\n')}\n}`;
  return result;
};

export default renderFullDiff;