// 3......Password Security

const crypto = require('crypto')

// 📌The crypto.scryptSync() is an inbuilt function which Provides a synchronous scrypt
// implementation in Node.js. scrypt is a password-based key derivation function. 
// It is intended to be costly computationally plus memory-wise. So, the brute-force 
// attacks are made unsuccessful.

// Parameter: This method accept five parameters as mentioned above and described below:
//     password: It can hold string, Buffer, TypedArray, or DataView type of data.
//     salt: It holds string, Buffer, TypedArray, or DataView type of data. It must be as unique as possible. Moreover, it is recommended that salt should be random and is at a minimum of 16 bytes long.
//     keylen: It denotes the length of the key, and it must be a number.


// Function to hash a password
const hashPassword = (password) => {

    // Generate a random 16-byte salt (raw binary data)
    const salt = crypto.randomBytes(16)

    // Derive a secure hash using scrypt (returns a Buffer)
    const hash = crypto.scryptSync(password, salt, 64)

    // Convert Buffer → hex string for storage (JSON/DB can store strings, not Buffers)
    return { 
        hash: hash.toString('hex'), 
        salt: salt.toString('hex') 
    }
}

// Function to verify a password
const verifyPassword = (password, saltHex, hashHex) => {

    // Convert stored hex strings back into Buffers
    const salt = Buffer.from(saltHex, 'hex')
    const hash = Buffer.from(hashHex, 'hex')

    // Recreate the hash using the same salt
    const hashedPassword = crypto.scryptSync(password, salt, 64)

    // Compare hashes safely to prevent timing attacks
    return crypto.timingSafeEqual(hash, hashedPassword)
}

const myPassword = 'huzaifibrahim'
const wrongPassword = 'huzaif'

// Hash the password before storing it
const { hash, salt } = hashPassword(myPassword)
console.log('Salt:', salt)
console.log('Hash:', hash)

// Verify login attempts
const validPassword = verifyPassword(myPassword, salt, hash)
const invalidPassword = verifyPassword(wrongPassword, salt, hash)

console.log(myPassword, 'Is valid password ?', validPassword)
console.log(wrongPassword, 'Is valid password ?', invalidPassword)

//💡Buffers are used for crypto operations; hex is used only for storage

