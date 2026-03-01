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

export const ConfirmActionDialog: React.FC<ConfirmActionDialogProps> = ({
  open,
  onOpenChange,
  actionType,
  onConfirm,
  isLoading,
  publishData,
  onPublishDataChange,
}) => {
  const { t } = useTranslation();
  
  const getDialogContent = () => {
    if (!actionType) return null;
    
    const baseKey = `eventDetail.confirmActionDialog`;
    
    switch (actionType) {
      case "publish":
        return {
          title: t(`${baseKey}.publishTitle`),
          description: t(`${baseKey}.publishDescription`),
          actionText: t(`${baseKey}.publishAction`),
          variant: "default" as const,
          size: "lg" as const,
        };
      case "cancel":
        return {
          title: t(`${baseKey}.cancelTitle`),
          description: t(`${baseKey}.cancelDescription`),
          actionText: t(`${baseKey}.cancelAction`),
          variant: "destructive" as const,
        };
      case "delete":
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
    if (actionType === "publish" && publishData && onPublishDataChange) {
      return <PublishEventOptions value={publishData} onChange={onPublishDataChange} />;
    }
    return null;
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
                {t("eventDetail.confirmActionDialog.cancel")}
              </Button>
              <Button
                variant={dialogContent.variant}
                onClick={() => onConfirm(publishData)}
                disabled={isLoading}
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