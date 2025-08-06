// Query key factory for authentication-related queries
export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
  profile: () => [...authKeys.all, "profile"] as const,
  permissions: () => [...authKeys.all, "permissions"] as const,

  // Specific user queries
  userById: (id: string) => [...authKeys.user(), id] as const,
  userProfile: (id: string) => [...authKeys.profile(), id] as const,
};

// General query key factory patterns
export const queryKeys = {
  auth: authKeys,

  // Add other feature query keys here as the app grows
  courses: {
    all: ["courses"] as const,
    lists: () => [...queryKeys.courses.all, "list"] as const,
    list: (filters: string) => [...queryKeys.courses.lists(), filters] as const,
    details: () => [...queryKeys.courses.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.courses.details(), id] as const,
  },
};
