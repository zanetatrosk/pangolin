import { EventDetailData } from "@/features/events/types";

export const MOCK_EVENT: EventDetailData = {
  basicInfo: {
    eventName: "Salsa & Bachata Night Fever",
    location: "Dance Studio 101, New York, NY",
    date: "2024-06-15",
    time: "20:00",
    isRecurring: true,
    priceRange: "15-20",
    priceExact: "15",
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
  coverImage: new File([], "cover.jpg"),
  facebookEventUrl: "https://facebook.com/events/example",
  media: [
    {
      type: "image",
      file: new File([], "example.jpg"),
    },
    {
      type: "image",
      file: new File([], "example2.jpg"),
    },
    {
      type: "image",
      file: new File([], "example3.jpg"),
    },
    { type: "video", file: new File([], "example_video.mp4") },
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