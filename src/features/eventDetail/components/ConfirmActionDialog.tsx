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
import { useTranslation } from "react-i18next";
import { PublishPayload } from "../publish-actions/PublishEventOptions";
import { ErrorAlert } from "@/components/ui/error-alert";

export enum ActionType {
  PUBLISH = "publish",
  CANCEL = "cancel",
  DELETE = "delete",
}

interface ConfirmActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actionType: ActionType | null;
  onConfirm: (data?: PublishPayload) => void;
  isLoading: boolean;
  publishData?: PublishPayload;
  onPublishDataChange?: (data: PublishPayload) => void;
  errorMessage?: string | null;
}

export const ConfirmActionDialog: React.FC<ConfirmActionDialogProps> = ({
  open,
  onOpenChange,
  actionType,
  onConfirm,
  isLoading,
  publishData,
  onPublishDataChange,
  errorMessage,
}) => {
  const { t } = useTranslation();

  const getDialogContent = () => {
    if (!actionType) return null;

    const baseKey = `eventDetail.confirmActionDialog`;

    switch (actionType) {
      case ActionType.PUBLISH:
        return {
          title: t(`${baseKey}.publishTitle`),
          description: t(`${baseKey}.publishDescription`),
          actionText: t(`${baseKey}.publishAction`),
          variant: "default" as const,
          size: "lg" as const,
        };
      case ActionType.CANCEL:
        return {
          title: t(`${baseKey}.cancelTitle`),
          description: t(`${baseKey}.cancelDescription`),
          actionText: t(`${baseKey}.cancelAction`),
          variant: "destructive" as const,
        };
      case ActionType.DELETE:
        return {
          title: t(`${baseKey}.deleteTitle`),
          description: t(`${baseKey}.deleteDescription`),
          actionText: t(`${baseKey}.deleteAction`),
          variant: "destructive" as const,
        };
      default:
        return null;
    }
  };

  const dialogContent = getDialogContent();

  const renderComponent = () => {
    if (
      actionType === ActionType.PUBLISH &&
      publishData &&
      onPublishDataChange
    ) {
      return (
        <PublishEventOptions
          value={publishData}
          onChange={onPublishDataChange}
        />
      );
    }
    return null;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85svh] overflow-y-auto p-4 sm:max-h-[90vh] sm:p-6">
        {dialogContent && (
          <>
            <DialogHeader className="space-y-2">
              <DialogTitle className="wrap-break-word">
                {dialogContent.title}
              </DialogTitle>
              <DialogDescription className="whitespace-normal wrap-break-word">
                {dialogContent.description}
              </DialogDescription>
            </DialogHeader>
            {renderComponent()}
            {errorMessage && (
              <ErrorAlert
                description={errorMessage}>
              </ErrorAlert>
            )}
            <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                {t("eventDetail.confirmActionDialog.cancel")}
              </Button>
              <Button
                variant={dialogContent.variant}
                onClick={() => onConfirm(publishData)}
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t("common.loading")}
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
