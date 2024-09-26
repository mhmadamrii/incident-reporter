import { Bug } from "lucide-react";
import { SearchIncidentReport } from "./search-incident-report";

export function HeaderIncidentReport() {
  return (
    <main className="flex w-full flex-col items-center justify-center gap-4 p-4">
      <div className="flex w-full flex-col items-center justify-center gap-1">
        <h1 className="flex flex-col items-end gap-2 text-center text-4xl font-bold sm:flex-row sm:text-left">
          <span className="flex h-full items-center gap-2">
            <Bug />
            Incident Report
          </span>
          <span className="text-center text-[12px] text-slate-500 sm:text-left">
            {" "}
            Powered By Groq.ai
          </span>
        </h1>
        <p className="text-md text-center text-gray-500 sm:text-left">
          Track and review incidents of downtime and their resolution status
        </p>
      </div>

      <SearchIncidentReport />
    </main>
  );
}
