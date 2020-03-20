// import process from 'process';
import parser from './parsers';
import generateDiffs from './generateDiff';
import renderDiff from './render';

const gendiff = (firstPath, secondPath, formatOption) => {
  const [firstConfig, secondConfig] = parser(firstPath, secondPath);
  const diffs = generateDiffs(firstConfig, secondConfig);
  const result = renderDiff(diffs, formatOption);
  return result;
};

export default gendiff;
