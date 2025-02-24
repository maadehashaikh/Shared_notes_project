import Link from "next/link";

const Header = () => {
    return (
        <header className="bg-primary text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">
                    <Link href="/">Notes App</Link>
                </h1>
                <nav>
                    <Link href="/notes">
                        <span className="mr-4 hover:underline">My Notes</span>
                    </Link>
                    <Link href="/notes/public">
                        <span className="mr-4 hover:underline">Public Notes</span>
                    </Link>
                    <Link href="/login">
                        <span className="hover:underline">Login</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
