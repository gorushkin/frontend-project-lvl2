const stringify = (obj, depth) => {
  if (typeof obj !== 'object') {
    return `${obj}\n`;
  }
  const spaces = '  '.repeat(depth + 1);
  const notes = Object.keys(obj).map((key) => `${spaces}    ${key}: ${obj[key]}`);
  const result = `{\n${notes.join('\n')}\n${spaces}}\n`;
  return result;
};

const generateIndent = (depth) => '  '.repeat(depth);

const notesGenerators = {
  nested: (indent, node, depth, fn) => {
    const children = fn(node.children, depth + 2);
    return `${indent}  ${node.key}: {\n${children.join('')}  ${indent}}\n`;
  },
  unchanged: (indent, node, depth) => `${indent}  ${node.key}: ${stringify(node.before, depth)}`,
  changed: (indent, node, depth) => `${indent}- ${node.key}: ${stringify(node.before, depth)}${indent}+ ${node.key}: ${stringify(node.after, depth)}`,
  added: (indent, node, depth) => `${indent}+ ${node.key}: ${stringify(node.after, depth)}`,
  removed: (indent, node, depth) => `${indent}- ${node.key}: ${stringify(node.before, depth)}`,
};

const renderFullDiff = (data) => {
  const iter = (diff, currentDepth) => {
    const indent = generateIndent(currentDepth);
    const result = diff
      .map((node) => notesGenerators[node.type](indent, node, currentDepth, iter));
    return result;
  };
  const rawData = iter(data, 1);
  const result = `{\n${rawData.join('')}}`;
  return result;
};

export default renderFullDiff;
