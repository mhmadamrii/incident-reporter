import Link from "next/link";
import { Github } from "lucide-react";

export function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between gap-4 bg-white/10 px-4 py-6">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-2xl font-bold">
          Incident Reporter
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link
          className="rounded-full bg-black px-3 py-3 text-white transition-all"
          href="https://github.com/daniel-radcliffe/incident-reporter"
        >
          <Github />
        </Link>
        <Link
          className="rounded-full bg-blue-500 px-6 py-3 text-white transition-all hover:bg-blue-400"
          href="/login"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
