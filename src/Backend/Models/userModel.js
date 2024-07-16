import mongoose, { connect } from "mongoose";
import connection from "./database.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    hash: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true,
        lowercase: true,
        validate: {
            validator: (email) => {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
            },
            message: () => `Not a valid email address!`,
        },
    },
    premiumSubscription: {
        type: Boolean,
        default: false,
    },
    numberOfUrlsCreated: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
});

const User = mongoose.model("User", userSchema);
export default User;
