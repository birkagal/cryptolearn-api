const express = require("express");
const block_utils = require("../src/block"); // Import block functions
const router = express.Router();

/* Return {nonce, hash} for the mined block */
router.get("/:data?/:difficulty?", (req, res) => {
  let data = req.params.data || ""; // If no data is provided, use empty string
  let difficulty = req.params.difficulty || 4; // If no difficulty is provided, use 4
  let mined = block_utils.mine(data, difficulty); // Mine the Block
  res.send(mined);
});

module.exports = router;
