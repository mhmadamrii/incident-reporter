import { HydrateClient, api } from "~/trpc/server";
import { NoIncidentReported } from "./no-incident-reported";
import { HeaderListReportedIncident } from "./header-list-reported-incident";
import { EditIncidentStatus } from "./edit-incident-status";
import { getServerAuthSession } from "~/server/auth";

import {
  cn,
  defineRenderIncidentStatus,
  defineRenderIncidentType,
  extractIncidentDetails,
} from "~/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export async function ListReportedIncidents() {
  const incidents = await api.report.getReportedIncidents();
  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      <section className="flex w-3/4 flex-col gap-4 px-4">
        <HeaderListReportedIncident total={incidents.length} />
        <div className="flex flex-col gap-3">
          {incidents.map(({ id, company, description, status, type }) => (
            <Card key={id} className="w-full cursor-pointer hover:bg-gray-50">
              <CardHeader>
                <CardTitle className="flex w-full items-center justify-between">
                  <div>
                    {company} |{" "}
                    {extractIncidentDetails(description).incidentNumber}
                  </div>

                  <EditIncidentStatus user={session?.user} idIncident={id} />
                </CardTitle>
                <CardDescription>
                  {extractIncidentDetails(description).summary}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <div>
                    <h1>{defineRenderIncidentType(type)}</h1>
                  </div>

                  <div className="flex gap-2">
                    <h1>{extractIncidentDetails(description).dateAndTime}</h1>
                    <div
                      className={cn("flex gap-2", {
                        "flex w-[100px] items-center justify-center rounded-md bg-red-200 text-red-600":
                          status === "OPEN",
                        "flex w-[100px] items-center justify-center rounded-md bg-green-200 text-green-600":
                          status === "FIXED",
                        "flex w-[100px] items-center justify-center rounded-md bg-yellow-200 text-yellow-600":
                          status === "IN_PROGRESS",
                        "flex w-[100px] items-center justify-center rounded-md bg-gray-200 text-gray-600":
                          status === "CLOSED",
                      })}
                    >
                      <h1
                        className={cn("text-center", {
                          "animate-pulse": status === "OPEN",
                        })}
                      >
                        {defineRenderIncidentStatus(status)}
                      </h1>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {incidents.length === 0 && <NoIncidentReported />}
      </section>
    </HydrateClient>
  );
}
