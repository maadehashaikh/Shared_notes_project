const crypto = require('crypto');
const Notes = require('../models/notes');

const createNote = async (req, res) => {
    try {
        const { title, content, private } = req.body;
        const note = new Notes({
            title,
            content,
            owner: req.user.id,
            private: typeof private !== 'undefined' ? private : true,
        });
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};

const publicNotesController = async (req, res) => {
    try {
        const publicNotes = await Notes.find({ private: false });
        res.json(publicNotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getUserNotes = async (req, res) => {
    try {
        const notes = await Notes.find({ owner: req.user.id });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getNoteById = async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);
        if (!note)
            return res.status(404).json({ message: 'Note not found' });

        if (note.owner.toString() !== req.user.id && note.private) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateNote = async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);
        if (!note)
            return res.status(404).json({ message: 'Note not found' });

        if (note.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const { title, content, private } = req.body;
        if (title !== undefined) note.title = title;
        if (content !== undefined) note.content = content;
        if (private !== undefined) note.private = private;

        await note.save();
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteNote = async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);
        if (!note)
            return res.status(404).json({ message: 'Note not found' });

        if (note.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        await note.remove();
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const shareNote = async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);
        if (!note)
            return res.status(404).json({ message: 'Note not found' });

        if (note.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const shareLink = crypto.randomBytes(16).toString('hex');
        note.isShared = true;
        note.shareLink = shareLink;
        note.private = false;

        await note.save();
        res.json({ shareLink });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSharedNote = async (req, res) => {
    try {
        const note = await Notes.findOne({
            shareLink: req.params.shareLink,
            isShared: true,
        });
        if (!note)
            return res.status(404).json({ message: 'Shared note not found' });
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const revokeShare = async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);
        if (!note)
            return res.status(404).json({ message: 'Note not found' });

        if (note.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        note.isShared = false;
        note.shareLink = null;
        note.private = true;
        await note.save();
        res.json({ message: 'Shared access revoked successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createNote,
    revokeShare,
    getSharedNote,
    shareNote,
    deleteNote,
    updateNote,
    getNoteById,
    getUserNotes,
    publicNotesController
}