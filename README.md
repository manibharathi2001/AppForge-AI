# AppForge-AI

AppForge-AI is an AI-powered web app builder that lets users sign in, create projects, describe the app they want to build, and generate a usable web app codebase with Gemini-powered assistance.

The project is split into two deployable parts:

- Frontend: React + Vite single-page app
- Backend: Express + MongoDB + JWT auth + Gemini API integration

## Live Demo

- Frontend (Vercel): https://app-forge-ai-8ix4-l4lyyxax8-manibharathi2001s-projects.vercel.app/
- Backend (Render): https://appforge-ai-server.onrender.com

## Features

- User authentication with email/password
- Project creation and dashboard management
- AI prompt-driven web app generation
- Generated code preview in the builder UI
- Download generated HTML/JS code
- Protected routes for authenticated project workflows
- Environment-based deployment configuration for Vercel and Render

## Tech Stack

### Frontend
- React 19
- Vite
- React Router
- Axios
- js-cookie

### Backend
- Node.js
- Express 5
- MongoDB with Mongoose
- JWT authentication
- Google Gemini API via @google/genai
- CORS and dotenv support

## Project Structure

```text
AppForge-AI/
├── client/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
├── server/
│   ├── src/
│   ├── package.json
│   └── .env.example
├── package.json
├── render.yaml
└── README.md
```

## Prerequisites

Before running the app locally, make sure you have:

- Node.js 18+ recommended
- npm
- MongoDB instance (local or Atlas)
- Gemini API key from Google AI Studio

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/manibharathi2001/AppForge-AI.git
cd AppForge-AI
```

### 2. Install backend dependencies

```bash
npm install
npm run install:server
```

### 3. Configure environment variables

Create a `.env` file inside the `server` folder using the example file:

```bash
cp server/.env.example server/.env
```

Then fill in the values:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:5173
```

For the frontend, create the environment file:

```bash
cp client/.env.example client/.env
```

Set the client API URL:

```env
VITE_API_URL=http://localhost:5000/api
```

## Run Locally

### Start the backend

```bash
npm run start:server
```

### Start the frontend

```bash
cd client
npm install
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

The backend API will run on:

```text
http://localhost:5000
```

## Authentication Flow

The app supports:

- Register
- Login
- Fetch authenticated user profile
- Logout

Protected routes are enforced in the backend using JWT middleware and in the frontend using route protection.

## API Overview

### Auth Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`

### Project Routes

- `GET /api/projects`
- `POST /api/projects`
- `GET /api/projects/:id`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`

### Generation Routes

- `POST /api/generate/:projectId`

## Deployment Guide

### Render Deployment

The repository includes a `render.yaml` file for backend deployment.

Recommended Render environment variables:

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=https://your-vercel-app.vercel.app
```

### Vercel Deployment

Deploy the `client` folder as a Vite app.

Recommended Vercel environment variable:

```env
VITE_API_URL=https://your-render-backend.onrender.com/api
```

## Important Deployment Notes

- `CLIENT_URL` on Render must match the deployed Vercel frontend domain exactly.
- Do not add a trailing slash to the frontend origin.
- Keep secrets in environment variables and never commit `.env` files.
- The frontend should use the deployed backend URL rather than `localhost` in production.

## Security Notes

- JWT secrets should be strong and unique.
- MongoDB credentials should never be committed to source control.
- Production credentials should be configured through Render/Vercel environment settings.
- `.env` files are excluded from source control.

## Contributing

Contributions are welcome.

If you want to contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run the relevant tests or local validation
5. Open a pull request with a clear explanation

## License

This project is currently distributed under the repository’s default license configuration. Please check the repository for the exact license details before production usage or redistribution.

## Support

If you are facing deployment or setup issues, verify these first:

- environment variables are correctly configured
- backend service is running and reachable
- frontend `VITE_API_URL` points to the deployed backend API
- CORS origin is configured for the Vercel domain

## Summary

AppForge-AI is designed to help people move from a prompt to a working web app idea using AI-generated code and a clean, guided workflow. It is structured for easy local development and clean production deployment across Vercel and Render.
