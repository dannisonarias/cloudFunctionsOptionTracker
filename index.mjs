import { getOptionsData } from "./yahooFinanceService.mjs"; // Function to fetch data from Yahoo Finance
import { saveToDatabase } from "./databaseService.mjs"; // Function to save data to the database

export async function handler(event) {
  try {
    const { symbol, expirationDate } = event.queryStringParameters; // Expecting expirationDate in "YYYY-MM-DD" format

    if (!symbol) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Symbol parameter is required." }),
      };
    }

    let optionsData;
    if (event.testMode) {
      console.log("Test mode active: Using fake options data.");
      optionsData = event.fakeOptionsData;
    } else {
      let parsedExpirationDate = undefined;
      if (expirationDate) {
        parsedExpirationDate = new Date(expirationDate);
        if (isNaN(parsedExpirationDate.getTime())) {
          console.error(`Invalid expiration date format: ${expirationDate}`);
          parsedExpirationDate = undefined;
        }
      }

      optionsData = await getOptionsData(symbol, parsedExpirationDate);
    }

    if (!optionsData || optionsData.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: "No options data found for the provided symbol.",
        }),
      };
    }

    const timestamp = new Date().toISOString();
    const sortableTimestamp = timestamp.replace(/[^0-9]/g, "").substring(0, 17); // Consistent length YYYYMMDDHHMMSSSSS

    console.log("Sortable Timestamp:", sortableTimestamp);

    // Prepare data for saving
    const formattedData = {
      calls: optionsData[0].calls,
      expirationDate,
      asMiniOptions: optionsData[0].asMiniOptions || false,
      puts: optionsData[0].puts,
    };

    // Save the data in the structured format
    await saveToDatabase(
      symbol,
      expirationDate,
      sortableTimestamp,
      formattedData
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Data processed and saved successfully.",
      }),
    };
  } catch (error) {
    console.error("Error processing request:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error." }),
    };
  }
}
