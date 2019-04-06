const {
  getTwitterFollowers,
  getHTML,
  getInstagramFollowers
} = require("./root/scrapper");

async function functionReady() {
  const usernametw = "narendramodi";
  const igusername = "aws_javascript";
  const html = await getHTML(`https://twitter.com/${usernametw}`);
  const html1 = await getHTML(`https://instagram.com/${igusername}`);
  const follCount = await getTwitterFollowers(html);
  const igCount = await getInstagramFollowers(html1);
  console.log(`${usernametw} have ${follCount} twitter followers`);
  console.log(`${igusername} have ${igCount} Instagram followers`);
}
functionReady();
