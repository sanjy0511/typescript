export interface Trade {
  buyExchange: string;
  sellExchange: string;
  buyPrice: number;
  sellPrice: number;
  amount: number;
  grossProfit: number;
  fees: number;
  netProfit: number;
  timestamp: string;
}
