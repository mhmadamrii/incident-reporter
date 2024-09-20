export function Navbar() {
  return (
    <nav className="flex items-center justify-between gap-4 bg-white/10 px-4 py-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Incident Reporter</h1>
      </div>
      <div className="flex items-center gap-4">
        <a
          className="rounded-full bg-white/10 px-4 py-2 font-semibold no-underline transition hover:bg-white/20"
          href="/api/auth/signin"
        >
          Sign in
        </a>
        <a
          className="rounded-full bg-white/10 px-4 py-2 font-semibold no-underline transition hover:bg-white/20"
          href="/api/auth/signup"
        >
          Sign up
        </a>
      </div>
    </nav>
  );
}
