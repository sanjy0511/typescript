import { ArbitrageService } from "./service/ArbitrageService";
import { Logger } from "./utils/logger";

async function main() {
  Logger.info(`Arbitrage bot simulation starting...`);
  const amountPerTrade = 1;
  const minNetProfit = 0.02;
  const service = new ArbitrageService(amountPerTrade, minNetProfit);

  const intervalms = 3000;
  Logger.info(
    `Running scan every ${intervalms}ms. Amount per trade ${amountPerTrade} , Minimum net Profit ${minNetProfit}`
  );

  await service.checkOnce();

  const timer = setInterval(async () => {
    try {
      await service.checkOnce();
    } catch (err) {
      Logger.error("Error durning checkonce:" + (err as Error).message);
    }
  }, intervalms);
  process.on("SIGINT", () => {
    Logger.info("Graceful shutdown requested (SIGINT).");
    clearInterval(timer);
    process.exit(0);
  });
  process.on("SIGTERM", () => {
    Logger.info("Graceful shutdown requested (SIGTERM).");
    clearInterval(timer);
    process.exit(0);
  });
}

main().catch((e) => {
  Logger.error("Fatal error: " + (e as Error).message);
  process.exit(1);
});
