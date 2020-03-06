// import process from 'process';
import _ from 'lodash';
import parser from './parsers';
import generateDiffs from './generateDiff';
import renderDiff from './render'

const gendiff = (firstPath, secondPath) => {
  const [firstConfig, secondConfig] = parser(firstPath, secondPath);
  const diffs = generateDiffs(firstConfig, secondConfig);
  const result = renderDiff(diffs);
  return result;
};

export default gendiff;
