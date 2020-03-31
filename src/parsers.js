import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import INI from 'ini';

const extensions = {
  json: (file) => JSON.parse(file),
  yml: (file) => YAML.parse(file),
  ini: (file) => INI.parse(file),
};

const readFile = (filePath) => {
  const absPath = path.resolve(filePath);
  const data = fs.readFileSync(absPath, 'utf8');
  return data;
}

const getFileExtension = (filePath) => {
  const absPath = path.resolve(filePath);
  return path.extname(absPath).substring(1);
}
const parse = (data, type) => {
  const result = extensions[type](data);
  return result;
}

export default (path1, path2) => {
  const data1 = readFile(path1);
  const data2 = readFile(path2);
  const file1Extension = getFileExtension(path1);
  const file2Extension = getFileExtension(path2);
  const config1 = parse(data1, file1Extension);
  const config2 = parse(data2, file2Extension);
  return [config1, config2];
};
