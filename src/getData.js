import fs from 'fs';
import path from 'path';
import parse from './parsers';

const readFile = (filePath) => {
  const absPath = path.resolve(filePath);
  const data = fs.readFileSync(absPath, 'utf8');
  return data;
};

const getFileExtension = (filePath) => {
  const absPath = path.resolve(filePath);
  return path.extname(absPath).substring(1);
};

export default (path) => {
  const data = readFile(path);
  const fileExtension = getFileExtension(path);
  const config = parse(data, fileExtension);
  return config;
};
