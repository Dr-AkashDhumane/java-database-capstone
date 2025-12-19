# ==========================
# Step 1: Build the application
# ==========================
FROM maven:3.9.9-eclipse-temurin-17 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy Maven configuration and source code
COPY pom.xml . 
COPY src ./src

# Build the JAR file without running tests
RUN mvn clean package -DskipTests

# ==========================
# Step 2: Run the application
# ==========================
FROM eclipse-temurin:17.0.15_6-jre

# Set the working directory for runtime
WORKDIR /app

# Copy the JAR built in the first stage
COPY --from=builder /app/target/back-end-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your app runs on
EXPOSE 8080

# Command to run the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
