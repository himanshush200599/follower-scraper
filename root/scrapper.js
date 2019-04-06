const axios = require("axios");
const cheerio = require("cheerio");

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
module.exports = { getHTML, getTwitterFollowers, getInstagramFollowers };
