// const os = require('os');
import os from 'os';

// Get CPU architecture
console.log(`CPU Architecture: ${os.arch()}`);

// Get CPU information
console.log('CPU Information:', os.cpus());

// Get platform information
console.log(`Platform: ${os.platform()}`);

// Get total memory
console.log(`Total Memory: ${os.totalmem()} bytes`);

// Get free memory
console.log(`Free Memory: ${os.freemem()} bytes`);

// Get available parallelism
console.log(`Available Parallelism: ${os.availableParallelism()}`);