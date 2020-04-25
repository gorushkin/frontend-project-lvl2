const stringify = (obj, depth) => {
  if (typeof obj !== 'object') {
    return `${obj}\n`;
  }
  const spaces = '  '.repeat(depth + 1);
  const notes = Object.keys(obj).map((key) => `${spaces}    ${key}: ${obj[key]}`);
  const result = `{\n${notes.join('\n')}\n${spaces}}\n`;
  return result;
};

const notesGenerators = {
  unchanged: (spaces, node, depth) => `${spaces}  ${node.key}: ${stringify(node.before, depth)}`,
  changed: (spaces, node, depth) => `${spaces}- ${node.key}: ${stringify(node.before, depth)}${spaces}+ ${node.key}: ${stringify(node.after, depth)}`,
  added: (spaces, node, depth) => `${spaces}+ ${node.key}: ${stringify(node.after, depth)}`,
  removed: (spaces, node, depth) => `${spaces}- ${node.key}: ${stringify(node.before, depth)}`,
};

const renderFullDiff = (data) => {
  const iter = (diff, depth) => {
    const spaces = '  '.repeat(depth);
    const result = diff.map((node) => {
      if (node.type === 'parent') {
        const children = iter(node.children, depth + 2);
        return `${spaces}  ${node.key}: {\n${children.join('')}  ${spaces}}\n`;
      }
      return notesGenerators[node.status](spaces, node, depth);
    });
    return result;
  };
  const rawData = iter(data, 1);
  const result = `{\n${rawData.join('')}}`;
  return result;
};

export default renderFullDiff;
