const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bookModel = mongoose.model("bookModel");

// To get all the books from the database
router.get("/books", (req, res) => {
    bookModel.find().sort({ createdAt: 'desc' })//fetching it in the descending order
        .then((dbBooks) => {
            res.status(200).json({ books: dbBooks })//retriving the books
        })
        .catch((error) => {
            console.log(error);
        })
})

// Getting the book with its ID
router.get("/book/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await bookModel.findById(id);
        if (!book) {//checking whether book exist
            return res.status(404).json({ success: false, message: "Book not found" })
        }
        // returning the success response
        return res.status(200).json({ success: true, book: book });
    } catch (error) {//returning the error if any
        console.error('Error fetching book details:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
})

// To create a new book
router.post("/createBook", async (req, res) => {

    const { title, description, author, price } = req.body

    if (!title || !description || !author || !price) {//checking whether content is filled
        return res.status(400).json({ error: "one or more mandatory field is missing" });
    } else {
        const book = new bookModel({//creating new book 
            title,
            description,
            author,
            price
        });
        book.save()//saving the book
            .then((dbBook) => {
                res.status(201).json({ success: true, book: dbBook });//returning the book status with its value
            })
            .catch((error) => {//catch the error and consoling it
                console.error(error);
                res.status(500).json({ success: false, message: 'Internal server error' });
            });
    }
});

// to update the task
router.put("/book/:id/update", async (req, res) => {

    const bookIdToUpdate = req.params.id;
    console.log(bookIdToUpdate);
    try {
        if (bookIdToUpdate) {
            const { title, description, author, price } = req.body
            if (!title || !description || !author || !price) {//checking whether content is filled
                return res.status(400).json({ error: "one or more mandatory field is missing" });
            } else {
                await bookModel.findByIdAndUpdate(bookIdToUpdate, { title, description, author, price });
                res.status(201).json({ result: "Details updated" });
            }
        } else {
            return res.status(404).json({ error: `Book with this ${bookIdToUpdate} not found` })
        }

    } catch (error) {
        console.error('Error updating book details:', error);
        return res.status(500).json({ error: "Internal server error" });
    }

})

// to delete the book
router.delete("/book/:id/delete", async (req, res) => {
    const book = await bookModel.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ error: `Book not found with this id ${req.params.id}` })
        }
        // delete the product
        await book.deleteOne();
        res.status(200).json({
            success: true,
            message: "book deleted successfully"
        })
})

module.exports = router;