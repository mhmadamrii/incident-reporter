"use client";

import { Bug } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function ListReportedIncidents() {
  const router = useRouter();
  return (
    <section className="flex w-3/4 flex-col gap-4 px-4">
      <div className="flex w-full items-center justify-between py-4">
        <h1 className="text-2xl font-bold">
          Reported Incidents <span className="text-gray-500">(0)</span>
        </h1>

        <Button
          onClick={() => router.push("/create/123")}
          className="flex items-center gap-2"
        >
          <Bug />
          Report Incident
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <Card key={i} className="w-full cursor-pointer hover:bg-gray-50">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non,
                aliquam?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <div>
                  <h1>Company name</h1>
                </div>

                <div>
                  <h1>Incident name</h1>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
