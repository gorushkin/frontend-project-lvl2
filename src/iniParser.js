import INI from 'ini';

const changeStrToInt = (obj) => {
  const keys = Object.keys(obj);
  const modifiedObj = keys.reduce((acc, key) => {
    if (typeof obj[key] === 'object') {
      const parentNode = {
        [key]: changeStrToInt(obj[key]),
      };
      return {
        ...acc,
        ...parentNode,
      };
    }
    const value = parseInt(obj[key], 10);
    const keyValue = (!Number.isNaN(value)) ? value : obj[key];
    const currentNote = {
      [key]: keyValue,
    };
    return {
      ...acc,
      ...currentNote,
    };
  }, {});
  return modifiedObj;
};

export default (data) => {
  const parsedData = INI.parse(data);
  const modifiedData = changeStrToInt(parsedData);
  return modifiedData;
};
