const puppeteer = require("puppeteer");
const utils = require("./utils.js");
const xl = require("./xl.js");

const SMACrossoverConfig = require("./configs/SMACrossover").config;
const DualThrustConfig = require("./configs/DualThrust").config;

let xlWorkBook;
let startRow;

const testsConfig = [DualThrustConfig];

async function main() {
  utils.totalPerf(true);
  xlWorkBook = xl.initWorkbook();

  const browser = await puppeteer.launch({ defaultViewport: null });
  console.log("✅ Browser launched");
  const page = await browser.newPage();
  page.setDefaultTimeout(60000);
  console.log("✅ Page launched");
  await page.goto("http://localhost:9000/#/backtest/1");
  console.log("✅ Navigated");

  await page.waitForSelector("#app");

  await login(page);

  await configureTests(page);

  await browser.close();

  for (const strategy of testsConfig) {
    utils.strategyPerf(true);
    const xlWorkSheet = xl.addWorkSheet(xlWorkBook, strategy.strategy);
    startRow = 1;

    for (const variant of strategy.variants) {
      utils.variantPerf(true);
      startRow = startRow + 2;
      xl.writeWorkSheetHeader(xlWorkSheet, variant, startRow);
      startRow = startRow + 3;

      for (let index = 1; index <= variant.months; index++) {
        utils.periodPerf(true);
        const startDate = utils.extractMonth(variant.finishDateMDY, index);
        const formatedVariant = getFormatedVariant(variant, startDate);
        await runTest(page, formatedVariant, xlWorkSheet);
        utils.periodPerf();
      }

      utils.variantPerf();
    }
    utils.strategyPerf();
  }

  xlWorkBook.write("results.xlsx");
  utils.totalPerf();
  await browser.close();
}

async function configureTests(page) {
  const openMobileMenuButtonSelector = "#headlessui-disclosure-button-1";
  await page
    .waitForSelector(openMobileMenuButtonSelector)
    .catch(async (err) => {
      await page.screenshot({
        path: `errors/settings.png`,
        fullPage: true,
      });

      throw new Error(err);
    });
  await page.click(openMobileMenuButtonSelector);

  // await page.click('#app nav button[data-cy="settings-icon"]');
  // await page.click(
  //   'div[data-cy="backtest-setting-exchange-binance-perpetual-futures"] div[data-cy="futures_leverage_mode-radio-groups"] #headlessui-radiogroup-option-589'
  // );

  await page.screenshot({
    path: `settings.png`,
    fullPage: true,
  });
}

function getFormatedVariant(variant, startDate) {
  return {
    ...variant,
    finishDate: variant.finishDate.split("-").join(""),
    startDate,
  };
}

async function runTest(page, config, xlWorkSheet) {
  await configureTest(page, config);

  await startTest(page);

  let tBodySelector = "#app table > tbody";

  if (config.extraTimeframe) {
    tBodySelector =
      '#app section[aria-labelledby="section-1-title"] > div > div:nth-child(2) > div > div:nth-child(8) tbody';
  }

  console.log(" ");
  console.log(" ");
  console.log("🚀 ~ Test in progress...");
  console.log("Strategy: ", config.strategy);
  console.log("Timeframe: ", config.timeframe);
  console.log("Start Date: ", config.startDate);
  console.log("Finish Date: ", config.finishDate);
  console.log(" ");

  const totalNetProfitSelector = `${tBodySelector} > tr:nth-child(2) > td:nth-child(2)`;
  const totalNetProfitValue = await getResultValue(
    page,
    totalNetProfitSelector,
    config
  );
  console.log("totalNetProfitValue", totalNetProfitValue);
  if (!totalNetProfitValue) {
    await clickCancel(page, config);
    return;
  }

  const totalNetProfitInUSD = totalNetProfitValue.split(" (")[0];
  const secondChunk = totalNetProfitValue.split(" (")[1];

  const totalNetProfitInPercents = secondChunk.substring(
    0,
    secondChunk.length - 2
  );

  console.log("totalNetProfitInUSD", totalNetProfitInUSD);
  console.log("totalNetProfitInPercents", totalNetProfitInPercents);

  const annualReturnSelector = `${tBodySelector} > tr:nth-child(7) > td:nth-child(2)`;
  const annualReturn = await getResultValue(page, annualReturnSelector, config);
  console.log("annualReturn", annualReturn);
  if (!annualReturn) {
    await clickCancel(page, config);
    return;
  }

  const winRateSelector = `${tBodySelector} > tr:nth-child(11) > td:nth-child(2)`;
  const winRate = await getResultValue(page, winRateSelector, config);
  console.log("winRate", winRate);
  if (!winRate) {
    await clickCancel(page, config);
    return;
  }

  const periodSelector = `#app dl > div:nth-child(1) > div:nth-child(2)`;
  const period = await getResultValue(page, periodSelector, config);
  console.log("period", period);
  if (!period) {
    await clickCancel(page, config);
    return;
  }

  const startingDateSelector = `#app dl > div:nth-child(2) > div:nth-child(2)`;
  const startingDate = await getResultValue(page, startingDateSelector, config);
  console.log("startingDate", startingDate);
  if (!startingDate) {
    await clickCancel(page, config);
    return;
  }

  const endingDateSelector = `#app dl > div:nth-child(3) > div:nth-child(2)`;
  const endingDate = await getResultValue(page, endingDateSelector, config);
  console.log("endingDate", endingDate);
  if (!endingDate) {
    await clickCancel(page, config);
    return;
  }

  const leverageSelector = `#app dl > div:nth-child(5) > div:nth-child(2)`;
  const leverage = await getResultValue(page, leverageSelector, config);
  console.log("leverage", leverage);
  if (!leverage) {
    await clickCancel(page, config);
    return;
  }
  console.log(" ");

  const results = {
    totalNetProfitInUSD,
    totalNetProfitInPercents,
    annualReturn,
    winRate,
    period,
    startingDate,
    endingDate,
    leverage,
  };

  xl.writeResults(xlWorkSheet, results, startRow, xlWorkBook);
  startRow++;

  // await page.screenshot({
  //   path: `reports/screenshots/${config.strategy}_${config.symbol}_${config.timeframe}_${fromToDates}.png`,
  //   fullPage: true,
  // });

  await returnToNewSessionScreen(page, config);
}

