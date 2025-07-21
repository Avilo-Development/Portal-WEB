# 1. Use official Node.js image
FROM node:18-alpine AS builder

# 2. Set working directory
WORKDIR /app

# 3. Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy the rest of the app
COPY . .

# 5. Set build-time environment variables
ARG NEXT_PUBLIC_HCP
ARG NEXT_PUBLIC_API

# 6. Build the Next.js app
ENV NEXT_PUBLIC_HCP=https://pro.housecallpro.com/app/
ENV NEXT_PUBLIC_API=https://portal-api-1051259236562.europe-west1.run.app
RUN npm run build

# 7. Use a lightweight image for production
FROM node:18-alpine AS runner

# 8. Set working directory
WORKDIR /app

# 9. Copy built app from builder
COPY --from=builder /app ./

# 10. Install only production dependencies
RUN npm install --omit=dev

# 11. Expose port
EXPOSE 3000

# 12. Start the app
CMD ["npm", "start"]