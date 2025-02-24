const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const noteController = require('../controllers/notes');

router.get('/notes/public', noteController.publicNotesController);

router.post('/notes', authenticate, noteController.createNote);

router.get('/notes', authenticate, noteController.getUserNotes);

router.get('/notes/:id', authenticate, noteController.getNoteById);

router.put('/notes/:id', authenticate, noteController.updateNote);

router.delete('/notes/:id', authenticate, noteController.deleteNote);

router.post('/notes/:id/share', authenticate, noteController.shareNote);

router.get('/shared-notes/:shareLink', authenticate, noteController.getSharedNote);

router.post('/notes/:id/revoke', authenticate, noteController.revokeShare);

module.exports = router;
