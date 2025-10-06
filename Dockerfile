# Use the official Node.js image as the base
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package files
# This is done first to cache dependencies if they don't change
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your Hono server runs on (e.g., 3000)
EXPOSE 3000

# Set environment variable to ensure Hono listens on all interfaces
ENV HOST 0.0.0.0

# Run dev server
CMD ["pnpm", "dev"]
