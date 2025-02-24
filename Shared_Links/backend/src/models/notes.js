const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
    {
        title: { type: String },
        content: { type: String },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        isShared: { type: Boolean, default: false },
        shareLink: { type: String, default: null },
        private: { type: Boolean, default: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Note', noteSchema);
