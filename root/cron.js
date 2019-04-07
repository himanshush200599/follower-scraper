const cron = require("node-cron");
const { runCron } = require("./scrapper");
console.log(runCron);
cron.schedule("* * * * *", () => {
  console.log("Running Clon");
  runCron();
});
