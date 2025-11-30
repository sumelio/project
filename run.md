# Project Setup and Run Guide

This guide explains how to set up and run both the backend and frontend components of the Marketplace Product application.

Example.

## 📋 Prerequisites

### System Requirements
- **Java 21** (for local backend development)
- **Node.js 18+** and **npm** (for local frontend development)
- **Docker & Docker Compose** (for containerized deployment)
- **Git** (for version control)

### Tool Installation

#### Docker & Docker Compose Setup
```bash
# Check Docker installation
docker --version
docker-compose --version

# Install Docker Desktop from https://docker.com/get-started
# Docker Compose is included with Docker Desktop
```

#### Java 21 Setup (for local development)
```bash
# Check current Java version
java -version

# If using jenv to manage Java versions
jenv versions
jenv shell 21  # Switch to Java 21 for current session
```

#### Node.js Setup (for local development)
```bash
# Check Node.js version
node --version
npm --version

# Install Node.js from https://nodejs.org/ if not installed
```

## 🚀 Quick Start

### 🐳 **Option 1: Docker Compose (Recommended)**

The fastest way to run the entire application:

```bash
# Clone the repository
git clone git@github.com:sumelio/project.git
cd project

# Start both services (production mode)
docker-compose up -d

# View logs
docker-compose logs -f

# Access the application
# Frontend: http://localhost
# Backend API: http://localhost:8080
```

### 🔧 **Option 2: Development Mode with Docker**

For development with hot reload:

```bash
# Start with development profile
docker-compose --profile development up -d

# View logs for development services
docker-compose logs -f frontend-dev backend

# Access the application
# Frontend Dev: http://localhost:3000 (hot reload)
# Backend API: http://localhost:8080
```

### 💻 **Option 3: Local Development (No Docker)**

```bash
# Terminal 1 - Backend
cd backend/msProduct
./gradlew bootRun

# Terminal 2 - Frontend
cd frontend
npm install && npm start

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080
```

---

## 🐳 Docker Compose Setup

### Services Overview

| Service | Container | Port | Image | Description |
|---------|-----------|------|-------|-------------|
| `backend` | marketplace-backend | 8080 | Amazon Corretto 21 | Spring Boot API |
| `frontend` | marketplace-frontend | 80/443 | Nginx Alpine | Production React app |
| `frontend-dev` | marketplace-frontend-dev | 3000 | Node 18 Alpine | Development with hot reload |

### Available Commands

#### Production Deployment
```bash
# Start production services
docker-compose up -d

# Build and start (rebuild images)
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Remove volumes and networks
docker-compose down -v --remove-orphans
```

#### Development Mode
```bash
# Start development services
docker-compose --profile development up -d

# Start specific services
docker-compose up -d backend frontend-dev

# Rebuild development services
docker-compose --profile development up -d --build

# View development logs
docker-compose logs -f frontend-dev backend
```

#### Service Management
```bash
# Scale services (if needed)
docker-compose up -d --scale backend=2

# Restart specific service
docker-compose restart backend

# View service status
docker-compose ps

# Execute commands in containers
docker-compose exec backend bash
docker-compose exec frontend-dev sh
```

### Environment Configuration

#### Production Environment
- **Frontend**: Served by Nginx with optimized static files
- **Backend**: Amazon Corretto 21 JRE for optimal performance
- **Networking**: Internal Docker network for service communication
- **Volumes**: Persistent data storage for JSON files and logs

#### Development Environment
- **Frontend**: React development server with hot reload
- **Backend**: Same as production but with development logging
- **Volume Mounting**: Live code changes reflected immediately
- **Port Mapping**: Direct access to development ports

### Docker Compose Configuration Details

```yaml
# Production services
services:
  backend:
    build: ./backend/msProduct
    ports: ["8080:8080"]
    volumes: 
      - ./backend/msProduct/src/main/resources/products.json:/app/data/products.json
      - backend-logs:/app/logs
    environment:
      - SPRING_PROFILES_ACTIVE=docker
      - JAVA_OPTS=-Xmx512m -Xms256m

  frontend:
    build: ./frontend
    ports: ["80:80", "443:443"]
    environment:
      - REACT_APP_API_BASE_URL=http://localhost:8080
    depends_on: [backend]

  # Development service (profile: development)
  frontend-dev:
    build: 
      context: ./frontend
      dockerfile: Dockerfile.dev
    ports: ["3000:3000"]
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - CHOKIDAR_USEPOLLING=true
    profiles: [development]
```

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
├── gradlew                     # Gradle wrapper
├── Dockerfile                  # Production container
└── .dockerignore              # Docker optimization
```

### Available Commands

#### Local Development
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

#### Docker Development
```bash
# Build backend image
docker-compose build backend

# Run backend only
docker-compose up -d backend

# View backend logs
docker-compose logs -f backend

# Execute commands in backend container
docker-compose exec backend bash
```

#### Testing
```bash
# Local testing
./gradlew test
./gradlew test jacocoTestReport

# Docker testing
docker-compose exec backend ./gradlew test

