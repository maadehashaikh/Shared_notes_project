"use client"
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../Layout";

const NoteDetail = () => {
    const router = useRouter();
    const { id } = useParams();
    const [note, setNote] = useState(null);

    useEffect(() => {
        if (id) {
            const token = localStorage.getItem("token");
            fetch(`http://localhost:3000/api/notes/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => res.json())
                .then((data) => setNote(data));
        }
    }, [id]);

    if (!note) return <Layout><p>Loading...</p></Layout>;

    const handleDelete = async () => {
        const token = localStorage.getItem("token");
        await fetch(`http://localhost:3000/api/notes/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        router.push("/notes");
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
                <h2 className="text-2xl font-bold mb-4">{note.title || "Untitled"}</h2>
                <p className="mb-4">{note.content}</p>
                <div className="flex justify-between">
                    <Link href={`/notes/${id}/edit`}>
                        <span className="px-4 py-2 bg-primary text-white rounded hover:bg-orange-600">Edit</span>
                    </Link>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default NoteDetail;
