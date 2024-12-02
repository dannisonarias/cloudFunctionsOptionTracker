# 📊 Options Data Cloud Functions

## 🌟 Overview

This repository contains AWS Lambda functions designed to fetch options data from Yahoo Finance and store it in a Firebase Realtime Database. The project leverages modern JavaScript (ES Modules) and integrates third-party services for efficient financial data retrieval and management.

## 🚀 Functionality

The Lambda function performs two primary tasks:

- **Fetch Options Data**: Retrieves comprehensive options data for a specified stock symbol from Yahoo Finance
- **Save to Database**: Securely stores the retrieved data in a Firebase Realtime Database

## 🛠 Prerequisites

### Required Services

- **AWS Account**: For Lambda function deployment and execution
- **Firebase Project**: Configured with Realtime Database and service account key
- **Yahoo Finance API**: Utilizing the `yahoo-finance2` library for financial data retrieval

## 📂 Project Structure

```
project-root/
│
├── handler.mjs           # Main Lambda handler function
├── yahooFinanceService.mjs  # Yahoo Finance data retrieval service
├── databaseService.mjs   # Firebase database interaction service
└── optionsinvovly-firebase-adminsdk-*.json  # Firebase service account key
```

## 🔐 Environment Variables

Configure the following in your AWS Lambda console:

| Variable                | Description                               |
| ----------------------- | ----------------------------------------- |
| `FIREBASE_DATABASE_URL` | Your Firebase Realtime Database URL       |
| `SYMBOL`                | Stock symbol for data retrieval (testing) |

## 🚢 Deployment Steps

### 1. Prepare Dependencies

```bash
npm install yahoo-finance2 firebase-admin
```

### 2. Create Deployment Package

```bash
zip -r function.zip .
```

### 3. Upload to AWS Lambda

- Navigate to AWS Lambda console
- Upload the `function.zip`

## 🧪 Local Testing

### Prerequisites

- Node.js 18+ installed

### Run Locally

```bash
node handler.mjs
```

#### Test Event Payload

```json
{
  "queryStringParameters": {
    "symbol": "AAPL"
  }
}
```

## 🔍 AWS Console Testing

1. Navigate to Lambda function
2. Go to Test tab
3. Create test event with AAPL symbol payload
4. Verify:
   - Data fetched from Yahoo Finance
   - Data saved to Firebase Realtime Database

## ⚠️ Known Considerations

- **ESM Compatibility**: Requires Node.js 18+ runtime
- **JSON Import**: Use `import` with `{ assert: { type: "json" } }` for service account keys

## 📦 Dependencies

| Library          | Purpose                                |
| ---------------- | -------------------------------------- |
| `yahoo-finance2` | Stock options data retrieval           |
| `firebase-admin` | Firebase Realtime Database interaction |

## 📄 License

[Add your license information here]

## 🤝 Contributing

[Add contribution guidelines if applicable]
#   c l o u d F u n c t i o n s O p t i o n T r a c k e r  
 #   c l o u d F u n c t i o n s O p t i o n T r a c k e r  
 #   c l o u d F u n c t i o n s O p t i o n T r a c k e r  
 