const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');
const router = express.Router();


//Route 1: get all the notes
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

// Route 2: make notes login required

router.post('/addnotes', fetchuser, [
    body('title', 'Title must be atleast 3 characters long').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters long').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        //Two methods to save the notes. 1st method
        // const note=new Notes({
        //     title,description,tag,user:req.user.id
        // })
        // const snote = await note.save();

        //2nd method
        const note = await Notes.create({
            title: title,
            description: description,
            tag: tag,
            user: req.user.id
        })
        res.json(note);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

// Route 3: update a note, login required
router.put('/updatenote/:id', fetchuser, [
    body('title', 'Title must be atleast 3 characters long').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters long').isLength({ min: 5 })
], async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        //create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // find the note and update it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(400).send("Not Found");
        }
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }

})

// Route 4: delete note
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(400).send("Not Found");
        }
        //allow only when user owns the note
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }

})
module.exports = router;