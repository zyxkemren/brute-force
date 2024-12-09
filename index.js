const crypto = require('crypto');

const targetHash = '3a7102caf439c641b3e9b8455d539e5dd27efbc926b890e2397b372f381b859b';
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const maxLength = 6;

function bruteForceHash(logInterval = 10000) { 
  console.log('Brute force process started...');
  const startTime = Date.now();
  let attempts = 0;
  let intervalStart = Date.now();
  let intervalAttempts = 0;

  const stack = [''];

  while (stack.length > 0) {
    const current = stack.pop();
    attempts++;
    intervalAttempts++;

    const hash = crypto.createHash('sha256').update(current).digest('hex');

    if (attempts % logInterval === 0) { 
      const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
      const triesPerSecond = (attempts / elapsedTime).toFixed(0);
      console.log(`Attempt: ${attempts}, Input: ${current}, Hash: ${hash}, Time: ${elapsedTime}s Speed: ${triesPerSecond}/s`);
    }

    if (hash === targetHash) {
      const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
      console.log(`Match found! Input: ${current}, Attempts: ${attempts}, Time: ${elapsedTime}s`);
      return;
    }

    if (current.length < maxLength) {
      for (let char of characters) {
        stack.push(current + char);
      }
    }
  }

  console.log('No match found.');
}

bruteForceHash(); 