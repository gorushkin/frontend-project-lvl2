import _ from 'lodash';
import sortArr from './utils';

const renderJsonDiff = (data) => {
  const iter = (diff) => {
    const sortedDiff = sortArr(diff);
    const result = sortedDiff.map(note => {
      if (_.has(note, 'children')) {
        const children = iter(note.children);
        const newNote = {};
        newNote.key = note.key;
        newNote.children = children;
        return newNote;
      }
      return note;
    })
    return result;
  };

  const fullSortedData = iter(data);
  const result = JSON.stringify(fullSortedData);
  return result;
};

export default renderJsonDiff;
