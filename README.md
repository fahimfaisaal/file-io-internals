# File I/O Internals

This project demonstrates different approaches to file I/O operations in Node.js, comparing synchronous and asynchronous implementations for both single and batch operations. It also includes system call tracing using `strace` to analyze the low-level I/O behavior.

## Project Structure

```txt
file-io-internals/
├── async/
│   ├── batch.js    # Asynchronous batch file operations
│   └── single.js   # Asynchronous single file operations
├── sync/
│   ├── batch.js    # Synchronous batch file operations
│   └── single.js   # Synchronous single file operations
├── create_large_file.js  # Utility to generate test files
├── docker-compose.yml
└── Dockerfile
```

## Prerequisites

- Node.js (v14 or higher recommended)
- strace (for Linux system call tracing)
- Docker (optional, for containerized execution)

## Usage

### Docker Execution (optional for linux)

```bash
docker compose up -d
docker compose exec node-strace sh
```

### Generate a large test file

```bash
node create_large_file.js
```

### System Call Analysis with strace

The project uses `strace` to analyze system calls made during file operations. Each command will generate a trace file containing detailed system call information.

#### Trace synchronous operations

```bash
# Single file operations with full trace
strace -f -o ./sync/single.txt node sync/single.js

# Batch operations with full trace
strace -f -o ./sync/batch.txt node sync/batch.js
```

#### Trace asynchronous operations

```bash
# Single file operations with full trace
strace -f -o ./async/single.txt node async/single.js

# Batch operations with specific syscall tracing
# Using 1 thread in the thread pool
UV_THREADPOOL_SIZE=1 strace -f -o ./async/batch.txt node async/batch.js

# Using 8 threads in the thread pool
UV_THREADPOOL_SIZE=8 strace -f -o ./async/batch.txt node async/batch.js
```

#### Understanding the strace Options

- `-f`: Follow child processes (important for Node.js which may spawn worker threads)
- `-o`: Output file for the trace
- `-e trace=openat,read,close`: Filter trace to only show specific system calls
- `UV_THREADPOOL_SIZE`: Controls the number of threads in Node.js's thread pool
