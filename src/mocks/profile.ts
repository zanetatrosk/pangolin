import { ProfileData } from "@/features/profile/ProfilePage";

export const PROFILE: ProfileData = {
    firstName: "John",
    lastName: "Doe",
    bio: "Dance enthusiast exploring different styles. Always eager to learn and connect with fellow dancers!",
    role: { id: "c936b621-f6d7-49bc-bb01-b0cc26223d1d", name: "Leader" },
    danceStyles: [{ id: "1c960b95-8249-46f8-b045-84a9a1136fb7", name: "Bachata" }],
    media: [{ id: "d27abd89-5154-4cec-babf-e00eb985a776", type: "image", url: "http://localhost:8080/api/media/476534ca-470f-4a3d-aa38-53e1299a4a83" }],
    level: { id: "7d28868b-b53f-4405-8d8d-1ca495e403da", name: "Beginner" },
};