async function clickCancel(page, config) {
  const cancelButtonSelector = `#app button[data-cy="backtest-cancel-button"]`;
  await page.waitForSelector(cancelButtonSelector).catch(async () => {
    await returnToNewSessionScreen(page, config);
  });
  await page.click(cancelButtonSelector);
}

async function returnToNewSessionScreen(page, config) {
  const newSessionButtonSelector = `#app section[aria-labelledby="section-2-title"] > div > div > button:nth-child(2)`;
  await page.waitForSelector(newSessionButtonSelector).catch(async () => {
    await page.screenshot({
      path: `errors/2_${config.strategy}_${config.symbol}_${config.timeframe}_${config.finishDate}_${config.startDate}.png`,
      fullPage: true,
    });
  });
  await page.click(newSessionButtonSelector);
}

async function getResultValue(page, selector, config) {
  return page
    .waitForSelector(selector)
    .then(async () => {
      let el = await page.$(selector);
      return page.evaluate((el) => el.textContent, el);
    })
    .catch(async () => {
      await page.screenshot({
        path: `errors/3_${config.strategy}_${config.symbol}_${config.timeframe}_${config.finishDate}_${config.startDate}.png`,
        fullPage: true,
      });

      return;
    });
}

async function configureTest(page, config) {
  const tradingRouteSymbolSelector = `#app input[data-cy="trading-route-symbol0"]`;
  await page.waitForSelector(tradingRouteSymbolSelector);

  const input = await page.$(tradingRouteSymbolSelector);
  await input.click({ clickCount: 3 });
  await input.type(config.symbol);

  const tradingRouteTimeframeSelector = `#app select[data-cy="trading-route-timeframe0"]`;
  await page.select(tradingRouteTimeframeSelector, config.timeframe);

  const tradingRouteStrategySelector = `#app select[data-cy="trading-route-strategy0"]`;
  await page.select(tradingRouteStrategySelector, config.strategy);

  const startDateInputSelector = `#app #start_date`;
  await page.focus(startDateInputSelector);
  //  Type START day, month and year
  await page.keyboard.type(config.startDate);

  const finishDateInputSelector = `#app #finish_date`;
  await page.focus(finishDateInputSelector);
  //  Type FINISH day, month and year
  await page.keyboard.type(config.finishDate);

  if (config.extraTimeframe) {
    const extraRouteSymbolSelector = `#app input[data-cy="extra-route-symbol0"]`;
    if ((await page.$(extraRouteSymbolSelector)) === null) {
      // add-extra-route
      const addExtraRouteSelector = `#app button[data-cy="add-extra-route"]`;
      await page.click(addExtraRouteSelector);
    }

    const input = await page.$(extraRouteSymbolSelector);
    await input.click({ clickCount: 3 });
    await input.type(config.symbol);

    const extraRouteTimeframeSelector = `#app select[data-cy="extra-route-timeframe0"]`;
    await page.select(extraRouteTimeframeSelector, config.extraTimeframe);
  }
}

async function startTest(page) {
  const startButtonSelector = `#app button[data-cy="start-button"]`;
  await page.click(startButtonSelector);
}

async function login(page) {
  await page.type("#password", "test");
  await page.click(
    "#app > section > div > div:nth-child(8) > form > div > button"
  );
}

main();
