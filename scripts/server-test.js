// server-test.js
const http = require('http');
const { exec } = require('child_process');
const path = require('path');

// Configuration
const PORT = process.env.PORT || 3000;
const SERVER_START_TIMEOUT = 30000; // 30 seconds timeout for server to start
const REQUEST_TIMEOUT = 5000; // 5 seconds timeout for HTTP requests

// Variables to track server process
let serverProcess = null;
let serverStarted = false;
let testsPassed = true;

console.log('Starting Next.js server test...');

// Function to start the Next.js server
function startServer() {
  return new Promise((resolve, reject) => {
    console.log(`Starting Next.js server on port ${PORT}...`);
    
    // Start Next.js dev server
    serverProcess = exec(`PORT=${PORT} npm run dev`, {
      cwd: process.cwd()
    });
    
    // Set timeout for server start
    const timeout = setTimeout(() => {
      if (!serverStarted) {
        reject(new Error(`Server failed to start within ${SERVER_START_TIMEOUT / 1000} seconds`));
      }
    }, SERVER_START_TIMEOUT);
    
    // Handle server output
    serverProcess.stdout.on('data', (data) => {
      console.log(`Server output: ${data.trim()}`);
      
      // Check for patterns indicating server is ready
      if (data.includes('ready') || data.includes('started') || data.includes('listening')) {
        serverStarted = true;
        clearTimeout(timeout);
        
        // Give it a moment to fully initialize
        setTimeout(resolve, 1000);
      }
    });
    
    serverProcess.stderr.on('data', (data) => {
      console.error(`Server error: ${data.trim()}`);
    });
    
    serverProcess.on('error', (err) => {
      clearTimeout(timeout);
      reject(new Error(`Failed to start server: ${err.message}`));
    });
    
    serverProcess.on('exit', (code) => {
      if (code !== 0 && !serverStarted) {
        clearTimeout(timeout);
        reject(new Error(`Server process exited with code ${code}`));
      }
    });
  });
}

// Function to test if server responds
function testServerResponse() {
  return new Promise((resolve, reject) => {
    console.log('Testing server response...');
    
    const req = http.get(`http://localhost:${PORT}/`, {
      timeout: REQUEST_TIMEOUT
    }, (res) => {
      const statusCode = res.statusCode;
      console.log(`Server responded with status code: ${statusCode}`);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (statusCode >= 200 && statusCode < 400) {
          console.log('✅ Server response test passed!');
          resolve();
        } else {
          reject(new Error(`Server returned status code ${statusCode}`));
        }
      });
    });
    
    req.on('error', (err) => {
      reject(new Error(`Error connecting to server: ${err.message}`));
    });
    
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Request timed out after ${REQUEST_TIMEOUT / 1000} seconds`));
    });
  });
}

// Function to clean up server process
function cleanupServer() {
  return new Promise((resolve) => {
    if (serverProcess) {
      console.log('Stopping server...');
      
      // Kill process and its children
      if (process.platform === 'win32') {
        exec(`taskkill /pid ${serverProcess.pid} /T /F`, () => resolve());
      } else {
        serverProcess.kill('SIGTERM');
        
        // Force kill after a timeout
        setTimeout(() => {
          try {
            serverProcess.kill('SIGKILL');
          } catch (e) {
            // Process might already be gone
          }
          resolve();
        }, 5000);
      }
    } else {
      resolve();
    }
  });
}

// Run the tests
async function runTests() {
  try {
    await startServer();
    await testServerResponse();
    console.log('\n✅ All tests passed! Server is running correctly.');
    process.exit(0);
  } catch (err) {
    console.error(`\n❌ Test failed: ${err.message}`);
    testsPassed = false;
    process.exit(1);
  } finally {
    await cleanupServer();
  }
}

// Handle process termination
process.on('SIGINT', async () => {
  await cleanupServer();
  process.exit(testsPassed ? 0 : 1);
});

runTests();