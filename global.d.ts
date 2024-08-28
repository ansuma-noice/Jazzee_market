// global.d.ts
import mongoose from 'mongoose';

declare global {
    var mongoose: {
        conn: mongoose.Connection | null;
        promise: Promise<mongoose.Connection> | null;
    };
}

// This is necessary to ensure TypeScript treats this file as a module
export {};
