const crypto = require('crypto');

const targetHash = '3a7102caf439c641b3e9b8455d539e5dd27efbc926b890e2397b372f381b859b';
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const maxLength = 6;

function bruteForceHash() {
    console.log('Brute force process started...');
    const startTime = Date.now();
    let attempts = 0;
    let intervalStart = Date.now();
    let intervalAttempts = 0;

    const stack = [''];

    const logInterval = setInterval(() => {
        const elapsedTime = ((Date.now() - intervalStart) / 1000).toFixed(2);
        const triesPerSecond = (intervalAttempts / elapsedTime).toFixed(2);
        console.log(`[INFO] Time: ${((Date.now() - startTime) / 1000).toFixed(2)}s, Attempts: ${attempts}, Speed: ${triesPerSecond} tries/sec`);
        intervalStart = Date.now();
        intervalAttempts = 0;
    }, 10000);

    while (stack.length > 0) {
        const current = stack.pop();
        attempts++;
        intervalAttempts++;

        const hash = crypto.createHash('sha256').update(current).digest('hex');

        if (hash === targetHash) {
            clearInterval(logInterval);
            console.log(`Match found! Input: ${current}, Attempts: ${attempts}, Time: ${((Date.now() - startTime) / 1000).toFixed(2)}s`);
            return;
        }

        if (current.length < maxLength) {
            for (let char of characters) {
                stack.push(current + char);
            }
        }
    }

    clearInterval(logInterval);
    console.log('No match found.');
}

bruteForceHash();
