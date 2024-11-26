import admin from "firebase-admin"; // Import the entire module

let db; // Firebase Database reference

// Initialize Firebase app (if not already initialized)
if (!admin.apps.length) {
  const serviceAccount = await import(
    "./optionsinvovly-firebase-adminsdk-lmmi4-af79a8f6bf.json",
    { assert: { type: "json" } }
  );
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount.default),
    databaseURL: "https://optionsinvovly-default-rtdb.firebaseio.com",
  });
  db = admin.database();
} else {
  db = admin.database(admin.apps[0]);
}

export async function saveToDatabase(symbol, expirationDate, timestamp, data) {
  try {
    const reference = db.ref(
      `optionsData/${symbol}/${expirationDate}/${timestamp}`
    );

    // Save the data directly to the specified path
    await reference.set(data);

    console.log("Data saved to the database successfully.");
  } catch (error) {
    console.error("Error saving to database:", error);
    throw new Error("Error saving data to the database");
  }
}
