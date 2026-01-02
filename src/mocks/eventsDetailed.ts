import { EventDetailData } from "@/features/eventDetail/types";
import { MOCK_EVENT } from "./eventDetail";

export const MOCK_EVENTS: EventDetailData[] = [
  MOCK_EVENT,
  {
    id: 2,
    status: "Scheduled",
    statusUser: "Joined",
    basicInfo: {
      eventName: "Hip Hop Dance Battle",
        address: "Urban Dance Arena, Los Angeles, CA",
        date: "2024-07-10",
        time: "19:00",
        isRecurring: false,
        priceRange: "10-30",
    },
    additionalDetails: {
      danceStyles: ["Hip Hop", "Street Dance"],
        skillLevel: ["Advanced"],
        typeOfEvent: ["Competition", "Showcase"],
        maxAttendees: 200,
        allowWaitlist: false,
        allowPartnerPairing: true,
    },
    description: "Get ready for an adrenaline-pumping night of hip hop dance battles! Watch top dancers from around the country compete for the title in various categories. The event features live DJ sets, special guest performances, and a vibrant urban atmosphere. Whether you're a dancer or a fan, this is an event you won't want to miss!",
    coverImage: { type: "image", id: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&h=300&fit=crop" },
    facebookEventUrl: "https://facebook.com/events/hiphopdancebattle",
    media: [
      {
        type: "image",
        id: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&h=300&fit=crop",
        },
        {
        type: "video",
        id: "https://www.youtube.com/shorts/3oP50Vvwn7Q",
        },
    ],
    attendeeStats: {
        going: {
            total: 80,
            leaders: 40,
            followers: 40,
        },
        interested: 150,
    },

  }
];
