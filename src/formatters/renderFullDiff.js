const generateIndent = (depth) => '    '.repeat(depth);

const stringify = (obj, depth) => {
  if (typeof obj !== 'object') {
    return obj;
  }
  const indent = generateIndent(depth );
  const notes = Object.keys(obj).map((key) => `${indent}    ${key}: ${obj[key]}`);
  const result = `{\n${notes.join('\n')}\n${indent}}`;
  return result;
};


const notesGenerators = {
  nested: (indent, node, depth, fn) => `${indent}    ${node.key}: ${fn(node.children, depth + 1)}`,
  unchanged: (indent, node, depth) => `${indent}    ${node.key}: ${stringify(node.before, depth + 1)}`,
  changed: (indent, node, depth) => `${indent}  - ${node.key}: ${stringify(node.before, depth + 1)}\n${indent}  + ${node.key}: ${stringify(node.after, depth + 1)}`,
  added: (indent, node, depth) => `${indent}  + ${node.key}: ${stringify(node.after, depth + 1)}`,
  removed: (indent, node, depth) => `${indent}  - ${node.key}: ${stringify(node.before, depth + 1)}`,
};

const renderFullDiff = (data) => {
  const iter = (diff, currentDepth = 0) => {
    const indent = generateIndent(currentDepth);
    const generatedNote = diff
    .map((node) => notesGenerators[node.type](indent, node, currentDepth, iter));
    const result = `{\n${generatedNote.join('\n')}\n${indent}}`
    return result;
  };

  const result = iter(data);
  return result
};

export default renderFullDiff;
