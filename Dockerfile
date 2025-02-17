FROM node:20-slim

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
COPY bun.lockb ./

# Install dependencies
RUN npm install --legacy-peer-deps && \
    npm install react-router-dom@latest @vitejs/plugin-react@latest && \
    npm cache clean --force

# Copy the rest of the application
COPY . .

# Set environment variables
ENV NODE_ENV=development
ENV VITE_PORT=8082
ENV HOST=0.0.0.0

# Expose the port
EXPOSE 8082

# Start the development server with host and port explicitly set
CMD ["sh", "-c", "npm run dev -- --host 0.0.0.0 --port 8082"]