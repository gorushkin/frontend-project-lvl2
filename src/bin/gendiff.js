#!/usr/bin/env node
import program from 'commander';
import {
  version,
} from '../../package.json';
import gendiff from '..';

program
  .version(version)
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'full')
  .action((firstConfig, secondConfig) => {
    console.log(gendiff(firstConfig, secondConfig, program.format));
  })
  .parse(process.argv);
