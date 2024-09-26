"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { cn } from "~/lib/utils";

export function HeaderListReportedIncident({ total }: { total: number }) {
  const router = useRouter();
  return (
    <div className="flex w-full flex-col items-center justify-between py-4 sm:flex-row">
      <h1 className="text-2xl font-bold">
        Reported Incidents <span className="text-gray-500">({total})</span>
      </h1>

      <Button
        onClick={() => router.push("/create/123")}
        className={cn("flex items-center gap-2", {
          "animate-bounce": total === 0,
        })}
      >
        <Plus />
        Report Incident
      </Button>
    </div>
  );
}
