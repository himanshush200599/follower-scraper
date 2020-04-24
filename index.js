const express = require("express");
const cors = require("cors");

const {
  getHTML,
  getTwitterCount,
  getInstagramCount
} = require("./root/scrapper");

const db = require("./root/db");
require("./root/cron");
const app = express();
app.use(cors());

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

app.get("/data", async (req, res, next) => {
  const twitter = db.value();
  res.json(twitter);
});

app.listen(5000, () => {
  console.log("Server is running on port http://localhost:5000 and client on 3000");
});
