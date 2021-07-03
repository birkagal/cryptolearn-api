const express = require("express");
const key_utils = require("../src/key"); // Import key functions
const router = express.Router();

/* Return updated private key */
router.get("/update/:key", (req, res) => {
  let new_key = key_utils.update_key(req.params.key);
  res.send(new_key);
});

/* Return updated private key */
router.get("/verify/:pub/:signature/:data?", (req, res) => {
  let data = req.params.data || ""; // If no data is provided, use empty string
  let verified = key_utils.verify(req.params.pub, data, req.params.signature);
  res.send(verified);
});

/* Return a signature of the provided data using the key-pair */
router.get("/sign/:data?", (req, res) => {
  let data = req.params.data || ""; // If no data is provided, use empty string
  let signature = key_utils.sign(data);
  res.send(signature);
});

/* Return current public key */
router.get("/getpub", (req, res) => {
  let pub = key_utils.get_pub();
  res.send(pub);
});

/* Return current private key */
router.get("/getpriv", (req, res) => {
  let priv = key_utils.get_priv();
  res.send(priv);
});

module.exports = router;
