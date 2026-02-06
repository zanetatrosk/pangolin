import { EventStatsData } from "@/features/eventStats/EventStats";
import { FormQuestionType } from "@/features/eventStats/types";

export const mockEventStats: EventStatsData = {
    eventName: "Summer Salsa Night",
    date: "2026-02-15T19:00:00Z",
    recurringDates: [],
    attendeeStats: {
        going: {
            total: 42,
            leaders: 22,
            followers: 20,
        },
        interested: 15,
    },
    registrationData: {
        headers: [
            {
                id: "1",
                question: "Dance Role",
                type: FormQuestionType.SET,
                answerSet: ["Leader", "Follower", "Both"],
                required: true,
            },
            {
                id: "2",
                question: "Experience Level",
                type: FormQuestionType.SET,
                answerSet: ["Beginner", "Intermediate", "Advanced"],
                required: true,
            },
            {
                id: "3",
                question: "Full Name",
                type: FormQuestionType.TEXT,
                required: true,
            },
            {
                id: "4",
                question: "Dietary Restrictions",
                type: FormQuestionType.TEXT,
                required: false,
            },
            {
                id: "5",
                question: "T-Shirt Size",
                type: FormQuestionType.SET,
                answerSet: ["XS", "S", "M", "L", "XL", "XXL"],
                required: false,
            },
        ],
        registrations: [
            {
                id: "1",
                user: {
                    userId: "u1",
                    email: "anna.smith@example.com",
                },
                data: [
                    { id: "1", value: "Follower" },
                    { id: "2", value: "Intermediate" },
                    { id: "3", value: "Anna Smith" },
                    { id: "4", value: "Vegetarian" },
                    { id: "5", value: "M" },
                ],
                createdAt: "2026-01-15T10:30:00Z",
            },
            {
                id: "2",
                user: {
                    userId: "u2",
                    email: "john.doe@example.com",
                },
                data: [
                    { id: "1", value: "Leader" },
                    { id: "2", value: "Advanced" },
                    { id: "3", value: "John Doe" },
                    { id: "4", value: "" },
                    { id: "5", value: "L" },
                ],
                createdAt: "2026-01-16T14:20:00Z",
            },
            {
                id: "3",
                user: {
                    userId: "u3",
                    email: "maria.garcia@example.com",
                },
                data: [
                    { id: "1", value: "Both" },
                    { id: "2", value: "Intermediate" },
                    { id: "3", value: "Maria Garcia" },
                    { id: "4", value: "Gluten-free" },
                    { id: "5", value: "S" },
                ],
                createdAt: "2026-01-17T09:45:00Z",
            },
            {
                id: "4",
                user: {
                    userId: "u4",
                    email: "david.jones@example.com",
                },
                data: [
                    { id: "1", value: "Leader" },
                    { id: "2", value: "Beginner" },
                    { id: "3", value: "David Jones" },
                    { id: "4", value: "" },
                    { id: "5", value: "XL" },
                ],
                createdAt: "2026-01-18T16:00:00Z",
            },
            {
                id: "5",
                user: {
                    userId: "u5",
                    email: "sarah.wilson@example.com",
                },
                data: [
                    { id: "1", value: "Follower" },
                    { id: "2", value: "Advanced" },
                    { id: "3", value: "Sarah Wilson" },
                    { id: "4", value: "Vegan" },
                    { id: "5", value: "M" },
                ],
                createdAt: "2026-01-19T11:30:00Z",
            },
        ],
    },
};
