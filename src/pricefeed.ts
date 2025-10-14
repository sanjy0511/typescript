// Simulate fetching price from two fake APIs
export const getPrice = async (source: string): Promise<number> => {
  try {
    // Simulate random price fluctuation
    const price = 100 + Math.random() * 10;
    console.log(`[${source}] Current Price: $${price.toFixed(2)}`);
    return price;
  } catch (err) {
    console.error(`Error fetching from ${source}:`, err);
    return 0;
  }
};
