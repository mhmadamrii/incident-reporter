"use client";

import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { useState } from "react";
import { IncidentStatus } from "@prisma/client";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface EditIncidentStatusProps {
  user: any;
  idIncident: number;
}

export function EditIncidentStatus({
  user,
  idIncident,
}: EditIncidentStatusProps) {
  const router = useRouter();
  const [idToEdit, setIdToEdit] = useState(0);

  const { mutate } = api.report.editIncidentStatus.useMutation({
    onSuccess: () => {
      setIdToEdit(0);
      router.refresh();
      toast.success("Incident status updated successfully");
    },
    onError: () => {
      toast.error("Error updating incident status");
    },
  });

  const handleEditIncidentStatus = (status: IncidentStatus) => {
    mutate({
      id: idToEdit,
      status: status,
    });
  };

  return (
    <DropdownMenu>
      {user?.name ? (
        <DropdownMenuTrigger
          asChild
          onPointerDown={() => setIdToEdit(idIncident)}
        >
          <Button variant="outline">
            <Pencil size={18} />
          </Button>
        </DropdownMenuTrigger>
      ) : (
        <Button
          variant="outline"
          onClick={() =>
            toast.error("You must be logged in to edit incident status")
          }
        >
          <Pencil size={18} />
        </Button>
      )}
      <DropdownMenuContent>
        <DropdownMenuLabel>Edit Incident Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleEditIncidentStatus("OPEN")}>
            Open
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleEditIncidentStatus("IN_PROGRESS")}
          >
            In Progress
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleEditIncidentStatus("FIXED")}>
            Fixed
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleEditIncidentStatus("CLOSED")}>
            Closed
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
