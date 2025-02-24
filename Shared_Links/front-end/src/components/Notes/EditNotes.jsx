"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NoteForm from "../NotesForm";
import Layout from "../Layout";

const EditNote = () => {
  const router = useRouter();
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (id) {
      const token = localStorage.getItem("token");
      fetch(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setInitialData(data));
    }
  }, [id]);

  const handleUpdate = async (noteData) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(noteData),
    });
    if (res.ok) router.push(`/notes/${id}`);
  };

  if (!initialData)
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );

  return (
    <Layout>
      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Edit Note</h2>
        <NoteForm onSubmit={handleUpdate} initialData={initialData} />
      </div>
    </Layout>
  );
};

export default EditNote;
