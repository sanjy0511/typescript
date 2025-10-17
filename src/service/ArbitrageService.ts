import { ExchangeA } from "../exchange/exchange1";
import { ExchangeB } from "../exchange/exchange2";
import { Trade } from "../models/trade";
import { Logger } from "../utils/logger";

export class ArbitrageService {
  private exchangeA: ExchangeA;
  private exchangeB: ExchangeB;
  private amountPerTrade: number;
  private minNetProfit: number;

  constructor(amountPerTrade = 1, minNetProfit = 0.01) {
    this.exchangeA = new ExchangeA();
    this.exchangeB = new ExchangeB();
    this.amountPerTrade = amountPerTrade;
    this.minNetProfit = minNetProfit;
  }

  private computeFees(
    buyFeePct: number,
    sellFeePct: number,
    buyPrice: number,
    sellPrice: number,
    amount: number
  ): number {
    const buyFee = buyPrice * amount * buyFeePct;
    const sellFee = sellPrice * amount * sellFeePct;
    return +(buyFee + sellFee).toFixed(8);
  }

  async checkOnce(): Promise<Trade[] | null> {
    const [pA, pB] = await Promise.all([
      this.exchangeA.getPrices(),
      this.exchangeB.getPrices(),
    ]);

    const opportunities: Trade[] = [];
    const buyPriceA = pA.ask;
    const sellPriceB = pB.bid;
    const grossAtoB = +((sellPriceB - buyPriceA) * this.amountPerTrade).toFixed(
      8
    );
    const feesAtoB = this.computeFees(
      this.exchangeA.getFeePercent(),
      this.exchangeB.getFeePercent(),
      buyPriceA,
      sellPriceB,
      this.amountPerTrade
    );
    const netAtoB = +(grossAtoB - feesAtoB).toFixed(8);

    if (netAtoB >= this.minNetProfit) {
      opportunities.push({
        buyExchange: this.exchangeA.name,
        sellExchange: this.exchangeB.name,
        buyPrice: buyPriceA,
        sellPrice: sellPriceB,
        amount: this.amountPerTrade,
        grossProfit: grossAtoB,
        fees: feesAtoB,
        netProfit: netAtoB,
        timestamp: new Date().toISOString(),
      });
    }

    Logger.info(
      `Price ${this.exchangeA.name} ask ${pA.ask}, bid ${pA.bid} | ${this.exchangeB.name} ask ${pB.ask}, bid ${pB.bid}`
    );

    if (opportunities.length > 0) {
      for (const opp of opportunities) {
        Logger.info(
          `Profitable trade found: BUY ${opp.amount} @ ${opp.buyPrice} on ${opp.buyExchange}, SELL @ ${opp.sellPrice} on ${opp.sellExchange} => netProfit ${opp.netProfit}`
        );
      }
      return opportunities;
    }
    return null;
  }
}
