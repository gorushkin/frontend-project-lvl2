import _ from 'lodash';

const stringify = (obj, depth) => {
  if (typeof obj !== 'object') {
    return `${obj}\n`;
  }
  const spaces = '  '.repeat(depth + 1);
  const notes = Object.keys(obj).map((key) => `${spaces}    ${key}: ${obj[key]}`);
  const result = [`{\n${notes.join('\n')}\n${spaces}}\n`];
  return result;
};

const notesGenerators = {
  unchanged: (spaces, note, depth) => `${spaces}  ${note.key}: ${stringify(note.before, depth)}`,
  changed: (spaces, note, depth) => `${spaces}- ${note.key}: ${stringify(note.before, depth)}${spaces}+ ${note.key}: ${stringify(note.after, depth)}`,
  added: (spaces, note, depth) => `${spaces}+ ${note.key}: ${stringify(note.after, depth)}`,
  removed: (spaces, note, depth) => `${spaces}- ${note.key}: ${stringify(note.before, depth)}`,
};

const renderFullDiff = (array) => {
  const iter = (diff, depth) => {
    const spaces = '  '.repeat(depth);
    const result = diff.map((note) => {
      if (_.has(note, 'children')) {
        const children = iter(note.children, depth + 2);
        return [`${spaces}  ${note.key}: {\n`, ...children, `  ${spaces}}\n`];
      }
      return notesGenerators[note.status](spaces, note, depth);
    });
    return result;
  };
  const rawArrow = iter(array, 1);
  const flatedArr = _.flattenDeep(rawArrow);
  const result = `{\n${flatedArr.join('')}}`;
  return result;
};

export default renderFullDiff;
