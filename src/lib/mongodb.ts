import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Extend the global namespace to include mongoose caching
declare global {
    var mongoose: { conn: Mongoose | null; promise: Promise<Mongoose> | null };
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connect() {
    // Use the cached connection if available
    if (cached.conn) {
        return cached.conn;
    }

    // Create a new promise if there is no cached promise
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts)
        .then((mongooseInstance) => {
            return mongooseInstance;
        })
        .catch((err) => {
            console.error('Mongoose connection error:', err);
            cached.promise = null; // Reset promise if connection fails
            throw err;
        });
    }

    // Wait for the promise to resolve if it's not yet connected
    cached.conn = await cached.promise;
    return cached.conn;
}

export default connect;