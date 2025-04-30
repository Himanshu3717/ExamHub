# Base image
FROM node:18-alpine AS base

# Install required packages for Prisma
RUN apk add --no-cache openssl libc6-compat

# Dependencies stage
FROM base AS deps
WORKDIR /app

# Copy only package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Builder stage
FROM base AS builder
WORKDIR /app

# Copy installed node_modules
COPY --from=deps /app/node_modules ./node_modules

# Copy rest of the application
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# Set build-time environment variables
ENV DATABASE_URL="postgresql://neondb_owner:npg_w0ZH5QrYUfzJ@ep-empty-breeze-a49cwsto-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_aW50ZW5zZS1idWxsZnJvZy0yNC5jbGVyay5hY2NvdW50cy5kZXYk"
ENV CLERK_SECRET_KEY="sk_test_Z626nvMmALeSREy19H6946qQNjjDaNeK5dlLFLpLjG"
ENV NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
ENV NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
ENV NEXT_PUBLIC_EMAILJS_SERVICE_ID="service_t990zja"
ENV NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="template_aybwglz"
ENV NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="6rFa5l5roeEDZLibN"

# Prisma generate after schema is available
RUN npx prisma generate

# Build the application
RUN npm run build

# Production stage
FROM base AS runner
WORKDIR /app

# Environment variables for production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Add the application environment variables to the runner stage
ENV DATABASE_URL="postgresql://neondb_owner:npg_w0ZH5QrYUfzJ@ep-empty-breeze-a49cwsto-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_aW50ZW5zZS1idWxsZnJvZy0yNC5jbGVyay5hY2NvdW50cy5kZXYk"
ENV CLERK_SECRET_KEY="sk_test_Z626nvMmALeSREy19H6946qQNjjDaNeK5dlLFLpLjG"
ENV NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
ENV NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
ENV NEXT_PUBLIC_EMAILJS_SERVICE_ID="service_t990zja"
ENV NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="template_aybwglz"
ENV NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="6rFa5l5roeEDZLibN"

# Create non-root user
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copy necessary build output
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Set user
USER nextjs

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]