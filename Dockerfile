# Build stage
FROM dhi.io/node:25-debian13-sfw-dev AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./


# Set environment to production
ENV NODE_ENV=production

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM dhi.io/node:25-debian13-sfw-dev

# Set working directory
WORKDIR /app

# Install serve to run the application
RUN npm install -g serve

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# Expose port
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "dist", "-l", "3000"]