# Justdrop Application

A full-stack web application with Spring Boot backend and Next.js frontend to demonstrate a simple file upload service.

## Project Structure

```
justdrop-app/
├── justdrop/          # Spring Boot API
├── justdrop-fe/         # Next.js React application
├── uploads/            # Directory for uploaded files
└── README.md         # This file
```

## Prerequisites

Make sure you have the following installed:

- **Java 21+** (for Spring Boot backend)
- **Node.js 18+** (for Next.js frontend)
- **Maven** (for building Spring Boot)
- **Git**

## Quick Start

### 1. Clone the Repository

```bash
cd justdrop-app
```

### 2. Setup Backend (Spring Boot)

```bash
# Navigate to backend directory
cd justdrop

# Install dependencies and run
mvn clean install
mvn spring-boot:run

# Backend will be available at http://localhost:8080
```

### 3. Setup Frontend (Next.js)

```bash
# Navigate to frontend directory (from project root)
cd justdrop-fe

# Install dependencies
npm install

# Run development server
npm run dev

# Frontend will be available at http://localhost:3000
```

## Development

### Running Both Applications

For development, you'll need to run both applications simultaneously:

**Terminal 1 - Backend:**
```bash
npm run backend
```

**Terminal 2 - Frontend:**
```bash
npm run frontend
```

Refer package.json scripts for more commands.

## API Documentation

- Backend API runs on: `http://localhost:8080`
- Frontend application runs on: `http://localhost:3000`

## Building for Production

### Backend
```bash
cd justdrop
mvn clean package
java -jar target/justdrop.jar
```

### Frontend
```bash
cd justdrop-fe
npm run build
npm start
```
