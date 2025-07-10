# Build stage
FROM gradle:8.8-jdk21 AS build
WORKDIR /app
COPY build.gradle .
COPY gradle gradle
COPY gradlew .
COPY gradlew.bat .
COPY src src
RUN chmod +x gradlew
RUN ./gradlew build -x test

# Runtime stage
FROM openjdk:21-jre-slim
WORKDIR /app
COPY --from=build /app/build/libs/msProduct-0.0.1-SNAPSHOT.jar app.jar
COPY --from=build /app/src/main/resources/products.json /app/products.json

# Create directory for data
RUN mkdir -p /app/data
COPY src/main/resources/products.json /app/data/products.json

EXPOSE 8080

ENV SPRING_PROFILES_ACTIVE=docker

ENTRYPOINT ["java", "-jar", "app.jar"] 