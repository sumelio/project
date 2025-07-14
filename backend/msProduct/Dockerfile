# Build stage - Using Amazon Corretto 21 JDK
FROM amazoncorretto:21-alpine AS build
WORKDIR /app

# Install required build tools
RUN apk add --no-cache bash

COPY build.gradle .
COPY gradle gradle
COPY gradlew .
COPY gradlew.bat .
COPY src src
RUN chmod +x gradlew
RUN ./gradlew build -x test

# Runtime stage - Using Amazon Corretto 21 JDK Alpine
FROM amazoncorretto:21-alpine-jdk
WORKDIR /app

# Install curl for health checks
RUN apk add --no-cache curl

# Copy the JAR file using wildcard pattern (since name depends on directory)
COPY --from=build /app/build/libs/*.jar app.jar
COPY --from=build /app/src/main/resources/products.json /app/products.json

# Create directory for data
RUN mkdir -p /app/data /app/logs
COPY src/main/resources/products.json /app/data/products.json

EXPOSE 8080

ENV SPRING_PROFILES_ACTIVE=docker

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:8080/product || exit 1

ENTRYPOINT ["java", "-jar", "app.jar"] 