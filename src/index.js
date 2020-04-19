import getData from './getData';
import generateDiff from './generateDiff';
import renderDiff from './formatters';

export default (firstPath, secondPath, formatOption) => {
  const firstConfig = getData(firstPath);
  const secondConfig = getData(secondPath);
  const diff = generateDiff(firstConfig, secondConfig);
  // console.log('diff: ', diff);
  const result = renderDiff(diff, formatOption);
  return result;
};