# View coverage report
open build/reports/jacoco/test/html/index.html
```

#### Production Build
```bash
# Local JAR build
./gradlew bootJar
java -jar build/libs/*.jar

# Docker production build
docker-compose build backend
docker-compose up -d backend
```

### Backend Configuration

#### Application Properties
The application uses environment-specific configuration:

- **Local**: `application.properties` (default)
- **Docker**: `SPRING_PROFILES_ACTIVE=docker`
- **Base URL**: `http://localhost:8080`
- **Products API**: `http://localhost:8080/product`

#### CORS Configuration
Configured to accept requests from:
- `http://localhost:3000` (React dev server)
- `http://127.0.0.1:3000`
- `http://localhost` (Nginx production)

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
├── Dockerfile                 # Production container
├── Dockerfile.dev             # Development container
├── nginx.conf                 # Nginx configuration
└── .dockerignore             # Docker optimization
```

### Available Commands

#### Local Development
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

#### Docker Development
```bash
# Development mode with hot reload
docker-compose --profile development up -d frontend-dev

# Production mode with Nginx
docker-compose up -d frontend

# View frontend logs
docker-compose logs -f frontend-dev

# Execute commands in frontend container
docker-compose exec frontend-dev sh
```

#### Testing
```bash
# Local testing
npm test
npm run test:coverage

# Docker testing
docker-compose exec frontend-dev npm test

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

#### Docker Environment Variables
Automatically configured in docker-compose.yml:
- **Production**: `REACT_APP_API_BASE_URL=http://localhost:8080`
- **Development**: Hot reload and polling enabled

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

### 1. Docker Compose Workflow
```bash
# Start everything
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Update and restart
docker-compose up -d --build

# Stop everything
docker-compose down
```

### 2. Development Workflow
```bash
# Start backend and frontend-dev
docker-compose --profile development up -d

# Make changes to code (auto-reload enabled)
# Frontend: http://localhost:3000
# Backend: http://localhost:8080

# View logs
docker-compose logs -f frontend-dev backend
```

### 3. Mixed Development
```bash
# Backend in Docker, Frontend local
docker-compose up -d backend
cd frontend && npm start

# Frontend in Docker, Backend local
docker-compose up -d frontend-dev
cd backend/msProduct && ./gradlew bootRun
```

### 4. Production Deployment
```bash
# Build and deploy production images
docker-compose build
docker-compose up -d

# Access production app
# Frontend: http://localhost (Nginx)
# Backend: http://localhost:8080
```

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

### Docker Testing
```bash
# Test backend in container
docker-compose exec backend ./gradlew test

# Test frontend in container
docker-compose exec frontend-dev npm test

# Run all tests
docker-compose exec backend ./gradlew test && \
docker-compose exec frontend-dev npm run test:coverage
```

---

## 🐳 Docker Optimization

### Image Sizes
| Service | Base Image | Final Size | Optimization |
|---------|------------|------------|--------------|
| Backend | amazoncorretto:21-alpine-jre | ~180MB | Multi-stage build, JRE only |
| Frontend | nginx:alpine | ~25MB | Multi-stage build, static files only |
| Frontend-dev | node:18-alpine | ~350MB | Development dependencies included |

### Build Optimization
- **Multi-stage builds** reduce final image sizes
- **.dockerignore** files exclude unnecessary files
- **Alpine Linux** base images for smaller footprint
- **Layer caching** optimizes rebuild times

### Performance Features
- **Health checks** for automatic service monitoring
- **Volume mounting** for persistent data
- **Network isolation** for security
- **Resource limits** can be configured if needed

---

## 🔍 Troubleshooting

### Docker Issues

#### Common Docker Problems
```bash
# Port conflicts
docker-compose down
lsof -ti:8080 | xargs kill -9
lsof -ti:3000 | xargs kill -9

# Image build issues
docker-compose build --no-cache
docker system prune -a

# Volume issues
docker-compose down -v
docker volume prune

# Network issues
docker network prune
docker-compose up -d --force-recreate
```

#### Service-Specific Issues
```bash
# Backend not starting
docker-compose logs backend
docker-compose exec backend java -version

# Frontend build failures
docker-compose logs frontend
docker-compose build --no-cache frontend

# Development hot reload not working
docker-compose logs frontend-dev
# Check volume mounts in docker-compose.yml
```

### Local Development Issues

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
- Check docker-compose environment variables

### Development Tips
1. **Hot Reload**: Use development profile for faster development
2. **Debugging**: Use `docker-compose logs -f` for real-time logs
3. **API Testing**: Use tools like Postman or curl to test backend endpoints
4. **Code Quality**: Run tests frequently and maintain coverage thresholds
5. **Container Management**: Use `docker-compose ps` to monitor service status

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://reactjs.org/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Amazon Corretto Documentation](https://docs.aws.amazon.com/corretto/)

---

## 🎯 Project Status

### Backend ✅
- **Tests**: 50+ tests passing
- **Coverage**: 80%+ line coverage
- **API**: Full CRUD operations
- **Configuration**: CORS, JSON handling
- **Docker**: Amazon Corretto 21, multi-stage build
- **Production Ready**: Health checks, logging, optimization

### Frontend ✅  
- **Tests**: 393+ tests passing
- **Coverage**: 87%+ across all metrics
- **Features**: Product display, Redux state management
- **UI**: Responsive design with CSS modules
- **Docker**: Nginx serving, development hot reload
- **Production Ready**: Optimized builds, security headers

### Docker Infrastructure ✅
- **Multi-environment**: Production and development configurations
- **Service Discovery**: Internal networking between containers
- **Volume Management**: Persistent data and development mounting
- **Health Monitoring**: Automatic service health checks
- **Optimization**: Multi-stage builds, Alpine images, layer caching

**Status**: Both services are fully functional and ready for development and production deployment! 🚀 