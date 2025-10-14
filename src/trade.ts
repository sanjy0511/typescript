export const executeBuy = async (price: number, amount: number) => {
  console.log(`Buying ${amount} tokens at $${price.toFixed(2)}...`);
  await new Promise((r) => setTimeout(r, 1000));
  return { tx: "BUY_SUCESS", cost: amount * price };
};
export const executeCost = async (price: number, amount: number) => {
  console.log(`Selling ${amount} tokens at $${price.toFixed(2)}...`);
  await new Promise((r) => setTimeout(r, 1000));
  return { tx: "SELL_SUCESS", revenue: amount * price };
};
