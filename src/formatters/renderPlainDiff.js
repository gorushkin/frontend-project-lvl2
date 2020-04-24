import _ from 'lodash';

const stringify = (obj) => {
  const result = (typeof obj === 'object') ? '[complex value]' : obj;
  return result;
};

const notesGenerators = {
  unchanged: () => [],
  changed: (note, path) => `Property '${path}${note.key}' was changed from ${stringify(note.before)} to ${stringify(note.after)}`,
  added: (note, path) => `Property '${path}${note.key}' was added with value: ${stringify(note.after)}`,
  removed: (note, path) => `Property '${path}${note.key}' was deleted`,
};

const renderPlainDiff = (array) => {
  const iter = (diff, path) => {
    const result = diff.map((note) => {
      if (note.type === 'parent') {
        const currentPath = `${path}${note.key}.`;
        const children = iter(note.children, currentPath);
        return children;
      }
      return notesGenerators[note.status](note, path);
    }, []);
    return result;
  };

  const rawData = iter(array, '');
  const flatedData = _.flattenDeep(rawData);
  const result = `${flatedData.join('\n')}`;
  return result;
};

export default renderPlainDiff;
