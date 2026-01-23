// 4.....HMAC (Hash-based Message Authentication Code)
const crypto = require('crypto')
const { buffer } = require('stream/consumers')

// 1.Create hmac
// // Secret key
// const secret = 'huzaifibrahim'
// // Create an HMAC
// const hmac = crypto.hmac('sha256', secret)
// // Update with data
// hmac.update('message')
// // Get the digest
// const hmacDigest = hmac.digest('hex')
// console.log(hmacDigest)




// 2. small example
// const hmac = crypto.createHmac('sha256', 'huzaif')
// hmac.update('Hello world')
// const code = hmac.digest('hex')
// console.log(code)

// const hmac2 = crypto.createHmac('sha256', 'huzaif')
// hmac2.update('Hello world')
// const code2 = hmac2.digest('binary')
// console.log(code2)

// console.log(crypto.timingSafeEqual(Buffer.from(code,'hex'), Buffer.from(code2, 'binary')))



// 3. HMAC for Message Verification
// Signature = proof of authenticity

// Function to create an HMAC for a message
const createSignature = (message, key) => {
    const hmac = crypto.createHmac('sha256', key)
    hmac.update(message)
    return hmac.digest('hex')
}

// Function to verify a message's signature
const verifySignature = (message, signature, key) => {
    const expectedSignature = createSignature(message, key)

    return crypto.timingSafeEqual(
        Buffer.from(signature, 'hex'), 
        Buffer.from(expectedSignature, 'hex')
    )
}

const secretKey = 'huzaifibrahim'
const message = 'Hola Amigo'

// Sender creates a signature
const signature = createSignature(message, secretKey)
console.log('Message: ', message)
console.log('Signature :', signature)

//Receiver verifies the signature
try {
    const isValid = verifySignature(message, signature, secretKey)
    console.log("Signature Valid : ", isValid)

    // Try with a tampered message
    const isInvalid = verifySignature(message, signature, 'secretKey')
    console.log('Tampered message valid:', isInvalid)
} catch (error) {
    console.error('Verification error:', error.message)
}
