# Use official Node.js 20 Alpine lightweight image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package management files first to leverage Docker layer caching
COPY package*.json ./

# Install application dependencies
RUN npm install --production

# Copy backend source files
COPY . .

# Expose backend API port
EXPOSE 5000

# Set environment variable defaults
ENV PORT=5000 \
    NODE_ENV=production

# Start backend server using production start script
CMD ["npm", "start"]
