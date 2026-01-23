👉🏻 What is the Crypto Module?
        The Crypto module is a built-in Node.js module that provides cryptographic functionality including:

        🔸Hash functions (SHA-256, SHA-512, etc.)
        🔸HMAC (Hash-based Message Authentication Code)
        🔸Symmetric encryption (AES, DES, etc.)
        🔸Asymmetric encryption (RSA, ECDSA, etc.)
        🔸Digital signatures and verification
        🔸Secure random number generation

        The Crypto module is essential for applications that need to handle sensitive information securely.

        The Crypto module wraps the OpenSSL library, providing access to well-established and tested cryptographic algorithms.

        This module is often used to handle sensitive data, such as:
        🔸User authentication and password storage
        🔸Secure data transmission
        🔸File encryption and decryption
        🔸Secure communication channels


👉🏻 HASHING-----
    📌 Key Characteristics(Hashing not hmac):
            🔸 Fixed-Size Output: Regardless of the input's size (a single word or a whole book), the digest always has the same length (e.g., 256 bits for SHA-256).
            🔸 One-Way Function: It's computationally infeasible to reverse the process and reconstruct the original message from its digest.
            🔸 Deterministic: The same input message will always produce the exact same digest.
            🔸 Avalanche Effect: A small change in the input message (like changing one character) produces a drastically different digest. 


👉🏻 COMMON HASH ALGORITHMS---- go to algorithm.js


👉🏻 PASSWORD-----
    📌 Key Concepts for Password Security
        🔸 Salting: Add a unique random value to each password before hashing
        🔸 Key Stretching: Make the hashing process intentionally slow to prevent brute-force attacks
        🔸 Work Factor: Control how computationally intensive the hashing process is

    📌 What is a salt?
        A salt is a random string that is unique to each user.
        It's combined with the password before hashing to ensure that even if two users have the same password, their hashes will be different.
        This prevents attackers from using precomputed tables (like rainbow tables) to crack multiple passwords at once.


👉🏻 HMAC(Hash-based Message Authentication Code)-----    
    1️⃣ What is HMAC?
            HMAC = Hash-based Message Authentication Code
            In simple words:
            HMAC proves that a message is authentic and unchanged, using a secret key.
            It answers two questions:
                ❓ Was this message modified? (Integrity)
                ❓ Did it come from someone who knows the secret key? (Authenticity)

    📌 HMAC is a specific type of message authentication code (MAC) involving a cryptographic hash function and a secret cryptographic key.
    It provides both data integrity and authentication.

    📌 When to Use HMAC
           🔸API request verification
           🔸Secure cookies and sessions
           🔸Data integrity checks
           🔸Webhook verification

    📌 HMAC Security Properties
        🔸Message Integrity: Any change to the message will produce a different HMAC
        🔸Authenticity: Only parties with the secret key can generate valid HMACs
        🔸No Encryption: HMAC doesn't encrypt the message, only verifies its integrity








# Symmetric vs Asymmetric Encryption (Notes)

## Symmetric Encryption
- Uses **one secret key** for both encryption and decryption
- Same key must be shared securely between sender and receiver
- **Fast** and efficient
- Used after a secure connection is established

### Key Points
- Reversible (unlike hashing)
- Key secrecy is critical
- Not used for password storage

### Common Algorithms
- AES

### Used In
- HTTPS (after handshake)
- Encrypting data at rest
- Secure cookies or session data

### Limitations
- Key distribution problem (how to share the secret safely)

---

## Asymmetric Encryption
- Uses **two keys**:
  - Public key (shared)
  - Private key (kept secret)
- Data encrypted with one key can only be decrypted with the other
- **Slower** than symmetric encryption

### Key Points
- Solves the key distribution problem
- Enables trust and identity verification
- Often used to exchange symmetric keys

### Common Algorithms
- RSA
- ECC

### Used In
- HTTPS (TLS handshake)
- JWT signing with public/private keys
- Digital signatures

### Limitations
- Computationally expensive
- Not used for large data encryption

---

## Relationship Between Them
- Asymmetric encryption is used to **establish trust**
- Symmetric encryption is used for **actual data transfer**
- Most real systems use **both together**

---

## Web Development Context
- Passwords → hashed (not encrypted)
- JWT → signed (HMAC or asymmetric)
- Encryption is usually handled by HTTPS, not application code
