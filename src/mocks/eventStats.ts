import { EventStatsData } from "@/features/eventStats/EventStats";
import { FormQuestionType } from "@/features/eventStats/types";

export const mockEventStats: EventStatsData = {
    eventName: "Summer Salsa Night",
    date: "2026-02-15T19:00:00Z",
    recurringDate: [],
    attendeeStats: {
        going: {
            total: 42,
            leaders: 22,
            followers: 20,
        },
        interested: 15,
    },
    registrationData: {
        form: [
            {
                id: "1",
                question: "Dance Role",
                type: FormQuestionType.SELECT,
                answerSet: ["Leader", "Follower", "Both"],
                required: true,
            },
            {
                id: "2",
                question: "Experience Level",
                type: FormQuestionType.RADIO,
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
                type: FormQuestionType.SELECT,
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
                answers: [
                    { questionId: "1", answer: "Follower" },
                    { questionId: "2", answer: "Intermediate" },
                    { questionId: "3", answer: "Anna Smith" },
                    { questionId: "4", answer: "Vegetarian" },
                    { questionId: "5", answer: "M" },
                ],
                createdAt: "2026-01-15T10:30:00Z",
            },
            {
                id: "2",
                user: {
                    userId: "u2",
                    email: "john.doe@example.com",
                },
                answers: [
                    { questionId: "1", answer: "Leader" },
                    { questionId: "2", answer: "Advanced" },
                    { questionId: "3", answer: "John Doe" },
                    { questionId: "4", answer: "" },
                    { questionId: "5", answer: "L" },
                ],
                createdAt: "2026-01-16T14:20:00Z",
            },
            {
                id: "3",
                user: {
                    userId: "u3",
                    email: "maria.garcia@example.com",
                },
                answers: [
                    { questionId: "1", answer: "Both" },
                    { questionId: "2", answer: "Intermediate" },
                    { questionId: "3", answer: "Maria Garcia" },
                    { questionId: "4", answer: "Gluten-free" },
                    { questionId: "5", answer: "S" },
                ],
                createdAt: "2026-01-17T09:45:00Z",
            },
            {
                id: "4",
                user: {
                    userId: "u4",
                    email: "david.jones@example.com",
                },
                answers: [
                    { questionId: "1", answer: "Leader" },
                    { questionId: "2", answer: "Beginner" },
                    { questionId: "3", answer: "David Jones" },
                    { questionId: "4", answer: "" },
                    { questionId: "5", answer: "XL" },
                ],
                createdAt: "2026-01-18T16:00:00Z",
            },
            {
                id: "5",
                user: {
                    userId: "u5",
                    email: "sarah.wilson@example.com",
                },
                answers: [
                    { questionId: "1", answer: "Follower" },
                    { questionId: "2", answer: "Advanced" },
                    { questionId: "3", answer: "Sarah Wilson" },
                    { questionId: "4", answer: "Vegan" },
                    { questionId: "5", answer: "M" },
                ],
                createdAt: "2026-01-19T11:30:00Z",
            },
        ],
    },
};
