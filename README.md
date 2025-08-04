# Candidate-007-EcosystemAPI

This project is a submission for the Altree Ventures Web Developer tech assessment. It is an Ecosystem API Layer designed to function as a universal onboarding engine, syncing new users across multiple partner platforms based on a configurable rule map.

## Tech Stack

-   **Runtime**: Node.js (v18+)
-   **Framework**: Express.js
-   **Dependencies**:
    -   `express`: Web server framework
    -   `dotenv`: For managing environment variables
    -   `cors`: To enable Cross-Origin Resource Sharing
-   **Dev Dependencies**:
    -   `nodemon`: For automatic server restarts during development

## Project Structure

The project follows the requested modular structure:

```
.
├── controllers/
│   ├── enrollmentController.js   # Logic for the enrollment endpoint
│   └── mapController.js          # Logic for managing the rule map
├── data/
│   └── ruleMap.json              # Simple file-based storage for the rule map
├── middleware/
│   └── auth.js                   # API key authentication middleware
├── routes/
│   ├── enrollmentRoutes.js       # Defines the /ecosystem-enroll route
│   └── mapRoutes.js              # Defines the /enrollment-map routes
├── utils/
│   ├── storage.js                # Helper functions for reading/writing the JSON map
│   └── validators.js             # Validation functions for email and timestamp
├── .env                          # Stores secret API key and other configs
├── .gitignore                    # Specifies files to ignore for Git
├── index.js                      # Main application entry point
├── package.json                  # Project metadata and dependencies
└── README.md                     # This file
```

---

## Setup and Installation

1.  **Clone the repository** (or create the files locally).

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root of the project. Add your secret API key.

    ```
    # .env
    API_KEY="your_secret_api_key_here"
    ```

    **Important Note on Port Configuration**: By default, the server runs on port `3000`. If this port is already in use on your machine (leading to an `EADDRINUSE` error), you can specify a different port in the `.env` file:

    ```
    # .env
    API_KEY="your_secret_api_key_here"
    PORT=3001
    ```

---

## Running the Application

-   **For production**:
    ```bash
    npm start
    ```

-   **For development (with auto-reload)**:
    ```bash
    npm run dev
    ```

The server will start on the port specified in your `.env` file, or `http://localhost:3000` by default.

---

## API Endpoints and Usage

Here are examples of how to interact with the API.

*(Note: Replace `3000` with your custom port if you have set one.)*

### 1. Ecosystem Enrollment

This endpoint enrolls a user and triggers syncs to downstream systems.

-   **Endpoint**: `POST /api/ecosystem-enroll`
-   **Auth**: API key included in the JSON body.

**Example Request (Mac/Linux/Git Bash)**:

```bash
curl -X POST http://localhost:3000/api/ecosystem-enroll \
-H "Content-Type: application/json" \
-d '{
  "email": "new.user@example.com",
  "source": "EcoWorldBuy",
  "timestamp": "2025-08-04T12:30:00Z",
  "apikey": "your_secret_api_key_here"
}'
```

**Example Request (Windows PowerShell)**:
*PowerShell uses `Invoke-WebRequest` which requires a different syntax. Copy and paste this entire block into PowerShell.*

```powershell
$headers = @{
    "Content-Type" = "application/json"
}

$body = @{
    email     = "new.user@example.com"
    source    = "EcoWorldBuy"
    timestamp = "2025-08-04T12:30:00Z"
    apikey    = "your_secret_api_key_here"
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:3000/api/ecosystem-enroll -Method POST -Headers $headers -Body $body
```

**Success Response (200 OK)**:
The server console will log the simulated POSTs.

```json
{
    "message": "Enrollment processed successfully.",
    "destinations": [
        "LanguageKonnect",
        "TalentKonnect"
    ],
    "status": [
        {
            "platform": "LanguageKonnect",
            "status": "SUCCESS"
        },
        {
            "platform": "TalentKonnect",
            "status": "SUCCESS"
        }
    ]
}
```

### 2. Rule Map Administration

These endpoints allow for viewing and managing the enrollment rule map.

-   **Auth**: `x-api-key` header required for `POST` and `PATCH`.

#### A. Get Current Map

```bash
curl http://localhost:3000/api/enrollment-map
```

#### B. Replace Entire Map (POST)

```bash
curl -X POST http://localhost:3000/api/enrollment-map \
-H "Content-Type: application/json" \
-H "x-api-key: your_secret_api_key_here" \
-d '{
  "NewSource": ["PlatformA", "PlatformB"],
  "PlatformA": ["PlatformB"]
}'
```

#### C. Update/Add to Map (PATCH)

```bash
curl -X PATCH http://localhost:3000/api/enrollment-map \
-H "Content-Type: application/json" \
-H "x-api-key: your_secret_api_key_here" \
-d '{
  "EcoWorldBuy": ["TalentKonnect"],
  "NewSource": ["PlatformC"]
}'
```

## Deployment

This application is ready to be deployed to any service that supports Node.js, such as Render, Vercel, or Railway.

1.  Push the code to a public GitHub repository.
2.  Connect the repository to your chosen hosting service.
3.  Set the environment variables (e.g., `API_KEY`, `PORT`) in the service's dashboard.
4.  The service should automatically detect the `npm start` command to run the application.
