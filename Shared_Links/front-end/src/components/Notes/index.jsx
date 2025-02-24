"use client"
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import NoteCard from "../../components/NotesCard";

const Notes = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:3000/api/notes", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();

            // If your API returns { notes: [...] }, extract the array:
            if (data.notes && Array.isArray(data.notes)) {
                setNotes(data.notes);
            } else if (Array.isArray(data)) {
                // If the API returns an array directly
                setNotes(data);
            } else {
                // Otherwise, set an empty array as a fallback
                setNotes([]);
            }
        };
        fetchNotes();
    }, []);


    return (
        <Layout>
            <div className="mb-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Notes</h2>
                <Link href="/notes/new">
                    <span className="px-4 py-2 bg-primary text-white rounded hover:bg-orange-600">
                        New Note
                    </span>
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {notes && notes?.map((note) => (
                    <NoteCard key={note._id} note={note} />
                ))}
            </div>
        </Layout>
    );
};

export default Notes;
