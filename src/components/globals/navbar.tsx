import Link from "next/link";

import { Github } from "lucide-react";
import { getServerAuthSession } from "~/server/auth";

import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "~/components/ui/tooltip";

export async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <nav className="sticky left-0 right-0 top-0 z-50 flex w-full items-center justify-between gap-4 border-b border-b-slate-100 bg-white/10 px-4 py-6 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-2xl font-bold">
          Incident Reporter
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link
          className="rounded-full bg-black px-2 py-2 text-white transition-all"
          href="https://github.com/mhmadamrii/incident-reporter"
        >
          <Github />
        </Link>
        {session ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="rounded-full bg-red-500 px-4 py-2 text-white transition-all hover:bg-red-400"
                  href="/api/auth/signout"
                >
                  Logout
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Logged in as {session.user?.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Link
            className="rounded-full bg-blue-500 px-4 py-2 text-white transition-all hover:bg-blue-400"
            href="/api/auth/signin"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
