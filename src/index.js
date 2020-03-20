import parser from './parsers';
import generateDiffs from './generateDiff';
import render from './formatters';


const gendiff = (firstPath, secondPath, formatOption) => {
  const [firstConfig, secondConfig] = parser(firstPath, secondPath);
  const diffs = generateDiffs(firstConfig, secondConfig);
  const result = render(diffs, formatOption);
  return result;
};

export default gendiff;
