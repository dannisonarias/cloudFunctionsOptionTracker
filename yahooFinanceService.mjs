import yahooFinance from "yahoo-finance2"; // Import Yahoo Finance module

export async function getOptionsData(symbol, expirationDate) {
  try {
    // Prepare queryOptions with expirationDate if provided
    const queryOptions = {
      lang: "en-US",
      formatted: false,
      region: "US",
    };

    // If expirationDate is provided, add it to the query options
    if (expirationDate) {
      queryOptions.date = new Date(expirationDate); // This converts the string to a Date object
    }

    // Fetch the complete options data for the given symbol with the provided query options
    const result = await yahooFinance.options(symbol, queryOptions);

    // Return the options data if available
    return result?.options || [];
  } catch (error) {
    console.error(`Error fetching options data for ${symbol}:`, error);
    throw new Error("Error fetching data from Yahoo Finance");
  }
}
