const utils = require("../utils.js");

const config = {
  id: 1,
  strategy: "MACD_EMA",
  variants: [
    ...utils.genertateConfigs({
      id: 1,
      strategy: "MACD_EMA",
      symbol: "BTC-USDT",
      timeframe: "1h",
      finishDateMDY: "06-01-2022",
      finishDate: "01062022",
      months: 12,
    }),
    ...utils.genertateConfigs({
      id: 2,
      strategy: "MACD_EMA",
      symbol: "BTC-USDT",
      timeframe: "2h",
      finishDateMDY: "06-01-2022",
      finishDate: "01062022",
      months: 12,
    }),
    ...utils.genertateConfigs({
      id: 3,
      strategy: "MACD_EMA",
      symbol: "BTC-USDT",
      timeframe: "3h",
      finishDateMDY: "06-01-2022",
      finishDate: "01062022",
      months: 12,
    }),
    ...utils.genertateConfigs({
      id: 4,
      strategy: "MACD_EMA",
      symbol: "BTC-USDT",
      timeframe: "4h",
      finishDateMDY: "06-01-2022",
      finishDate: "01062022",
      months: 12,
    }),
    ...utils.genertateConfigs({
      id: 5,
      strategy: "MACD_EMA",
      symbol: "BTC-USDT",
      timeframe: "6h",
      finishDateMDY: "06-01-2022",
      finishDate: "01062022",
      months: 12,
    }),
    ...utils.genertateConfigs({
      id: 6,
      strategy: "MACD_EMA",
      symbol: "BTC-USDT",
      timeframe: "8h",
      finishDateMDY: "06-01-2022",
      finishDate: "01062022",
      months: 12,
    }),
    ...utils.genertateConfigs({
      id: 7,
      strategy: "MACD_EMA",
      symbol: "BTC-USDT",
      timeframe: "12h",
      finishDateMDY: "06-01-2022",
      finishDate: "01062022",
      months: 12,
    }),
    ...utils.genertateConfigs({
      id: 7,
      strategy: "MACD_EMA",
      symbol: "BTC-USDT",
      timeframe: "1D",
      finishDateMDY: "06-01-2022",
      finishDate: "01062022",
      months: 12,
    }),
  ],
};

exports.config = config;
