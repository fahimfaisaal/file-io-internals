FROM node:alpine

# Install strace
RUN apk add --no-cache strace

# Set working directory
WORKDIR /app

# Copy source files
COPY . .

# Command to keep container running
CMD ["tail", "-f", "/dev/null"] 
