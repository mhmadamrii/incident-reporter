"use client";

import Image from "next/image";

import { Brain } from "lucide-react";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { Textarea } from "~/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { LIST_COMPANIES, TYPE_OF_INCIDENT } from "~/lib/constants";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";

import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "~/components/ui/tooltip";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import {
  cn,
  defineIncidentType,
  generateRandomIncidentStatus,
  generateRandomNumber,
  removeAsterisks,
} from "~/lib/utils";

const FormSchema = z.object({
  company: z.string({
    required_error: "Please select a company to display.",
  }),
  incident_type: z.string({
    required_error: "Please select an incident type to display.",
  }),
  description: z.string({
    required_error: "Please provide more details about the incident.",
  }),
});

export default function Create() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { mutate, isPending: isPendingCreateReport } =
    api.report.createReportIncident.useMutation({
      onSuccess: (res) => {
        toast.success("New Incident report created successfully");
        // @ts-expect-error: expecting an error due to reseting select fields
        form.setValue("company", null);
        // @ts-expect-error: expecting an error due to reseting select fields
        form.setValue("incident_type", null);
        form.setValue("description", "");
      },
      onError: () => {
        console.log("error");
      },
    });

  const {
    mutate: createIncidentByAi,
    isPending: isLoadingAi,
    isSuccess,
  } = api.report.createReportIncidentByAi.useMutation({
    onSuccess: (res) => {
      toast.success("Dummy Incident report created successfully");
      form.setValue("description", removeAsterisks(res.description));
    },
    onError: () => {
      console.log("error");
    },
  });

  const handleGenerateIncidentByAi = () => {
    form.setValue(
      "company",
      LIST_COMPANIES[generateRandomNumber(LIST_COMPANIES.length - 1)]!.name,
    );
    form.setValue(
      "incident_type",
      TYPE_OF_INCIDENT[generateRandomNumber(TYPE_OF_INCIDENT.length - 1)]!.name,
    );

    createIncidentByAi({
      description: `Generate a short incident report (around 1500 characters cannot be more than 1600) for ${form.getValues("company")} involving ${form.getValues("incident_type")}. The report should be structured like a formal incident report without any introductory sentence(like Here is a short incident report for xxxx). With following format: Title Incident, Incident Report Number #XXXX, Type of Incident: (bug/data breach/phishing/ransomware/ddos), Date and Time: (random date), Affected Platform/services: (payment/email/social media/etc), summary.`,
    });
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate({
      title: data.company,
      description: data.description,
      type: defineIncidentType(data.incident_type),
      status: generateRandomIncidentStatus(),
    });
  }

  return (
    <main className="mb-[200px] flex h-screen w-full flex-1 flex-col items-center gap-3 px-6">
      <div className="mt-14 flex h-[100px] w-full flex-col justify-end">
        <h1 className="text-center text-2xl font-bold">
          Create Incident Report
        </h1>
        <h2 className="text-center text-xl font-semibold text-gray-500">
          Report a malicious incident to the world
        </h2>
      </div>

      <Form {...form}>
        <div className="mb-9 flex h-[40px]">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleGenerateIncidentByAi}
                  type="button"
                  className={cn(
                    "flex w-[160px] items-center gap-2 border border-black",
                    {
                      "bg-white hover:bg-white": isLoadingAi,
                    },
                  )}
                >
                  {isLoadingAi ? (
                    <Image
                      alt="loading"
                      src={"/svg/goex.svg"}
                      width={24}
                      height={24}
                    />
                  ) : (
                    <>
                      <Brain />
                      Generate By AI
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Generate random incident report by AI</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-3"
        >
          <div className="flex w-full justify-between gap-3">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Company/Institution</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    disabled={isLoadingAi || isPendingCreateReport}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Company with vulnerability" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="min-h-[200px]">
                      {LIST_COMPANIES.map(({ name, logo }) => (
                        <SelectItem key={name} value={name}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    List of verified companies/institutions.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="incident_type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Incident Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    disabled={isLoadingAi || isPendingCreateReport}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type of incident" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TYPE_OF_INCIDENT.map(({ name, logo }) => (
                        <SelectItem key={name} value={name}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the type of incident related to the report.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Incident Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about your report"
                      {...field}
                      disabled={isLoadingAi || isPendingCreateReport}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a detailed description of the incident.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            className={cn("w-full border border-black", {
              "bg-gray-50": isPendingCreateReport,
            })}
            type="submit"
          >
            {isPendingCreateReport ? (
              <Image
                alt="loading"
                src={"/svg/goex.svg"}
                width={24}
                height={24}
              />
            ) : (
              "Create Report"
            )}
          </Button>
        </form>
      </Form>
    </main>
  );
}
