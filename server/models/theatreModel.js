const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    seatingLayout: {
        rows: Number,
        columns: Number,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: false
    }
},
    { timestamps: true }
);

const TheatreModel = mongoose.model("theatres", theatreSchema);
module.exports = TheatreModel;