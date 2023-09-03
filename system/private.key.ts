import { EncryptionUtility } from "../app/middleware/crypt";

const { randomBytes } = require('crypto');

// Define the key length in bytes (256 bits for a 32-byte key)
const keyLengthBytes = 16;

// Generate a random private key as a Buffer
const privateKeyBuffer = randomBytes(keyLengthBytes);

// Convert the private key Buffer to a hexadecimal string
const privateKeyHex = privateKeyBuffer.toString('hex');

console.log('Generated Private Key (Hex):', privateKeyHex);

const result = EncryptionUtility.encrypt('4dcc2a2a-ce89-40b4-b0c8-88386e515c5a')
console.log('Result of encrypt', result)
const decrypt = EncryptionUtility.decrypt(result);
console.log('Result of decrypt', decrypt)