"use server";

// utils/cryptoUtils.js
import CryptoJS from "crypto-js";

// Function to encode a string to Base64
const toBase64 = (input: string) => {
  return Buffer.from(input).toString("base64");
};

// Function to encrypt a string and return a Base64-encoded ciphertext
export const encryptString = async (string: string, secret: string) => {
  try {
    // Encrypt the string
    const ciphertext = CryptoJS.AES.encrypt(string, secret).toString();

    // Encode the ciphertext to Base64
    const base64Ciphertext = toBase64(ciphertext);

    return base64Ciphertext;
  } catch (error) {
    console.error("Error encrypting string:", error);
    throw error;
  }
};

// Function to decode a Base64-encoded string
const fromBase64 = (input: string) => {
  // Convert Base64 to binary string
  return decodeURIComponent(escape(atob(input)));
};

// Function to decrypt a Base64-encoded ciphertext
export const decryptString = async (ciphertext: string) => {
  try {
    // Decode the Base64-encoded ciphertext
    const decodedCiphertext = fromBase64(ciphertext);

    // Decrypt the decoded ciphertext
    const bytes = CryptoJS.AES.decrypt(
      decodedCiphertext,
      process.env.CRYPTO_SECRET!
    );
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

    return decryptedString;
  } catch (error) {
    console.error("Error decrypting string:", error);
    throw error;
  }
};
