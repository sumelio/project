# Project Setup and Run Guide

This guide explains how to set up and run both the backend and frontend components of the Marketplace Product application.

## 📋 Prerequisites

### System Requirements
- **Java 21** (for backend)
- **Node.js 18+** and **npm** (for frontend)
- **Git** (for version control)

### Tool Installation

#### Java 21 Setup
```bash
# Check current Java version
java -version

# If using jenv to manage Java versions
jenv versions
jenv shell 21  # Switch to Java 21 for current session
```

#### Node.js Setup
```bash
# Check Node.js version
node --version
npm --version

# Install Node.js from https://nodejs.org/ if not installed
```

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd project
```

### 2. Start Backend (Spring Boot)
```bash
cd backend/msProduct

# Make gradlew executable (if needed)
chmod +x gradlew

# Run the application
./gradlew bootRun
```

The backend will start on **http://localhost:8080**

### 3. Start Frontend (React)
```bash
# Open a new terminal
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will start on **http://localhost:3000**

---

## 🔧 Backend Setup (Spring Boot)

### Directory Structure
```
backend/msProduct/
├── src/
│   ├── main/java/com/marketplace/
│   │   ├── application/          # Service layer
│   │   ├── domain/              # Domain entities
│   │   ├── infrastructure/      # Controllers, repositories
│   │   └── MsProductApplication.java
│   └── test/                    # Unit tests
├── build.gradle                 # Build configuration
└── gradlew                     # Gradle wrapper
```

### Available Commands

#### Development
```bash
cd backend/msProduct

# Run the application
./gradlew bootRun

# Run with specific profile
./gradlew bootRun --args='--spring.profiles.active=dev'

# Build the project
./gradlew build

# Clean build
./gradlew clean build
```

#### Testing
```bash
# Run all tests
./gradlew test

# Run tests with coverage report
./gradlew test jacocoTestReport

# View coverage report
open build/reports/jacoco/test/html/index.html
```

#### Production Build
```bash
# Create JAR file
./gradlew bootJar

# Run the JAR
java -jar build/libs/msProduct-0.0.1-SNAPSHOT.jar
```

### Backend Configuration

#### Application Properties
The application uses default Spring Boot configuration. Key endpoints:

- **Base URL**: `http://localhost:8080`
- **Products API**: `http://localhost:8080/product`
- **Health Check**: `http://localhost:8080/actuator/health` (if actuator is enabled)

#### CORS Configuration
The backend is configured to accept requests from:
- `http://localhost:3000` (React dev server)
- `http://127.0.0.1:3000`

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/product` | Get all products |
| GET | `/product/{id}` | Get product by ID |
| POST | `/product` | Create new product |
| PUT | `/product/{id}` | Update product |
| DELETE | `/product/{id}` | Delete product |

---

## ⚛️ Frontend Setup (React + TypeScript)

### Directory Structure
```
frontend/
├── src/
│   ├── application/store/       # Redux store, slices, sagas
│   ├── domain/entities/         # TypeScript interfaces
│   ├── infrastructure/         
│   │   ├── api/                # API services
│   │   └── components/         # React components
│   └── __tests__/              # Test files
├── public/                     # Static assets
├── package.json               # Dependencies and scripts
└── tsconfig.json             # TypeScript configuration
```

### Available Commands

#### Development
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Serve production build locally
npx serve -s build
```

#### Testing
```bash
# Run tests in watch mode
npm test

# Run tests with coverage
npm run test:coverage

# Run tests with coverage in watch mode
npm run test:coverage-watch

# View coverage report
open coverage/lcov-report/index.html
```

### Frontend Configuration

#### Environment Variables
Create a `.env` file in the frontend directory:
```env
REACT_APP_API_BASE_URL=http://localhost:8080
REACT_APP_ENV=development
```

#### Key Technologies
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **Redux Saga** - Side effects management
- **Axios** - HTTP client
- **CSS Modules** - Styling

### Test Coverage Targets
The project is configured with 80% coverage thresholds:
- **Statements**: 80%
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%

---

## 🔄 Full Application Workflow

### 1. Start Both Services
```bash
# Terminal 1 - Backend
cd backend/msProduct
./gradlew bootRun

# Terminal 2 - Frontend  
cd frontend
npm start
```

### 2. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **API Documentation**: Available through the frontend interface

### 3. Development Workflow
1. Backend changes are automatically reloaded with Spring Boot DevTools
2. Frontend changes trigger hot reload in the browser
3. API calls from frontend (port 3000) to backend (port 8080) are handled by CORS configuration

---

## 🧪 Testing Strategy

### Backend Testing
- **Unit Tests**: Domain entities, services, repositories
- **Integration Tests**: Controller endpoints
- **Coverage**: 80%+ line coverage achieved
- **Framework**: JUnit 5, Spring Boot Test, Mockito

### Frontend Testing
- **Unit Tests**: Components, Redux slices, utilities
- **Integration Tests**: Component interactions with Redux
- **Coverage**: 87%+ achieved across all metrics
- **Framework**: Jest, React Testing Library

---

## 🐳 Docker Support (Optional)

### Backend Dockerfile
```dockerfile
FROM openjdk:21-jdk-slim
COPY build/libs/msProduct-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

### Frontend Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
```

---

## 🔍 Troubleshooting

### Common Issues

#### Backend Issues
```bash
# Java version problems
jenv shell 21
java -version

# Port already in use
lsof -ti:8080 | xargs kill -9

# Gradle permission issues
chmod +x gradlew
```

#### Frontend Issues
```bash
# Node modules issues
rm -rf node_modules package-lock.json
npm install

# Port already in use
lsof -ti:3000 | xargs kill -9

# TypeScript compilation errors
npm run build
```

#### CORS Issues
- Ensure backend CORS configuration includes frontend URL
- Check that both services are running on expected ports
- Verify API calls use correct base URL

### Development Tips
1. **Hot Reload**: Both services support hot reload for faster development
2. **Debugging**: Use browser dev tools for frontend, IDE debugger for backend
3. **API Testing**: Use tools like Postman or curl to test backend endpoints
4. **Code Quality**: Run tests frequently and maintain coverage thresholds

---

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://reactjs.org/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

---

## 🎯 Project Status

### Backend ✅
- **Tests**: 50+ tests passing
- **Coverage**: 80%+ line coverage
- **API**: Full CRUD operations
- **Configuration**: CORS, JSON handling

### Frontend ✅  
- **Tests**: 393+ tests passing
- **Coverage**: 87%+ across all metrics
- **Features**: Product display, Redux state management
- **UI**: Responsive design with CSS modules

**Status**: Both services are fully functional and ready for development! 🚀 