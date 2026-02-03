import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { PublishEventOptions } from "../publish-actions/PublishEventOptions";

export type ActionType = "publish" | "cancel" | "delete";

import { PublishPayload } from "../publish-actions/PublishEventOptions";

interface ConfirmActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actionType: ActionType | null;
  onConfirm: (data?: PublishPayload) => void;
  isLoading: boolean;
  publishData?: PublishPayload;
  onPublishDataChange?: (data: PublishPayload) => void;
}

const DIALOG_CONTENT: Record<
  ActionType,
  {
    title: string;
    description: string;
    actionText: string;
    variant: "default" | "destructive";
    size?: "sm" | "lg" | "xl"; // Add size option,
    component?: React.ReactNode; // Optional custom component to render in the dialog
  }
> = {
  publish: {
    title: "Publish Event",
    description:
      "Configure your event settings before publishing.",
    actionText: "Publish",
    variant: "default",
    size: "lg", // Larger dialog for publish
  },
  cancel: {
    title: "Cancel Event",
    description:
      "Are you sure you want to cancel this event? This action cannot be undone and attendees will be notified.",
    actionText: "Cancel Event",
    variant: "destructive",
  },
  delete: {
    title: "Delete Draft",
    description:
      "Are you sure you want to delete this draft? This action cannot be undone.",
    actionText: "Delete",
    variant: "destructive",
  },
};

export const ConfirmActionDialog: React.FC<ConfirmActionDialogProps> = ({
  open,
  onOpenChange,
  actionType,
  onConfirm,
  isLoading,
  publishData,
  onPublishDataChange,
}) => {
  const dialogContent = actionType ? DIALOG_CONTENT[actionType] : null;
  
  const renderComponent = () => {
    if (actionType === "publish" && publishData && onPublishDataChange) {
      return <PublishEventOptions value={publishData} onChange={onPublishDataChange} />;
    }
    return dialogContent?.component;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={dialogContent?.size === "lg" ? "sm:max-w-2xl" : ""}>
        {dialogContent && (
          <>
            <DialogHeader>
              <DialogTitle>{dialogContent.title}</DialogTitle>
              <DialogDescription>{dialogContent.description}</DialogDescription>
            </DialogHeader>
              {renderComponent()}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant={dialogContent.variant}
                onClick={() => onConfirm(publishData)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  dialogContent.actionText
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};