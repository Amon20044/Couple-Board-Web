# Use Node.js official image
FROM node:22-alpine

# Create app directory
WORKDIR /app

# Copy package.json and lock file first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of your code
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Run Vite dev server with host flag to allow external access
CMD ["npm", "run", "dev", "--", "--host"]
