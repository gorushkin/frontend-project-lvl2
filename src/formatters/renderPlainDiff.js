import _ from 'lodash';

const stringify = (obj) => {
  if (typeof obj === 'object') {
    return '[complex value]';
  }
  return obj;
};

const notesGenerators = {
  unchanged: () => [],
  changed: (note, path) => [`Property '${path}${note.key}' was changed from ${stringify(note.before)} to ${stringify(note.after)}`],
  added: (note, path) => [`Property '${path}${note.key}' was added with value: ${stringify(note.after)}`],
  removed: (note, path) => [`Property '${path}${note.key}' was deleted`],
};

const renderPlainDiff = (array) => {
  const iter = (diff, path) => {
    const result = diff.map((note) => {
      if (_.has(note, 'children')) {
        const currentPath = `${path}${note.key}.`;
        const children = iter(note.children, currentPath);
        return [...children];
      }
      return notesGenerators[note.status](note, path);
    }, []);
    return result;
  };

  const rawArray = iter(array, '');
  const flatedArr = _.flattenDeep(rawArray);
  const result = `${flatedArr.join('\n')}`;
  return result;
};

export default renderPlainDiff;
