import { useAuth } from "@/features/auth/AuthProvider";

export const useUser = () => {
    const { user, loading, isAuthenticated } = useAuth();
    
    // Transform UserDto to the format expected by the app
    const transformedUser = user ? {
        userId: user.id,
        name: user.email.split('@')[0], // Use email prefix as name if no profile
        email: user.email,
    } : null;
    
    return { 
        user: transformedUser,
        loading,
        isAuthenticated
    };
}