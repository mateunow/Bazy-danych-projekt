# Booking System API

REST API for booking shared resources such as conference rooms, rooms and coworking desks.
Built as a university databases project.

**Tech stack:** Node.js, Express, MongoDB, Mongoose

## Features

- **CRUD** for users, resources, reservations and logs
- **Transactional booking** (`POST /api/reservations/safe`): checks the user's daily limit and time conflicts
  inside a MongoDB transaction, so overlapping reservations are rejected
- **Aggregation reports**: resource usage statistics and user activity

## API overview

| Resource      | Endpoints                                                     |
|---------------|---------------------------------------------------------------|
| Users         | `GET/POST /api/users`, `GET/PUT/DELETE /api/users/:id`        |
| Resources     | `GET/POST /api/resources`, `GET/PUT/DELETE /api/resources/:id` |
| Reservations  | `GET/POST /api/reservations`, `GET/PUT/DELETE /api/reservations/:id`, `POST /api/reservations/safe` |
| Logs          | `GET/POST /api/logs`, `GET/PUT/DELETE /api/logs/:id`          |
| Reports       | `GET /api/reports/usage`, `GET /api/reports/user-activity`    |

## Getting started

Requirements: Node.js 18+ and a running MongoDB instance.

```bash
cd bazy2_projekt/booking-system-backend
npm install
npm run dev     # or: npm start
```

The API runs at `http://localhost:5000`.

> MongoDB transactions require a replica set. For the `/safe` endpoint, run MongoDB as a
> single-node replica set (e.g. `mongod --replSet rs0`, then `rs.initiate()` in `mongosh`).

### Configuration (optional)

With no configuration, the app connects to `mongodb://127.0.0.1:27017/booking_system` on port `5000`.
To change this, copy the template and fill in the values:

```bash
cp .env.example .env
```

| Variable    | Description               | Default                                     |
|-------------|---------------------------|---------------------------------------------|
| `MONGO_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/booking_system`  |
| `PORT`      | HTTP port                 | `5000`                                      |

`.env` is git-ignored. Keep credentials there, never in the code.

## Project structure

```
bazy2_projekt/
├── booking-system-backend/
│   └── src/
│       ├── config/db.js      # MongoDB connection
│       ├── models/           # Mongoose schemas
│       ├── routes/           # Express routers
│       └── server.js         # App entry point
└── lab4-BD-MongoDB-cw (_sprawozdanie_koncowe.md   # Project report (in Polish)
```

## Authors

- Agnieszka Mirosław
- Mateusz Nowak
