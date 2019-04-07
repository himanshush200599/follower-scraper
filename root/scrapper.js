const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./db");
async function getHTML(url) {
  const { data: html } = await axios.get(url);
  return html;
}

async function getTwitterFollowers(html) {
  const $ = cheerio.load(html);
  const span = $('[data-nav="followers"] .ProfileNav-value');
  return span.data("count");
}

async function getInstagramFollowers(html) {
  const $ = cheerio.load(html);
  const dataObj = $('script[type="application/ld+json"]').html();
  const user = JSON.parse(dataObj);

  const realData = parseInt(
    user.mainEntityofPage.interactionStatistic.userInteractionCount
  );
  return realData;
}

async function getInstagramCount() {
  const html = await getHTML("https://instagram.com/aws_javascript");
  const instagramCount = await getInstagramFollowers(html);
  return instagramCount;
}
async function getTwitterCount() {
  const html = await getHTML("https://twitter.com/narendramodi");
  const twitterCount = await getTwitterFollowers(html);
  return twitterCount;
}

async function runCron() {
  console.log("Scraping..");
  const [iCount, tCount] = await Promise.all([
    getInstagramCount(),
    getTwitterCount()
  ]);
  console.log(iCount, tCount);
  db.get("twitter")
    .push({
      date: Date.now(),
      count: tCount
    })
    .write();
  db.get("instagram")
    .push({
      date: Date.now(),
      count: iCount
    })
    .write();
  console.log("Done...");
}

module.exports = {
  getTwitterCount,
  getInstagramCount,
  runCron
};
