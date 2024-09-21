import { IncidentStatus } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomNumber(max: number): number {
  return Math.floor(Math.random() * max) + 1;
}

export function removeAsterisks(str: string): string {
  return str.replace(/\*/g, "");
}

export function defineIncidentType(type: string) {
  switch (type) {
    case "Data Breach":
      return "DATA_BREACH";
    case "Malware":
      return "MALWARE";
    case "Phishing":
      return "PHISHING";
    case "Ransomware":
      return "RANSOMWARE";
    case "DDoS":
      return "DDOS";
    case "Bug":
      return "BUG";
    default:
      return "DATA_BREACH";
  }
}

export function defineRenderIncidentType(type: string) {
  switch (type) {
    case "DATA_BREACH":
      return "Data Breach";
    case "MALWARE":
      return "Malware";
    case "PHISHING":
      return "Phishing";
    case "RANSOMWARE":
      return "Ransomware";
    case "DDOS":
      return "DDoS";
    case "BUG":
      return "Bug";
    default:
      return "Data Breach";
  }
}

export function defineRenderIncidentStatus(status: string) {
  switch (status) {
    case "OPEN":
      return "Open";
    case "IN_PROGRESS":
      return "In Progress";
    case "FIXED":
      return "Fixed";
    case "CLOSED":
      return "Closed";
    default:
      return "Open";
  }
}

export function extractIncidentDetails(description: string) {
  const incidentNumberMatch = description.match(
    /Incident Report Number\s*#([^\n]+)/,
  );
  const typeMatch = description.match(/Type of Incident:\s*([^\n]+)/);
  const dateMatch = description.match(/Date and Time:\s*([^\n]+)/);
  const platformMatch = description.match(
    /Affected Platform\/services:\s*([^\n]+)/,
  );
  const summaryMatch = description.match(/Summary:\s*([\s\S]*)/);

  return {
    incidentNumber: incidentNumberMatch
      ? incidentNumberMatch[1]!.trim()
      : "Untracked Issue Number",
    type: typeMatch ? typeMatch[1]!.trim() : "N/A",
    dateAndTime: dateMatch ? dateMatch[1]!.trim() : "N/A",
    affectedPlatform: platformMatch ? platformMatch[1]!.trim() : "N/A",
    summary: summaryMatch ? summaryMatch[1]!.trim() : "N/A",
  };
}

export function generateRandomIncidentStatus(): IncidentStatus {
  const incidentStatuses = ["OPEN", "IN_PROGRESS", "FIXED", "CLOSED"];
  return incidentStatuses[
    generateRandomNumber(incidentStatuses.length - 1)
  ] as IncidentStatus;
}
