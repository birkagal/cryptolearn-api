const SHA256 = require("crypto-js/sha256"); // Import the SHA256 function from CryptoJS module

/* Calculate SHA256 for input data */
const calculate_sha256 = (data) => {
  return SHA256(data).toString();
};

/*
 * Mine the block. To mine a block, you need to find a nonce such that hash value has "difficulty" number
 * of leading zeroes. Starting from nonce = 0, go on a loop until you find adequate nonce and return that nonce and hash
 */
const mine = (data, difficulty) => {
  let nonce = 0;
  let hash = SHA256(data + nonce).toString();
  difficulty = Number(difficulty);
  while (hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
    nonce++;
    hash = SHA256(data + nonce).toString();
  }
  return { hash, nonce };
};

module.exports = { calculate_sha256, mine };
