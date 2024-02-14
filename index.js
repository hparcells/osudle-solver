#! /usr/bin/env node
const asciify = require('asciify-image');

function formatSolution(solution) {
  return `${solution.artist} - ${solution.title} [${solution.diff_name}] mapped by ${solution.mapper_name}`;
}

(async () => {
  const response = await fetch('https://www.osudle.com/api/dailies/');
  const data = await response.json();
  const solution = data[data.length - 1];

  console.log(formatSolution(solution));

  const ascii = await asciify(solution.background, {
    fit: 'width',
    width: process.stdout.columns * 0.5,
  });
  console.log(ascii);
})();
