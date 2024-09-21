import { Bug } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function SearchIncidents() {
  return (
    <main className="flex w-full flex-col items-center justify-center gap-4 p-4">
      <div className="flex w-full flex-col items-center justify-center gap-1">
        <h1 className="flex items-end gap-2 text-4xl font-bold">
          <span className="flex h-full items-center gap-2">
            <Bug />
            Incident Report
          </span>
          <span className="text-[12px] text-slate-500">
            {" "}
            Powered By Groq.ai
          </span>
        </h1>
        <p className="text-md text-gray-500">
          Track and review incidents of downtime and their resolution status
        </p>
      </div>

      <div className="flex w-1/2 items-center gap-2">
        <Input
          type="text"
          placeholder="Search incidents"
          className="rounded-md bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
        />
        <Button className="h-full w-1/4">Search</Button>
      </div>
    </main>
  );
}
