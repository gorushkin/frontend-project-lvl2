import _ from 'lodash';

const stringify = (obj) => {
  const result = (typeof obj === 'object') ? '[complex value]' : obj;
  return result;
};

const notesGenerators = {
  unchanged: () => [],
  changed: (node, path) => `Property '${path}${node.key}' was changed from ${stringify(node.before)} to ${stringify(node.after)}`,
  added: (node, path) => `Property '${path}${node.key}' was added with value: ${stringify(node.after)}`,
  removed: (node, path) => `Property '${path}${node.key}' was deleted`,
};

const renderPlainDiff = (data) => {
  const iter = (diff, path) => {
    const result = diff.map((node) => {
      if (node.type === 'parent') {
        const currentPath = `${path}${node.key}.`;
        const children = iter(node.children, currentPath);
        return children;
      }
      return notesGenerators[node.status](node, path);
    }, []);
    return result;
  };

  const rawData = iter(data, '');
  const flatedData = _.flattenDeep(rawData);
  const result = `${flatedData.join('\n')}`;
  return result;
};

export default renderPlainDiff;
