import readFile from './readFile';
import parse from './parsers';
import generateDiff from './generateDiff';
import renderDiff from './formatters';

export default (firstPath, secondPath, formatOption) => {
  const data1 = readFile(firstPath);
  const firstConfig = parse(data1.data, data1.fileExtension);
  const data2 = readFile(secondPath);
  const secondConfig = parse(data2.data, data2.fileExtension);
  const diff = generateDiff(firstConfig, secondConfig);
  const result = renderDiff(diff, formatOption);
  return result;
};
