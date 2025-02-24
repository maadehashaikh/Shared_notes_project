// components/NoteForm.js
import { useState } from "react";

const NoteForm = ({ onSubmit, initialData = {} }) => {
    const [title, setTitle] = useState(initialData.title || "");
    const [content, setContent] = useState(initialData.content || "");
    const [isPrivate, setIsPrivate] = useState(
        typeof initialData.private !== "undefined" ? initialData.private : true
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, content, private: isPrivate });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded"
                required
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 border rounded"
                required
            />
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                    className="mr-2"
                />
                <label>Private Note</label>
            </div>
            <button type="submit" className="w-full py-2 bg-primary text-white rounded">
                Save Note
            </button>
        </form>
    );
};

export default NoteForm;
