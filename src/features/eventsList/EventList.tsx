import { FC } from "react";
import { EventItemCard } from "./components/EventItemCard";

const mockEvents = [
  {
    id: 1,
    title: "Salsa Night at The Club",
    description: "Join us for an electrifying night of salsa dancing with live music and professional instructors. Perfect for all skill levels!",
    date: "2024-12-15",
    time: "8:00 PM",
    location: "Downtown Dance Hall, 123 Main St",
    image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400&h=300&fit=crop",
    price: "$25",
    attendees: 45,
    maxAttendees: 80,
    difficulty: "All Levels",
    tags: ["Salsa", "Live Music", "Social"],
    rating: 4.8,
    organizer: "Latin Dance Studio",
  },
  {
    id: 2,
    title: "Tango Workshop Weekend",
    description: "Intensive weekend workshop focusing on Argentine Tango fundamentals and advanced techniques with internationally renowned instructors.",
    date: "2024-12-20",
    time: "2:00 PM",
    location: "Elite Dance Academy, 456 Oak Ave",
    image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400&h=300&fit=crop",
    price: "$120",
    attendees: 28,
    maxAttendees: 40,
    difficulty: "Intermediate",
    tags: ["Tango", "Workshop", "Weekend"],
    rating: 4.9,
    organizer: "Tango Masters International",
  },
  {
    id: 3,
    title: "Bachata Social Night",
    description: "Come dance to the hottest bachata hits in a friendly, welcoming environment. Beginner lesson included before social dancing.",
    date: "2024-12-22",
    time: "7:30 PM",
    location: "Rhythm Lounge, 789 Dance Blvd",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
    price: "$15",
    attendees: 62,
    maxAttendees: 100,
    difficulty: "Beginner",
    tags: ["Bachata", "Social", "Lesson"],
    rating: 4.6,
    organizer: "Caribbean Dance Collective",
  },
  {
    id: 4,
    title: "Swing Dance Competition",
    description: "Annual swing dance competition featuring Lindy Hop, Charleston, and Balboa divisions. Prizes for all levels and live swing band!",
    date: "2024-12-28",
    time: "6:00 PM",
    location: "Grand Ballroom, Historic Hotel Plaza",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    price: "$35",
    attendees: 89,
    maxAttendees: 150,
    difficulty: "Competition",
    tags: ["Swing", "Competition", "Live Band"],
    rating: 4.7,
    organizer: "Vintage Swing Society",
  },
  {
    id: 5,
    title: "Kizomba & Urban Kiz Workshop",
    description: "Explore the sensual world of Kizomba and its modern evolution Urban Kiz. Learn connection, musicality, and signature moves.",
    date: "2025-01-05",
    time: "3:00 PM",
    location: "Motion Dance Studio, 321 Rhythm St",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=300&fit=crop",
    price: "$40",
    attendees: 24,
    maxAttendees: 30,
    difficulty: "Intermediate",
    tags: ["Kizomba", "Urban Kiz", "Connection"],
    rating: 4.5,
    organizer: "Afro-Latin Dance Academy",
  },
  {
    id: 6,
    title: "Ballroom Dance Gala",
    description: "Elegant evening of ballroom dancing featuring Waltz, Foxtrot, and Quickstep. Formal attire encouraged, champagne reception included.",
    date: "2025-01-12",
    time: "7:00 PM",
    location: "Crystal Ballroom, Luxury Resort & Spa",
    image: "https://images.unsplash.com/photo-1594736797933-d0eeaa0b2a82?w=400&h=300&fit=crop",
    price: "$65",
    attendees: 76,
    maxAttendees: 120,
    difficulty: "Advanced",
    tags: ["Ballroom", "Formal", "Gala"],
    rating: 4.9,
    organizer: "Metropolitan Ballroom Society",
  }
];

export const EventList: FC = () => {
    return (
        <div className="space-y-4 p-4 md:p-6">
            
            <div className="space-y-4">
                {mockEvents.map((event) => (
                    <EventItemCard key={event.id} {...event} />
                ))}
            </div>
        </div>
    );
};
