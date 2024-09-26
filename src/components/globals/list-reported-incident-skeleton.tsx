import { Skeleton } from "../ui/skeleton";

export function ListReportedIncidentSkeleton() {
  return (
    <section className="flex w-full flex-col gap-3 p-4 sm:w-3/4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <div className="flex w-full flex-row gap-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </section>
  );
}
