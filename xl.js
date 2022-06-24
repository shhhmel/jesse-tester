const xl = require("excel4node");

function initWorkbook() {
  const wb = new xl.Workbook();

  const options = {
    margins: {
      left: 1.5,
      right: 1.5,
    },
  };

  return wb;
}

function addWorkSheet(wb, sheetname) {
  const options = {
    margins: {
      left: 1.5,
      right: 1.5,
    },
  };

  return wb.addWorksheet(sheetname, options);
}

function writeWorkSheetHeader(ws, variant, startRow) {
  ws.cell(startRow, 1).string(variant.timeframe);
  ws.cell(startRow, 2).string(variant.symbol);
  startRow = startRow + 2;
  ws.cell(startRow, 1).string("Period");
  ws.cell(startRow, 2).string("Starting Date");
  ws.cell(startRow, 3).string("Ending Date");
  ws.cell(startRow, 4).string("Total Net profit in USD");
  ws.cell(startRow, 5).string("Total Net profit in %");
  ws.cell(startRow, 6).string("Annual Return");
  ws.cell(startRow, 7).string("Win Rate");
  ws.cell(startRow, 8).string("Leverage");
}

function writeResults(ws, results, startRow, wb) {
  ws.cell(startRow, 1).string(results.period);
  ws.cell(startRow, 2).string(results.startingDate);
  ws.cell(startRow, 3).string(results.endingDate);
  ws.cell(startRow, 4).string(
    replaceDotAndPercent(results.totalNetProfitInUSD)
  );
  ws.cell(startRow, 5).string(
    replaceDotAndPercent(results.totalNetProfitInPercents)
  );
  ws.cell(startRow, 6).string(replaceDotAndPercent(results.annualReturn));
  ws.cell(startRow, 7).string(replaceDotAndPercent(results.winRate));
  ws.cell(startRow, 8).string(results.leverage);

  wb.write("results.xlsx");
}

function replaceDotAndPercent(string) {
  return string.split(".").join(",").split("%").join("");
}

exports.initWorkbook = initWorkbook;
exports.addWorkSheet = addWorkSheet;
exports.writeWorkSheetHeader = writeWorkSheetHeader;
exports.writeResults = writeResults;
