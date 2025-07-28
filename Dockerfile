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
ENV NEXT_PUBLIC_MANAGER=908mbdf4-5c1e-49e9-9c5a-324c921a80e8
ENV NEXT_PUBLIC_PC=908mbdf4-5c1e-49e9-9c5a-324c921a90b8
ENV NEXT_PUBLIC_CS=908mbdf4-5c1e-49e9-9c5a-324c921a90m2
ENV NEXT_PUBLIC_OWNER=9908mbdf4-5c1e-49e9-9c5a-324c921a90r3
ENV NEXT_PUBLIC_DEV=908mbdf4-5c1e-49e9-9c5a-324c921a90r4
ENV NEXT_PUBLIC_FINANCE=908mbdf4-5c1e-49e9-9c5a-324c921a50m8
ENV NEXT_PUBLIC_UNDEFINED=000mbdf0-0c0e-00e0-0c0a-000c000a00r0
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