# Log Entry Manager

A full-stack web application for managing log entries with user names, event descriptions, dates, and locations.

## Tech Stack

- Frontend: React with TypeScript
- Backend: Node.js with TypeScript
- Database: SQLite with Prisma
- Testing: Jest

## Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

## Getting Started

1. Install dependencies:
   ```bash
   # Install root dependencies
   npm install
   
   # Install server dependencies
   cd server
   npm install
   
   # Install UI dependencies
   cd ../ui
   npm install
   ```

2. Set up the database with Prisma:
   ```bash
   cd server
   
   # Initialize Prisma (if not already initialized)
   npm run prisma:init
   
   # Generate Prisma client
   npm run prisma:generate
   
   # Create and apply migrations
   npm run prisma:migrate
   ```

3. Start the application:
   ```bash
   # Start the server
   cd server
   npm run dev
   
   # In a new terminal, start the UI
   cd ui
   npm start
   ```

The frontend will be available at http://localhost:3000
The backend API will be available at http://localhost:4000

## Database Management

### Prisma Commands

- `npm run prisma:init` - Initialize a new Prisma project
- `npm run prisma:generate` - Generate Prisma client based on schema
- `npm run prisma:migrate` - Create and apply migrations

### Working with the Database

The application uses Prisma as an ORM to interact with the SQLite database. The database schema is defined in `server/prisma/schema.prisma`.

To modify the database schema:
1. Edit the schema file
2. Run `npm run prisma:migrate` to create and apply migrations
3. Run `npm run prisma:generate` to update the Prisma client

## Running Tests

To run all tests:
```bash
# Run server tests
cd server
npm test

# Run UI tests
cd ui
npm test
```

## Features

- Create, read, update, and delete log entries
- Prefill username if already provided
- Responsive design for mobile and desktop
- Local cookie storage for name