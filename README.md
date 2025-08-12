# 🌱 Ecosystem API Layer (Universal Onboarding Engine)

A Node.js + Express backend that provides a **single enrollment endpoint** for syncing new users across multiple partner platforms. Includes:
- API key–protected endpoints
- Validation for email, timestamp, and required fields
- Rule Map storage & editing
- Local JSON transaction logging
- Simulated CRM sync
- Simple Admin Dashboard (React + Tailwind)

---

## 🚀 Features
- **API Key Security** – All protected routes require `x-api-key` header.
- **Payload Validation** – Rejects missing or malformed data with appropriate HTTP status codes.
- **Rule Map Management** – View, update, and patch enrollment mapping.
- **Transaction Logging** – Records every enrollment to `transactions.json`.
- **CRM Sync Simulation** – Logs a simulated POST to MailerLite or another endpoint.
- **Admin Dashboard** – Shows total enrollments, source→destination mapping, and recent transactions.

---

## 📦 Tech Stack
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Frontend:** React + Tailwind CSS (served under `/admin`)
- **Database:** MongoDB
- **Other:** dotenv, nodemon (dev), Postman (testing)

---

## 🔧 Setup Instructions

### 1. Clone the Repo
```sh
git clone https://github.com/akansh2416/candidate-00X-ecosystemapi.git
cd candidate-00X-ecosystemapi
