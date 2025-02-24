// components/NoteCard.js
import Link from "next/link";

const NoteCard = ({ note }) => (
    <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold text-lg">{note.title || "Untitled"}</h3>
        <p className="text-sm text-gray-700">{note.content.substring(0, 100)}...</p>
        <Link href={`/notes/${note._id}`}>
            <span className="text-primary mt-2 inline-block hover:underline">View Note</span>
        </Link>
    </div>
);

export default NoteCard;
