1// require your node modules

const bot = require("puppeteer");
const fs = require("fs");
const botConfiguration = {
  headless: false,
};
async function getRandomItem(link) {
  let data = await fs.readFileSync(link, "utf-8");
  let processedData = JSON.parse(data);
  let processedDataLength = processedData.length;
  let urlIndex = Math.floor(Math.random() * processedDataLength);
  return processedData[urlIndex];
}
getRandomItem("assets/list-of-links.json");

async function runAdsenseBot() {
  let userAgent = await getRandomItem("assets/list-of-UA.json");
  console.log("we have picked a user agent", userAgent);
  let url = await getRandomItem("assets/list-of-links.json");
  console.log("we have picked a link", url);
  const chromeBrowser = await bot.launch(botConfiguration);

  try {
    const chromeBrowserPage = await chromeBrowser.newPage();
    await chromeBrowserPage.setUserAgent(userAgent);
    await chromeBrowserPage.goto(url);
  } catch (error) {
  } finally {
    setTimeout(function () {
      chromeBrowser.close();
      runAdsenseBot();
    }, 10000);
  }
}

runAdsenseBot();
