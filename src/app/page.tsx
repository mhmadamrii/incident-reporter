import { Suspense } from "react";
import { HeaderIncidentReport } from "~/components/globals/header-incident-report";
import { ListReportedIncidents } from "~/components/globals/list-reported-incidents";
import { ListReportedIncidentSkeleton } from "~/components/globals/list-reported-incident-skeleton";

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  return (
    <main className="sm:mt-15 mt-10 flex flex-col items-center justify-center gap-4 p-0 sm:p-4">
      <HeaderIncidentReport />
      <Suspense fallback={<ListReportedIncidentSkeleton />}>
        <ListReportedIncidents searchParams={searchParams.search} />
      </Suspense>
    </main>
  );
}
