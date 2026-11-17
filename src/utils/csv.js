const fs = require('fs');
const readline = require('readline');
const path = require('path');

async function processCsv(config) {
  const { inputFile, outputFile, minAge, cityFilter } = config;

  if (!inputFile || !fs.existsSync(inputFile)) {
    throw new Error(`Входной файл не найден по пути: "${inputFile || 'не указан'}"`);
  }

  const readStream = fs.createReadStream(inputFile, { encoding: 'utf-8' });

  const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity
  });

  const outputDir = path.dirname(outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const writeStream = fs.createWriteStream(outputFile, { encoding: 'utf-8' });

  let totalProcessed = 0;
  let totalFiltered = 0;
  let isHeader = true;

  try {
    for await (const line of rl) {
      const trimmedLine = line.trim();
      if (!trimmedLine) continue;

      if (isHeader) {
        writeStream.write(trimmedLine + '\n');
        isHeader = false;
        continue;
      }

      totalProcessed++;

      const columns = trimmedLine.split(',');
      if (columns.length < 4) continue;

      const age = parseInt(columns[2].trim(), 10);
      const city = columns[3].trim();

      const isAgeValid = !isNaN(age) && age >= minAge;
      const isCityValid = cityFilter
        ? city.toLowerCase() === cityFilter.toLowerCase()
        : true;

      if (isAgeValid && isCityValid) {
        writeStream.write(trimmedLine + '\n');
        totalFiltered++;
      }
    }
  } finally {
    writeStream.end();
  }

  return { totalProcessed, totalFiltered };
}

module.exports = { processCsv };