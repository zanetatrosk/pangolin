import { FC } from "react";
import { Button } from "@/components/ui/button";
import { RsvpStatus, RegistrationAction } from "@/services/types";
import { useUpdateRegistrationStatus } from "@/hooks/useUpdateRegistrationStatus";
import { OrganizerAction } from "./types";

interface SelectedRow {
  id: string;
  userId?: string;
  q_status?: RsvpStatus;
  [key: string]: any;
}

interface SelectionActionBarProps {
  selectedRows: SelectedRow[];
  eventId: string;
}

const generateStatusOptions = () => {
  return [
    {
      label: "copy email address/s",
      type: "outline" as const,
      value: "copy_email",
      statuses: [],
    },
    {
      label: "Accept registration",
      type: "outline" as const,
      value: "accepted",
      statuses: [RsvpStatus.Pending],
    },
    {
      label: "Cancel registration",
      type: "destructive" as const,
      value: "rejected",
      statuses: [RsvpStatus.Pending, RsvpStatus.Going, RsvpStatus.Waitlisted],
    },
    
  ];
};
export const SelectionActionBar: FC<SelectionActionBarProps> = ({
  selectedRows,
  eventId,
}) => {
  const updateRegistration = useUpdateRegistrationStatus();
  
  if (selectedRows.length === 0) return null;

  // Get unique statuses from selected rows
  const selectedStatuses = Array.from(
    new Set(selectedRows.map((row) => row.q_status).filter(Boolean)),
  );

  const onEmailSelected = () => {
    const emails = selectedRows
      .map((row) => row.q_email)
      .filter((email) => !!email);
    if (emails.length > 0) {
      navigator.clipboard.writeText(emails.join(", ")).then(
        () => {
          alert("Email addresses copied to clipboard!");
        },
        (err) => {
          alert("Failed to copy email addresses: " + err);
        },
      );
    } else {
      alert("No email addresses found for the selected rows.");
    }
  };

  const handleBulkAction = async (action: OrganizerAction) => {
    // Map OrganizerAction to RegistrationAction
    const registrationAction = action === OrganizerAction.APPROVE 
      ? RegistrationAction.APPROVE 
      : RegistrationAction.REJECT;
    
    try {
      await Promise.all(
        selectedRows.map((row) =>
          updateRegistration.mutateAsync({
            eventId,
            registrationId: row.id,
            request: { action: registrationAction },
          })
        )
      );
      
      alert(`Successfully updated ${selectedRows.length} registration(s)`);
    } catch (error) {
      alert("Failed to update registrations");
    }
  };

  const selectRightAction = (value: string) => {
    switch (value) {
      case "copy_email":
        onEmailSelected();
        break;
      case "accepted":
        handleBulkAction(OrganizerAction.APPROVE);
        break;
      case "rejected":
        handleBulkAction(OrganizerAction.REJECT);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex items-center justify-between rounded-md border bg-muted/50 p-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
          {selectedRows.length} {selectedRows.length === 1 ? "row" : "rows"} selected
        </span>
      </div>
      <div className="flex items-center gap-2">
        {generateStatusOptions().map((option) => (
          <Button
            key={option.value}
            variant={option.type}
            onClick={() => selectRightAction(option.value)}
            disabled={
              updateRegistration.isPending ||
              (option.value !== "copy_email" &&
              !option.statuses.some((status) =>
                selectedStatuses.includes(status),
              ))
            }
            >{option.label}</Button>
        ))}
      </div>
    </div>
  );
};
