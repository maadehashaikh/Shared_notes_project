"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import NoteCard from "../NotesCard";
import Layout from "../Layout";

const PublicNotes = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchPublicNotes = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/notes/public");
                const data = await res.json();
                if (Array.isArray(data)) {
                    setNotes(data);
                } else {
                    console.error("Unexpected response:", data);
                    setNotes([]);
                }
            } catch (error) {
                console.error("Error fetching public notes:", error);
            }
        };
        fetchPublicNotes();
    }, []);

    return (
        <Layout>
            <div className="mb-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Public Notes</h2>
                <Link href="/notes">
                    <span className="px-4 py-2 bg-primary text-white rounded hover:bg-orange-600">
                        Back to My Notes
                    </span>
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {notes.map((note) => (
                    <NoteCard key={note._id} note={note} />
                ))}
            </div>
        </Layout>
    );
};

export default PublicNotes;
