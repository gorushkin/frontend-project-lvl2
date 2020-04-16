import INI from 'ini';

const changeStrToInt = (obj) => {
  const keys = Object.keys(obj);
  const modifiedObj = keys.reduce((acc, key) => {
    const currentNote = {};
    if (typeof obj[key] === 'object') {
      currentNote[key] = changeStrToInt(obj[key]);
      return {
        ...acc,
        ...currentNote
      };
    }
    const value = parseInt(obj[key]);
    if (!Number.isNaN(value)) {
      currentNote[key] = value;
      return {
        ...acc,
        ...currentNote
      };
    }
    currentNote[key] = obj[key];
    return {
      ...acc,
      ...currentNote
    };
  }, {})
  return modifiedObj;
}

export default (data) => {
  const parsedData = INI.parse(data);
  const modifiedData = changeStrToInt(parsedData);
  return modifiedData;
}