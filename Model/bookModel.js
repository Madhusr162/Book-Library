const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
// Defining the task schema
const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
},{timestamps: true})


let model=mongoose.model("bookModel", bookSchema);
module.exports=model;