import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { RegistrationModeEnum } from "../publish-actions/PublishEventOptions";
import { PATHS } from "@/paths";
import { useEventRegistrations } from "@/hooks/useEventRegistrations";
import { useTranslation } from "react-i18next";

export enum DancerRole {
  LEADER = "Leader",
  FOLLOWER = "Follower",
}

interface AttendeeListModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  registrationMode: RegistrationModeEnum;
  leadersCount?: number;
  followersCount?: number;
}

export function AttendeeListModal({
  isOpen,
  onClose,
  eventId,
  registrationMode,
  leadersCount = 0,
  followersCount = 0,
}: AttendeeListModalProps) {
  const { t } = useTranslation();
  const isCoupleMode = registrationMode === RegistrationModeEnum.COUPLE;
  //TODO refactor to enum
  // In couple mode, default to first non-empty category, otherwise show all
  const getInitialTab = (): "leaders" | "followers" | "all" => {
    if (!isCoupleMode) return "all";
    if (leadersCount > 0) return "leaders";
    if (followersCount > 0) return "followers";
    return "all"; // Fallback, shouldn't happen in couple mode with attendees
  };

  const [attendeeTab, setAttendeeTab] = useState<
    "leaders" | "followers" | "all"
  >(getInitialTab());
  const navigate = useNavigate();

  // Fetch registrations from API - only when modal is open (data is already preprocessed)
  const {
    data: attendees = [],
    isLoading,
    isError,
  } = useEventRegistrations(eventId, registrationMode, isOpen);

  const filteredAttendees = isCoupleMode
    ? attendees.filter((a) => {
        if (attendeeTab === "leaders") return a.role === DancerRole.LEADER;
        if (attendeeTab === "followers") return a.role === DancerRole.FOLLOWER;
        return true;
      })
    : attendees;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm p-0 md:p-4 animate-in fade-in duration-200">
      <div className="bg-background w-full max-w-md md:rounded-xl rounded-t-xl shadow-2xl flex flex-col max-h-[85vh] animate-in slide-in-from-bottom-10 duration-300">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold text-lg">
            {t("eventDetail.attendeeList.guestList")}
          </h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {isCoupleMode &&
          (leadersCount > 0 || followersCount > 0) && (
            <div
              className="p-2 grid gap-2 border-b bg-muted/30"
              style={{
                gridTemplateColumns: `repeat(${[leadersCount > 0, followersCount > 0].filter(Boolean).length}, 1fr)`,
              }}
            >
              {leadersCount > 0 && (
                <button
                  onClick={() => setAttendeeTab("leaders")}
                  className={`py-2 text-sm font-medium rounded-md transition-colors ${
                    attendeeTab === "leaders"
                      ? "bg-white shadow text-blue-600"
                      : "text-muted-foreground hover:bg-white/50"
                  }`}
                >
                  {t("eventDetail.attendeeList.leaders")} ({leadersCount})
                </button>
              )}
              {followersCount > 0 && (
                <button
                  onClick={() => setAttendeeTab("followers")}
                  className={`py-2 text-sm font-medium rounded-md transition-colors ${
                    attendeeTab === "followers"
                      ? "bg-white shadow text-pink-600"
                      : "text-muted-foreground hover:bg-white/50"
                  }`}
                >
                  {t("eventDetail.attendeeList.followers")} ({followersCount})
                </button>
              )}
            </div>
          )}

        <div className="overflow-y-auto p-4 space-y-3 flex-1">
          {isLoading && (
            <div className="text-center text-sm text-muted-foreground py-8">
              {t("eventDetail.attendeeList.loadingAttendees")}
            </div>
          )}
          {isError && (
            <div className="text-center text-sm text-destructive py-8">
              {t("eventDetail.attendeeList.loadFailed")}
            </div>
          )}
          {!isLoading &&
            !isError &&
            filteredAttendees.map((attendee) => (
              <div
                key={attendee.id}
                className={`flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg transition-colors ${
                  attendee.userId ? "cursor-pointer" : ""
                }`}
                onClick={() =>
                  attendee.userId &&
                  navigate({ to: PATHS.PROFILE.VIEW(attendee.userId) })
                }
              >
                {attendee.avatar ? (
                  <img
                    src={attendee.avatar.url}
                    alt={attendee.name}
                    className="w-10 h-10 rounded-full bg-slate-200"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-medium">
                    {attendee.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-medium text-sm">{attendee.name}</p>
                  {attendee.level && (
                    <p className="text-xs text-muted-foreground">
                      {attendee.level}
                    </p>
                  )}
                </div>
                {isCoupleMode && attendee.role && (
                  <>
                    {attendee.role === DancerRole.LEADER ? (
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    ) : attendee.role === DancerRole.FOLLOWER ? (
                      <div className="w-2 h-2 rounded-full bg-pink-500" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-gray-400" />
                    )}
                  </>
                )}
              </div>
            ))}
          {!isLoading && !isError && filteredAttendees.length === 0 && (
            <div className="text-center text-sm text-muted-foreground py-8">
              {t("eventDetail.attendeeList.noAttendees")}
            </div>
          )}
          {!isLoading && !isError && filteredAttendees.length > 0 && (
            <div className="text-center text-xs text-muted-foreground pt-4">
              {t("eventDetail.attendeeList.showing")} {filteredAttendees.length}{" "}
              {filteredAttendees.length === 1
                ? t("eventDetail.attendeeList.person")
                : t("eventDetail.attendeeList.people")}
            </div>
          )}
        </div>

        <div className="p-4 border-t md:hidden">
          <Button className="w-full" onClick={onClose}>
            {t("eventDetail.attendeeList.close")}
          </Button>
        </div>
      </div>
    </div>
  );
}
