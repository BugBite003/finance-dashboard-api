# Finance Dashboard Backend API

MERN backend for finance dashboard with RBAC (Viewer/Analyst/Admin), transactions CRUD, dashboard aggregates.

## Features
- User registration/login with roles & JWT auth
- Role-based access control middleware
- Transactions CRUD with filters/pagination
- Dashboard summaries: totals, categories, monthly trends
- Joi validation, MongoDB/Mongoose
- Secure (helmet, cors, bcrypt)

## Quick Start

1. **Prerequisites**
   - Node.js 18+
   - MongoDB (local `mongod` or MongoDB Atlas)

2. **Setup**
```bash
cd finance-dashboard-api
npm install
cp .env.example .env
# Edit .env: MONGO_URI, JWT_SECRET
npm run dev
```

3. **API Base URL**
`http://localhost:5000/api`

## Authentication
Register/login to get JWT token. Use `Authorization: Bearer <token>`

### POST /auth/register
```json
{
  \"name\": \"Admin User\",
  \"email\": \"admin@example.com\",
  \"password\": \"password123\",
  \"role\": \"admin\"
}
```

### POST /auth/login
```json
{
  \"email\": \"admin@example.com\",
  \"password\": \"password123\"
}
```

## Endpoints Summary

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST | /auth/register | public | Create user |
| POST | /auth/login | public | Login & get token |
| GET | /users | admin | List users |
| PUT | /users/:id | admin | Update user (role/active) |
| GET | /transactions | viewer+ | List own transactions (?page=?&category=?&type=?&startDate=&endDate=) |
| POST | /transactions | analyst+ | Create transaction |
| PUT | /transactions/:id | analyst+ | Update own |
| DELETE | /transactions/:id | analyst+ | Delete own |
| GET | /dashboard | analyst+ | Summary, categories, monthly |

## Examples (Postman/Postman Collection recommended)

1. Register admin
2. Login → copy token
3. Create transactions as analyst
4. GET /dashboard → see aggregates

## Decisions & Assumptions
- Roles: viewer (read trans), analyst (CRUD trans + dashboard), admin (users + all)
- DB: MongoDB local/Atlas
- No rate limiting/pag for simplicity
- Trends: last 12 months, top 10 categories
- Pagination default 10

## Run in Production
```bash
npm start
```

## Seed Data (optional)
```bash
node seed.js
```

Enjoy your finance dashboard backend!

