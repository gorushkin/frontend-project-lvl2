import _ from 'lodash';

const stringify = (obj) => {
  const result = (_.isObject(obj)) ? '[complex value]' : obj;
  return result;
};

const notesGenerators = {
  nested: (node, path, fn) => {
    const newPath = `${path}${node.key}.`;
    return fn(node.children, newPath);
  },
  unchanged: () => null,
  changed: (node, path) => `Property '${path}${node.key}' was changed from ${stringify(node.before)} to ${stringify(node.after)}`,
  added: (node, path) => `Property '${path}${node.key}' was added with value: ${stringify(node.after)}`,
  removed: (node, path) => `Property '${path}${node.key}' was deleted`,
};

const renderPlainDiff = (diff, currentPath = '') => {
  const unFilteredResult = diff
    .map((node) => notesGenerators[node.type](node, currentPath, renderPlainDiff));
  const result = unFilteredResult.filter((line) => line).join('\n');
  return result;
};

export default renderPlainDiff;
