const crypto = require('crypto');

const targetHash = '3a7102caf439c641b3e9b8455d539e5dd27efbc926b890e2397b372f381b859b';
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const maxLength = 6;

function reverseBruteForceHash(startingNumber = 999999) {
  console.log('brute force strrted...');
  const startTime = Date.now();
  let attempts = 0;

  let currentNumber = startingNumber;

  while (currentNumber >= 0) {
    attempts++;

    let currentString = '';
    let tempNumber = currentNumber;
    for (let i = 0; i < maxLength; i++) {
      const index = tempNumber % characters.length;
      currentString = characters[index] + currentString;
      tempNumber = Math.floor(tempNumber / characters.length);
    }

    const hash = crypto.createHash('sha256').update(currentString).digest('hex');

    if (hash === targetHash) {
      const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
      console.log(`Ketemu!${currentString}, P: ${attempts}, Waktu: ${elapsedTime} s`);
      return;
    }

    currentNumber--;
  }

  console.log('selesai.');
}

reverseBruteForceHash();