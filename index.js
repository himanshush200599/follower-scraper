const express = require("express");

const {
  getHTML,
  getTwitterCount,
  getInstagramCount
} = require("./root/scrapper");

const db = require("./root/db");
require("./root/cron");
const app = express();
app.get("/scrape", async (req, res, next) => {
  console.log("Scraping..");
  const [iCount, tCount] = await Promise.all([
    getInstagramCount(),
    getTwitterCount()
  ]);
  console.log(iCount, tCount);

  res.json({
    iCount,
    tCount
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
