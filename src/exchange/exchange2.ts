export class ExchangeB {
  name = "ExchangeB";

  async getPrices(): Promise<{ bid: number; ask: number }> {
    const base = 100 + Math.cos(Date.now() / 75000) * 0.7;
    const noise = (Math.random() - 0.5) * 0.9;
    const mid = base + noise;

    const spread = 0.06 + Math.random() * 0.16;
    const ask = +(mid + spread / 2).toFixed(4);
    const bid = +(mid - spread / 2).toFixed(4);

    await new Promise((r) => setTimeout(r, 50 + Math.random() * 120));
    return { bid, ask };
  }
  getFeePercent(): number {
    return 0.0012;
  }
}
