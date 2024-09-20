import { Suspense } from "react";

import { SearchIncidents } from "~/components/globals/search-incidents";
import { GroqUi } from "~/components/globals/GroqUi";
import { Navbar } from "~/components/globals/navbar";
import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { ListReportedIncidents } from "~/components/globals/list-reported-incidents";

export default async function Home() {
  const accounts = await api.post.getAccounts();
  console.log("acc", accounts);
  const session = await getServerAuthSession();

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex flex-col items-center justify-center gap-4 p-4">
        <Navbar />
        <SearchIncidents />
        <Suspense fallback={<div>Loading...</div>}>
          <ListReportedIncidents />
        </Suspense>
      </main>
    </HydrateClient>
  );
}
