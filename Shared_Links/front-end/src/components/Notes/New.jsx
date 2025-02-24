"use client"
import Layout from "../../components/Layout";
import { useRouter } from "next/navigation";
import NoteForm from "../NotesForm";

const NewNote = () => {
    const router = useRouter();

    const handleCreate = async (noteData) => {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(noteData),
        });
        if (res.ok) router.push("/notes");
    };

    return (
        <Layout>
            <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
                <h2 className="text-2xl font-bold mb-4">Create New Note</h2>
                <NoteForm onSubmit={handleCreate} />
            </div>
        </Layout>
    );
};

export default NewNote;
