import _ from 'lodash';

const stringify = (obj) => {
  if (typeof obj === 'object') {
    return '[complex value]'
  }
  return obj;
}

const sortArr = (arr) => {
  const result = arr.slice().sort((a, b) => {
    if (a.key >= b.key) {
      return 1;
    }
    return -1;
  });
  return result;
};

const renderPlainDiff = (array) => {
  const iter = (diff, path) => {
    const sortedDiff = sortArr(diff);
    const result = sortedDiff.reduce((acc, note) => {
      if (_.has(note, 'children')) {
        const currentPath = `${path}${note.key}.`
        const children = iter(note.children, currentPath);
        return [...acc, ...children];
      }
      if (_.has(note, 'value2')) {
        if (_.has(note, 'value1')) {
          if (note.value1 === note.value2) {
            return acc
          } return [...acc, `Property '${path}${note.key}' was changed from ${stringify(note.value1)} to ${stringify(note.value2)}`]
        }
        return [...acc, `Property '${path}${note.key}' was added with value: ${stringify(note.value2)}`];
      }
      return [...acc, `Property '${path}${note.key}' was deleted`];
    },[]);
    return result;
  }

  const finishArray = iter(array,'')
  const result = `${finishArray.join('\n')}`;
  return result;
}

export default renderPlainDiff;
