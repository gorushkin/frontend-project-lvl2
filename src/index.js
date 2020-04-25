import readFile from './readFile';
import parse from './parsers';
import generateDiff from './generateDiff';
import renderDiff from './formatters';

export default (firstPath, secondPath, formatOption) => {
  const data1 = readFile(firstPath);
  const config1 = parse(data1.data, data1.fileExtension);
  const data2 = readFile(secondPath);
  const config2 = parse(data2.data, data2.fileExtension);
  const diff = generateDiff(config1, config2);
  const result = renderDiff(diff, formatOption);
  return result;
};
