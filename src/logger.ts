export const logProfit = (profit: number) => {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] Profit earned: $${profit.toFixed(2)}...`);
};
