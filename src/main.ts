import { CONFIG } from "./config";
import { logProfit } from "./logger";
import { getPrice } from "./pricefeed";
import { executeCost, executeBuy } from "./trade";

const runArbitrage = async () => {
  console.log(`Starting Arbiting bot !`);
  while (true) {
    try {
      const price1 = await getPrice("Source 1");
      const price2 = await getPrice("Source 2");
      const diff = ((price2 - price1) / price1) * 100;
      console.log(`Price Difference: ${diff.toFixed(2)}%`);

      if (diff > CONFIG.profitThreshold * 100) {
        console.log(`Arbitrage Opportunity found`);

        const amount = 1;
        const buy = await executeBuy(price1, amount);
        const sell = await executeCost(price2, amount);

        const profit = sell.revenue - buy.cost;
        logProfit(profit);
      } else {
        console.log(`No Profitable`);
      }
      await new Promise((r) => setTimeout(r, CONFIG.refreshTime));
    } catch (error) {
      console.error(`Error in loop`, error);
    }
  }
};

runArbitrage();
