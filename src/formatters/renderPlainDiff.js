import _ from 'lodash';

const stringify = (obj) => {
  const result = (typeof obj === 'object') ? '[complex value]' : obj;
  return result;
};


const renderPlainDiff = (data) => {
  const iter = (diff, currentPath) => {
    const notesGenerators = {
      parent: (node, path) => {
        const newPath = `${path}${node.key}.`;
        const children = iter(node.children, newPath);
        return children;
      },
      unchanged: () => [],
      changed: (node, path) => `Property '${path}${node.key}' was changed from ${stringify(node.before)} to ${stringify(node.after)}`,
      added: (node, path) => `Property '${path}${node.key}' was added with value: ${stringify(node.after)}`,
      removed: (node, path) => `Property '${path}${node.key}' was deleted`,
    };
    const result = diff.map((node) => notesGenerators[node.type](node, currentPath));
    return result;
  };

  const rawData = iter(data, '');
  const flatedData = _.flattenDeep(rawData);
  const result = `${flatedData.join('\n')}`;
  return result;
};

export default renderPlainDiff;
