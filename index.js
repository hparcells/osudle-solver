#! /usr/bin/env node
const asciify = require('asciify-image');
const chalk = require('chalk');

function formatSolution(solution) {
  return `${solution.artist} - ${chalk.underline.bold(`${solution.title} [${solution.diff_name}]`)} (${solution.mapper_name}, ${solution.star_rating}*) | ${solution.map_url}`;
}

(async () => {
  const response = await fetch('https://www.osudle.com/api/dailies/');
  const data = await response.json();

  const solution = data[data.length - 1];
  const ascii = await asciify(solution.background, {
    fit: 'width',
    width: process.stdout.columns * 0.5,
  });

  console.log(ascii);
  console.log(chalk.bgWhite.black(`osudle! #${solution.MOTD}`));
  console.log(formatSolution(solution));
})();
