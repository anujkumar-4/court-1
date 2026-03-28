# Judiciary Case Backlog Reduction (MERN)

A full-stack MERN web app to manage and prioritize court case backlogs using a transparent scoring system.

## Tech stack
- **MongoDB + Mongoose** for persistent storage
- **Express + Node.js** for REST API
- **React + Vite** for front-end dashboard

## Features
- Create new court cases with severity, pending days, and people affected.
- Automatically compute a **priority score** and generated summary per case.
- View a sorted priority queue and update case status.
- Dashboard insights: total cases, pending cases, average priority, and hearing schedule recommendation.
- UI styled to match the requested dark judiciary theme.

## Project structure

```
.
├── client/   # React UI
└── server/   # Express API + MongoDB model
```

## Setup

1. Install dependencies from root:
   ```bash
   npm install
   ```
2. Configure environment files:
   ```bash
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   ```
3. Ensure MongoDB is running locally (or set `MONGODB_URI` in `server/.env`).

## Run locally

```bash
npm run dev
```

- Client: `http://localhost:5173`
- API: `http://localhost:5000`

## API endpoints

- `GET /api/health`
- `GET /api/cases`
- `POST /api/cases`
- `PATCH /api/cases/:id/status`
- `GET /api/cases/insights/summary`
