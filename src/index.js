import getData from './getData';
import generateDiffs from './generateDiff';
import renderDiff from './formatters';

export default (firstPath, secondPath, formatOption) => {
  const [firstConfig, secondConfig] = getData(firstPath, secondPath);
  const diffs = generateDiffs(firstConfig, secondConfig);
  const result = renderDiff(diffs, formatOption);
  return result;
};
