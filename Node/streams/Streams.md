👉🏻 What are Streams?
    📌In Node.js, streams are collections of data, which might not be available in full at once and don't have to fit in memory.

    📌 Think of them as conveyor belts that move data from one place to another, allowing you to work with each piece as it arrives rather than waiting for the whole dataset.

👉🏻 Streams are one of Node.js's most powerful features and are used extensively in:
    🔸File system operations (reading/writing files)
    🔸HTTP requests and responses
    🔸Data compression and decompression
    🔸Database operations
    🔸Real-time data processing

👉🏻 They allow you to process data in chunks as it becomes available, rather than loading everything into memory at once.

👉🏻 Why Use Streams?
    📌There are several advantages to using streams:

        🔸Memory Efficiency: Process large files without loading them entirely into memory
        🔸Time Efficiency: Start processing data as soon as you have it, instead of waiting for all the data
        🔸Composability: Build powerful data pipelines by connecting streams
        🔸Better User Experience: Deliver data to users as it becomes available (e.g., video streaming)

Note: All streams in Node.js are instances of EventEmitter, which means they emit events that can be listened to and handled.