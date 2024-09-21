import { Suspense } from "react";
import { SearchIncidents } from "~/components/globals/search-incidents";
import { ListReportedIncidents } from "~/components/globals/list-reported-incidents";
import { ListReportedIncidentSkeleton } from "~/components/globals/list-reported-incident-skeleton";

export default async function Home() {
  return (
    <main className="mt-24 flex flex-col items-center justify-center gap-4 p-4">
      <SearchIncidents />
      <Suspense fallback={<ListReportedIncidentSkeleton />}>
        <ListReportedIncidents />
      </Suspense>
    </main>
  );
}
