import { EventDetailData } from "@/features/eventDetail/types";

export const MOCK_EVENT: EventDetailData = {
  id: 1,
  basicInfo: {
    eventName: "Salsa & Bachata Night Fever",
    location: "Dance Studio 101, New York, NY",
    date: "2024-06-22",
    time: "20:00",
    isRecurring: true,
    priceRange: "15-20",
    priceExact: "15",
    endDate: "2024-06-17",
    recurringDates: [{ date: "2024-06-15", id: "1", status: "Past", statusUser: "Joined" },
        { date: "2024-06-22", id: "2", status: "Scheduled", statusUser: "Joined"},
        { date: "2024-06-29", id: "3", status: "Scheduled", statusUser: "Joined"},
        { date: "2024-07-06", id: "4", status: "Scheduled", statusUser: "Joined" },],
  },
  additionalDetails: {
    danceStyles: ["Salsa", "Bachata", "Merengue"],
    skillLevel: ["All Levels", "Beginner Friendly"],
    typeOfEvent: ["Social", "Party", "Workshop"],
    maxAttendees: 150,
    allowWaitlist: true,
    allowPartnerPairing: true,
  },
  description:
    "Join us for an unforgettable night of dancing! We start with a beginner-friendly workshop at 8 PM, followed by social dancing until 2 AM. Great music, amazing atmosphere, and the best dancers in town. \n\nWhether you are a seasoned pro or just starting out, you'll find a welcoming community and plenty of partners to dance with. Don't miss out on the special performance at midnight!",
  coverImage: { type: "image", url: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop" },
  facebookEventUrl: "https://facebook.com/events/example",
  media: [
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
    },
    { type: "video", url: "https://www.youtube.com/shorts/2oP50Vvwn7Q" },
  ],
  attendeeStats: {
    going: {
      total: 45,
      leaders: 20,
      followers: 25,
    },
    interested: 120,
  },
};