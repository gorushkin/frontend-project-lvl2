import _ from 'lodash';

const stringify = (obj) => {
  const result = (typeof obj === 'object') ? '[complex value]' : obj;
  return result;
};

const notesGenerators = {
  nested: (node, path, fn) => {
    const newPath = `${path}${node.key}.`;
    const children = fn(node.children, newPath);
    return children;
  },
  unchanged: () => [],
  changed: (node, path) => `Property '${path}${node.key}' was changed from ${stringify(node.before)} to ${stringify(node.after)}`,
  added: (node, path) => `Property '${path}${node.key}' was added with value: ${stringify(node.after)}`,
  removed: (node, path) => `Property '${path}${node.key}' was deleted`,
};

const renderPlainDiff = (data) => {
  const iter = (diff, currentPath) => {
    const result = diff.map((node) => notesGenerators[node.type](node, currentPath, iter));
    return result;
  };

  const rawData = iter(data, '');
  const flattedData = _.flattenDeep(rawData);
  const result = flattedData.join('\n');
  return result;
};

export default renderPlainDiff;
