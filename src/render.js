import _ from 'lodash';

const sortArr = (arr) => {
  return arr.sort((a, b) => {
    if (a.key >= b.key) {
      return 1
    }
    if (a.key < b.key) {
      return -1
    }
  });
}

const renderDiff = (diff) => {
    const iter = (diff, depth) => {
      const spaces = '  '.repeat(depth);
      const sortedDiff = sortArr(diff);
      const result = sortedDiff.reduce((acc, note) => {
        if (_.has(note, 'children')) {
          const children = iter(note.children, depth + 2);
          return [...acc, `${spaces}  ${note.key}: {`, ...children, `${spaces}}`]
        }
        if (_.has(note, 'value2')) {
          if (_.has(note, 'value1')) {
            if (note.value1 === note.value2) {
              return [...acc, `${spaces}  ${note.key}: ${note.value1}`]
            } else {
              return [...acc, `${spaces}+ ${note.key}: ${note.value2}`, `${spaces}- ${note.key}: ${note.value1}`]
            }
          } else {
            return [...acc, `${spaces}+ ${note.key}: ${note.value2}`]
          }
        }
        return [...acc, `${spaces}- ${note.key}: ${note.value1}`]
      }, []);
      return result;
    }

    const finishArray = iter(diff, 1);
    const result = `{\n${finishArray.join('\n')}\n}`;
    return result;
  }

export default renderDiff;