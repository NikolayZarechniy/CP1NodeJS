const config = require("./config");
const { processCsv } = require("./utils/csv");

async function main() {
  try {
    console.log("Запуск обработки CSV...");

    const stats = await processCsv(config);

    console.log("\n- Обработка завершена ");
    console.log(`Обработано строк : ${stats.totalProcessed}`);
    console.log(`Прошло фильтрацию:   ${stats.totalFiltered}`);
  } catch (error) {
    console.error(`\n[Ошибка выполнения]: ${error.message}`);
    process.exit(1);
  }
}

main();