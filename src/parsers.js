import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import INI from 'ini';

const extensions = {
  json: (file) => JSON.parse(file),
  yml: (file) => YAML.parse(file),
  ini: (file) => INI.parse(file),
};

const parser = (firstPath, secondPath) => {
  console.log('secondPath: ', secondPath);
  console.log('firstPath: ', firstPath);
  const absFirstPath = path.resolve(firstPath);
  const absSecondPath = path.resolve(secondPath);
  const firstFile = fs.readFileSync(absFirstPath, 'utf8');
  const secondFile = fs.readFileSync(absSecondPath, 'utf8');
  const firstFileExt = path.extname(absFirstPath).substring(1);
  const secondFileExt = path.extname(absSecondPath).substring(1);
  const firstConfig = extensions[firstFileExt](firstFile);
  const secondConfig = extensions[secondFileExt](secondFile);

  return [firstConfig, secondConfig];
};

export default parser;
