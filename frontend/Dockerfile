# Stage 1: Build the React application
FROM node:22-alpine AS builder
WORKDIR /app

# Copy package configurations from the frontend subfolder
COPY frontend/package.json frontend/yarn.lock* ./

# Install dependencies cleanly
RUN yarn install --network-timeout 100000

# Copy the rest of the frontend application code
COPY frontend/ .

# Compile the production build assets
RUN yarn build

# Stage 2: Serve the production assets with Nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]