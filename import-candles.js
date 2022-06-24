const puppeteer = require("puppeteer");

async function main() {
  utils.totalPerf(true);
  const browser = await puppeteer.launch();
  console.log("✅ Browser launched");
  const page = await browser.newPage();
  console.log("✅ Page launched");
  await page.goto("http://localhost:9000/#/candles/1");
  console.log("✅ Navigated");

  await page.waitForSelector("#app");

  await login(page);

  await importCandles(page);

  initIntervals(page);
}

function initIntervals(page) {
  let counter = 0;
  setInterval(() => {
    console.log(`${counter} seconds...`);
    counter += 10;
  }, 10000);

  setInterval(() => {
    page.screenshot({
      path: `import-candles-${counter}.png`,
      fullPage: true,
    });
  }, 600000);
}

async function importCandles(page) {
  const input = await page.$('#app input[data-cy="candles-symbol"]');
  await input.click({ clickCount: 3 });
  await input.type("BTC-USDT");

  await page.focus('#app input[data-cy="candles-start-date"]');
  await page.keyboard.type(01012020);

  await page.click('#app button[data-cy="start-button"]');
}

async function login(page) {
  await page.type("#password", "test");
  await page.click(
    "#app > section > div > div:nth-child(8) > form > div > button"
  );
}

main();
