import Layout from "@src/components/Layout";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold mb-4">Welcome to My Notes App</h2>
        <p className="mb-8">Easily manage and share your notes securely.</p>
        <Link href="/notes">
          <span className="px-6 py-3 bg-primary text-white rounded hover:bg-orange-600">
            View My Notes
          </span>
        </Link>
      </div>
    </Layout>
  );
}
