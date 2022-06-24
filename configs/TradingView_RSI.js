const utils = require("../utils.js");

const config = {
  id: 1,
  strategy: "TradingView_RSI",
  variants: [
    ...utils.genertateConfigs({
      id: 1,
      strategy: "TradingView_RSI",
      symbol: "BTC-USDT",
      timeframe: "1h",
      finishDateMDY: "06-01-2022",
      finishDate: "01062022",
      months: 12,
    }),
    ...utils.genertateConfigs({
      id: 2,
      strategy: "TradingView_RSI",
      symbol: "BTC-USDT",
      timeframe: "2h",
      finishDateMDY: "06-01-2022",
      finishDate: "01062022",
      months: 12,
    }),
    ...utils.genertateConfigs({
      id: 3,
      strategy: "TradingView_RSI",
      symbol: "BTC-USDT",
      timeframe: "3h",
      finishDateMDY: "06-01-2022",
      finishDate: "01062022",
      months: 12,
    }),
    ...utils.genertateConfigs({
      id: 4,
      strategy: "TradingView_RSI",
      symbol: "BTC-USDT",
      timeframe: "4h",
      finishDateMDY: "06-01-2022",
      finishDate: "01062022",
      months: 12,
    }),
    ...utils.genertateConfigs({
      id: 5,
      strategy: "TradingView_RSI",
      symbol: "BTC-USDT",
      timeframe: "6h",
      finishDateMDY: "06-01-2022",
      finishDate: "01062022",
      months: 12,
    }),
    ...utils.genertateConfigs({
      id: 6,
      strategy: "TradingView_RSI",
      symbol: "BTC-USDT",
      timeframe: "8h",
      finishDateMDY: "06-01-2022",
      finishDate: "01062022",
      months: 12,
    }),
    ...utils.genertateConfigs({
      id: 7,
      strategy: "TradingView_RSI",
      symbol: "BTC-USDT",
      timeframe: "12h",
      finishDateMDY: "06-01-2022",
      finishDate: "01062022",
      months: 12,
    }),
    ...utils.genertateConfigs({
      id: 7,
      strategy: "TradingView_RSI",
      symbol: "BTC-USDT",
      timeframe: "1D",
      finishDateMDY: "06-01-2022",
      finishDate: "01062022",
      months: 12,
    }),
  ],
};

exports.config = config;