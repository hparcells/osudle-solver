#! /usr/bin/env node

const asciify = require('asciify-image');
const chalk = require('chalk');
const inquirer = require('inquirer');

function formatSolutionInfo(solution) {
  return `${solution.artist} - ${chalk.underline.bold(`${solution.title} [${solution.diff_name}]`)} (${solution.mapper_name}, ${solution.star_rating}*) | ${solution.map_url}`;
}

async function printSolution(solution) {
  const ascii = await asciify(solution.background, {
    fit: 'width',
    width: process.stdout.columns * 0.5,
  });

  console.log(ascii);
  console.log(chalk.bgWhite.black(` osudle! #${solution.MOTD} `));
  console.log(formatSolutionInfo(solution));
}

const ROOT_PROMPT = {
  type: 'list',
  name: 'action',
  message: 'What would you like to do?',
  choices: [
    'Get the latest osudle!',
    'Get a specific osudle!',
    'Quit',
  ],
};

(async () => {
  const response = await fetch('https://www.osudle.com/api/dailies/');
  const data = await response.json();

  do {
    const { action } = await inquirer.prompt(ROOT_PROMPT);
    if (action === 'Quit') {
      process.exit(0);
    }
    if(action === 'Get a specific osudle!') {
      const { osudle } = await inquirer.prompt([
        {
          type: 'number',
          name: 'osudle',
          message: `Which osudle would you like to see? (1-${data.length})`,
        },
      ]);

      if(!osudle || osudle < 1 || osudle > data.length) {
        console.log(chalk.red('Invalid number.\n'));
        continue;
      }
      
      const solution = data[osudle - 1];
      await printSolution(solution);
    }
    if(action === 'Get the latest osudle!') {
      const solution = data[data.length - 1];
      await printSolution(solution);
    }
    console.log('\n');
  }while(true);
})();
