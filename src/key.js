const { calculate_sha256 } = require("../src/block"); // Import hash function from block.js
const EC = require("elliptic").ec; // Import Elliptic curve module
const ec = new EC("secp256k1"); // Use secp256k1 curve
var keypair = ec.genKeyPair(); // Generate random key-pair

/* Return the current Public key */
const get_pub = () => {
  return { key: keypair.getPublic("hex") };
};

/* Return the current Private key */
const get_priv = () => {
  return { key: keypair.getPrivate("hex") };
};

/* Sign the input data using the key-pair */
const sign = (data) => {
  var hash_message = calculate_sha256(data).toString();
  var signature = Buffer.from(keypair.sign(hash_message).toDER()).toString(
    "hex"
  );
  return { signature };
};

/* Verify the input signature using the input data and public key */
const verify = (pub, data, signature) => {
  let verified = { status: false };
  try {
    let key = ec.keyFromPublic(pub, "hex");
    let hash_transaction = calculate_sha256(data);
    verified.status = key.verify(hash_transaction, signature);
  } catch {
    return { status: false }; // If verify function return an error => signature is invalid
  }
  return verified;
};

/* Update the key-pair using the new key (or create a random one) */
const update_key = (new_key) => {
  var rv;
  if (new_key === "random") {
    keypair = ec.genKeyPair(); // Generate a random key-pair
    rv = { priv: keypair.getPrivate("hex") };
  } else {
    if (is_hex(new_key)) {
      keypair = ec.keyFromPrivate(new_key, "hex"); // Generate key-pair using input Key
      rv = { priv: new_key };
    } else {
      rv = { priv: false };
    }
  }
  return rv;
};

/* Validate if input key is hexadecimal string */
const is_hex = (key) => {
  for (let i = 0; i < key.length; i++) {
    let ch = key[i];
    if (
      (ch < "0" || ch > "9") &&
      (ch < "A" || ch > "F") &&
      (ch < "a" || ch > "f")
    ) {
      return false; // If single character is invalid, return false
    }
  }
  return true; // Return true if all characters are valid
};

module.exports = { update_key, get_pub, get_priv, sign, verify };
