function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return seconds == 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

// Month-Day-Year "06-01-2022"
function extractMonth(finishDate, monthsToExtract) {
  const d = new Date(finishDate);
  d.setMonth(d.getMonth() - monthsToExtract);
  return d.toLocaleDateString().split("/").join("");
}

let startPeriodDate;
function periodPerf(start) {
  if (start) {
    startPeriodDate = +new Date();
  } else {
    const endPeriodDate = +new Date();
    console.log(
      "⏱️ ~ Period: ",
      millisToMinutesAndSeconds(endPeriodDate - startPeriodDate)
    );
  }
}

let startVariantDate;
function variantPerf(start) {
  if (start) {
    startVariantDate = +new Date();
  } else {
    const endVariantDate = +new Date();
    console.log(
      "⏱️ ~ Variant: ",
      millisToMinutesAndSeconds(endVariantDate - startVariantDate)
    );
  }
}

let startStrategyDate;
function strategyPerf(start) {
  if (start) {
    startStrategyDate = +new Date();
  } else {
    const endStrategyDate = +new Date();
    console.log(
      "⏱️ ~ Strategy: ",
      millisToMinutesAndSeconds(endStrategyDate - startStrategyDate)
    );
  }
}

let startTotalDate;
function totalPerf(start) {
  if (start) {
    startTotalDate = +new Date();
  } else {
    const endTotalDate = +new Date();
    console.log(
      "⏱️ ~ Total: ",
      millisToMinutesAndSeconds(endTotalDate - startTotalDate)
    );
  }
}

function genertateConfigs(config) {
  // 1, 6, 11, 16, 21, 26
  let start = 1;
  return Array.from(Array(6)).map(() => {
    const day = start < 10 ? "0" + String(start) : String(start);
    start = start + 5;
    return {
      ...config,
      finishDateMDY: `06-${day}-2022`,
      finishDate: `${day}062022`,
    };
  });
}

exports.millisToMinutesAndSeconds = millisToMinutesAndSeconds;
exports.extractMonth = extractMonth;
exports.periodPerf = periodPerf;
exports.variantPerf = variantPerf;
exports.strategyPerf = strategyPerf;
exports.totalPerf = totalPerf;
exports.genertateConfigs = genertateConfigs;
