const utils = require("../utils.js");

const config = {
  id: 2,
  strategy: "DualThrust",
  variants: [
    ...utils.genertateConfigs({
      id: 1,
      strategy: "DualThrust",
      symbol: "BTC-USDT",
      timeframe: "1h",
      extraTimeframe: "4h",
      finishDateMDY: "06-01-2022",
      finishDate: "01062022",
      months: 18,
    }),
    ...utils.genertateConfigs({
      id: 2,
      strategy: "DualThrust",
      symbol: "BTC-USDT",
      timeframe: "2h",
      extraTimeframe: "6h",
      finishDateMDY: "06-01-2022",
      finishDate: "01062022",
      months: 18,
    }),
    ...utils.genertateConfigs({
      id: 3,
      strategy: "DualThrust",
      symbol: "BTC-USDT",
      timeframe: "3h",
      extraTimeframe: "1D",
      finishDateMDY: "06-01-2022",
      finishDate: "01062022",
      months: 18,
    }),
    ...utils.genertateConfigs({
      id: 4,
      strategy: "DualThrust",
      symbol: "BTC-USDT",
      timeframe: "4h",
      extraTimeframe: "1D",
      finishDateMDY: "06-01-2022",
      finishDate: "01062022",
      months: 18,
    }),
    ...utils.genertateConfigs({
      id: 5,
      strategy: "DualThrust",
      symbol: "BTC-USDT",
      timeframe: "6h",
      extraTimeframe: "1D",
      finishDateMDY: "06-01-2022",
      finishDate: "01062022",
      months: 12,
    }),
    ...utils.genertateConfigs({
      id: 6,
      strategy: "DualThrust",
      symbol: "BTC-USDT",
      timeframe: "8h",
      extraTimeframe: "1D",
      finishDateMDY: "06-01-2022",
      finishDate: "01062022",
      months: 12,
    }),
  ],
};

exports.config = config;