# Notes App - Cohort 9 MERN Project

A full-stack notes management web application built with Node.js, Express, React, and MongoDB. The application allows authenticated users to create, edit, and delete personal notes, with application-wide logging, exception handling, and automated testing.

Author: Qasim Tanveer (cohort-9-mern-11914-qasim)

## Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Key Features](#key-features)
- [Application Screens](#application-screens)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [API Endpoints](#api-endpoints)

## Project Overview

This project is a full-stack web application that allows users to create, edit, and delete notes. It integrates user authentication so that each user's notes remain private, and it includes application logging, global exception handling, unit testing, and MongoDB for persistence.

The project is part of the Cohort 9 MERN track, developed using feature-branch workflows, with automated code review via CodeRabbit and static analysis via SonarQube/SonarCloud.

## Technology Stack

Backend:
- Node.js
- Express.js
- MongoDB / Mongoose
- Pino (structured logging)
- Mocha and Chai (unit testing)

Frontend:
- React.js
- Jest (unit testing)

Tooling:
- SonarQube / SonarCloud (static code analysis)
- CodeRabbit (automated code review)
- Git (version control)

## Key Features

### User Authentication and Authorization
- Users can sign up, log in, and log out.
- Notes are scoped to individual authenticated users.
- Token-based auth protects private routes.

### Note Management
- Create, edit, and delete notes.
- Rich text editing for note content.

### Application Logging
- Centralized logging using Pino.
- Logs key events, errors, HTTP requests/responses, and user activity.

### Exception Handling
- Global error-handling middleware on the backend.
- Consistent, meaningful error responses returned to the client.
- Exceptions logged via Pino for traceability.

### Database Layer
- MongoDB collections for users, notes, and related data.
- Mongoose schemas for validation and modeling.

### Testing
- Backend unit tests written with Mocha and Chai, covering controllers, services, and data access layers.
- Frontend unit tests written with Jest.

### Code Quality
- SonarQube integration to catch code smells, bugs, and vulnerabilities.
- Rules configured for JavaScript/TypeScript.

### Frontend Application
- React-based responsive UI.
- Dashboard showing notes list, user profile, and related info.

## Application Screens

### 1. Sign Up / Log In
Components:
- Sign-up form
- Log-in form

Operations:
- User registration and authentication
- Redirect to the main application on successful login

### 2. Dashboard (List of Notes)
Components:
- List of the current user's notes
- Button to create a new note

Operations:
- Fetch user-specific notes from the backend
- Display the list of notes
- Navigate to the note editor

### 3. Note Editor
Components:
- Rich text editor
- Save and cancel buttons

Operations:
- Create a new note or edit an existing one
- Save the note to the backend
- Return to the dashboard after saving or canceling

### 4. User Profile
Components:
- Logout button

Operations:
- Log the user out

## Project Structure

```
cohort-9-mern-11914-qasim/
  backend/
    src/
      controllers/
      services/
      routes/
      models/
      middleware/
      config/
      utils/
    tests/
    package.json
  frontend/
    src/
      components/
      pages/
      services/
      hooks/
      App.jsx
    tests/
    package.json
  .coderabbit.yaml
  sonarPrj.properties
  README.md
```

## Getting Started

### Prerequisites
- Node.js
- npm
- MongoDB (Atlas connection)
- Git

### Clone the Repository

```
git clone https://github.com/MuhammadQasimTanveer/cohort-9-mern-11914-qasim.git
cd cohort-9-mern-11914-qasim
```

### Install Dependencies

Backend:
```
cd backend
npm install
```

Frontend:
```
cd frontend
npm install
```

## Environment Variables

Backend `.env`:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/notes_app
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

Frontend `.env`:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Running the Application

Backend:
```
cd backend
npm run dev
```

Frontend:
```
cd frontend
npm run dev
```

Backend runs on `http://localhost:5000`, frontend runs on `http://localhost:5173`.

## Testing

Backend:
```
cd backend
npm test
```

Frontend:
```
cd frontend
npm test
```

## API Endpoints

Auth:
- POST /api/auth/signup - register a new user
- POST /api/auth/login - authenticate a user and issue a token
- POST /api/auth/logout - invalidate the current session/token

Notes:
- GET /api/notes - get all notes for the authenticated user
- GET /api/notes/:id - get a single note by id
- POST /api/notes - create a new note
- PUT /api/notes/:id - update an existing note
- DELETE /api/notes/:id - delete a note
