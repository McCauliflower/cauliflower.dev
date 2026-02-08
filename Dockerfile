# Build stage
FROM dhi.io/node:25-debian13-sfw-dev AS builder

# Accept Socket Firewall key as build argument
ARG SOCKET_FIREWALL_KEY
ENV SOCKET_FIREWALL_KEY=$SOCKET_FIREWALL_KEY

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Set environment to production
ENV NODE_ENV=production

# Install dependencies (including devDependencies for build)
RUN npm ci --include=dev

# Install serve for production
RUN npm install -g serve

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM dhi.io/node:25-debian13-sfw-dev

# Set working directory
WORKDIR /app

# Copy package files and node_modules from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 8080

# Set environment to production
ENV NODE_ENV=production

# Start the application using npx serve
CMD ["npx", "serve", "-s", "dist", "-l", "8080"]