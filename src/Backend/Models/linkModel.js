import mongoose from "mongoose";

const userLinkSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    originalUrl: {
        type: String,
        required: true,
        trim: true,
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    numberOfVisits: {
        type: Number,
        default: 0,
    },
    expiresAt: {
        type: Date,
        default: null,
    },
});

const sessionLinkSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        ref: "User",
    },
    originalUrl: {
        type: String,
        required: true,
        trim: true,
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    numberOfVisits: {
        type: Number,
        default: 0,
    },
    expiresAt: {
        type: Date,
        default: null,
    },
});

export const userLink = mongoose.model("userLink", userLinkSchema);
export const sessionLink = mongoose.model("sessionLink", sessionLinkSchema);
