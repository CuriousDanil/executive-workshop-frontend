# Stage 1: Build the Angular app
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --configuration=production

# Stage 2: Run SSR Server
FROM node:20-alpine
WORKDIR /app

# Copy built application
COPY --from=build /app/dist/executive-workshop-frontend ./dist
COPY --from=build /app/package*.json ./

# Install only production dependencies for runtime
RUN npm ci --only=production && npm cache clean --force

# Set the port to 3000 to match your nginx proxy
ENV PORT=3000

# Expose port 3000 for your server nginx to proxy
EXPOSE 3000

# Start the SSR server
CMD ["node", "dist/server/server.mjs"]

