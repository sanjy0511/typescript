export class ExchangeA {
  name = "ExchangeA";
  async getPrices(): Promise<{ bid: number; ask: number }> {
    const base = 100 + Math.sin(Date.now() / 60000) * 0.5;
    const noise = (Math.random() - 0.5) * 0.6;
    const mid = base + noise;

    const spread = 0.08 + Math.random() * 0.12;
    const ask = +(mid + spread / 2).toFixed(4);
    const bid = +(mid - spread / 2).toFixed(4);

    await new Promise((r) => setTimeout(r, 50 + Math.random() * 100));
    return { bid, ask };
  }
  getFeePercent(): number {
    return 0.001;
  }
}
