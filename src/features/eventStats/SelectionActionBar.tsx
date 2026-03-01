import { FC } from "react";
import { Button } from "@/components/ui/button";
import { RsvpStatus, RegistrationAction } from "@/services/types";
import { useUpdateRegistrationStatus } from "@/hooks/useUpdateRegistrationStatus";
import { OrganizerAction } from "./types";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

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

const generateStatusOptions = (t: (key: string) => string) => {
  return [
    {
      label: t("eventStats.actions.copyEmails"),
      type: "outline" as const,
      value: "copy_email",
      statuses: [],
    },
    {
      label: t("eventStats.actions.acceptRegistration"),
      type: "outline" as const,
      value: "accepted",
      statuses: [RsvpStatus.Pending],
    },
    {
      label: t("eventStats.actions.cancelRegistration"),
      type: "destructive" as const,
      value: "rejected",
      statuses: [RsvpStatus.Pending, RsvpStatus.Registered, RsvpStatus.Waitlisted],
    },
    
  ];
};
export const SelectionActionBar: FC<SelectionActionBarProps> = ({
  selectedRows,
  eventId,
}) => {
  const { t } = useTranslation();
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
          toast.success(t("eventStats.messages.emailsCopied", { count: emails.length }));
        },
        (err) => {
          toast.error(t("eventStats.messages.emailsCopyFailed") + ": " + err);
        },
      );
    } else {
      toast.info(t("eventStats.messages.noEmails"));
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
      
      toast.success(t("eventStats.messages.updateSuccess"));
    } catch (error) {
      toast.error(t("eventStats.messages.updateFailed"));
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
          {selectedRows.length === 1 ? t("eventStats.actions.rowSelected", { count: selectedRows.length }) : t("eventStats.actions.rowsSelected", { count: selectedRows.length })}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {generateStatusOptions(t).map((option) => (
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
