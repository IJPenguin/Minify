import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
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
});

const Link = mongoose.model("Link", linkSchema);
module.exports = Link;
