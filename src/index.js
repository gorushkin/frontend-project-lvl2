import parser from './parsers';
import generateDiffs from './generateDiff';
import renderDiff from './formatters';

export default (firstPath, secondPath, formatOption) => {
  const [firstConfig, secondConfig] = parser(firstPath, secondPath);
  const diffs = generateDiffs(firstConfig, secondConfig);
  const result = renderDiff(diffs, formatOption);
  return result;
};
