const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');    //input ko validate bhi krenge ki note khali nhii hona chaiye


// Route 1  Get all the notes using: Post "/api/notes//fetchallnotes". login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error..");
    }


})

// Route 2  Add a new note using: Post "/api/notes/addnote". login required

router.post("/addnote", fetchuser, [
    body('title', "enter a valid title").isLength({ min: 3 }),
    body('description', "Description must be atleast 5 characters").isLength({ min: 5 }),], async (req, res) => {
        try {

            // destructing concept usekiya hai humne req.body mai se title ,des , tag ko nikalne ke liye
            const { title, description, tag } = req.body;
            // if there are error return bad request and the error.
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Notes({
                title, description, tag, user: req.user.id,
            })
            const savedNote = await note.save()
            res.json(savedNote)
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal Server Error..");
        }

    })


// Route 3:  Update an existing Note using: Put "/api/notes/updatenote". login required
// humne isme id bhi li hai jo login hai whi update kr payenge bus
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // create a new note object 
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // find the note to be updated and update
        let note = await Notes.findById(req.params.id);     //ye param.id wo id jo humne upar di hai router.put mai
        if (!note) {
            return res.status(404).send("Not Found");
        }

        // niche wale code mai kya ho rha hai ki note.user.toString() !== hai req.user.id ki  
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        // niche line mai kya ho rha hai req.params.id se id le li fhir update kr dega new note humne diya hai or new ko true kr diya hai humne iska mtlb koi naya contact aata hai toh wo create ho jayga Basically..

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error..");
    }
})


// Route 4:  Delete an existing Note using: Delete "/api/notes/updatenote". login required
// humne isme id bhi li hai jo login hai whi Delete kr payega bus
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    
    try {


        // find the note to be delete and delete it.
        let note = await Notes.findById(req.params.id);     //ye param.id wo id jo humne upar di hai router.put mai
        if (!note) {
            return res.status(404).send("Not Found");
        }
        // Allow Deletion onlyif user owns this note
        // niche wale code mai kya ho rha hai ki note.user.toString() !== hai req.user.id ki  
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        // niche line mai kya ho rha hai req.params.id se id le li fhir update kr dega new note humne diya hai or new ko true kr diya hai humne iska mtlb koi naya contact aata hai toh wo create ho jayga Basically..

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error..");
    }
})
module.exports = router