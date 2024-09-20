import { GroqUi } from "~/components/globals/GroqUi";
import { Navbar } from "~/components/globals/Navbar";
import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const accounts = await api.post.getAccounts();
  console.log("acc", accounts);
  const session = await getServerAuthSession();

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main>
        <Navbar />
        <GroqUi />
      </main>
    </HydrateClient>
  );
}
