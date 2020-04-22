import fs from 'fs';
import path from 'path';

const readFile = (filePath) => {
  const absPath = path.resolve(filePath);
  const data = fs.readFileSync(absPath, 'utf8');
  return data;
};

const getFileExtension = (filePath) => {
  const absPath = path.resolve(filePath);
  return path.extname(absPath).substring(1);
};

export default (filePath) => {
  const data = readFile(filePath);
  const fileExtension = getFileExtension(filePath);
  return { data, fileExtension };
};
