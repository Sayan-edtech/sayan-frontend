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

// User/Profile query keys
export const userKeys = {
  all: ["user"] as const,
  profile: () => [...userKeys.all, "profile"] as const,
  settings: () => [...userKeys.all, "settings"] as const,

  // Specific user queries
  profileById: (id: string) => [...userKeys.profile(), id] as const,
  currentUser: () => [...userKeys.profile(), "current"] as const,
};

// General query key factory patterns
export const queryKeys = {
  auth: authKeys,
  user: userKeys,

  // Add other feature query keys here as the app grows
  courses: {
    all: ["courses"] as const,
    lists: () => [...queryKeys.courses.all, "list"] as const,
    list: (filters: string) => [...queryKeys.courses.lists(), filters] as const,
    details: () => [...queryKeys.courses.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.courses.details(), id] as const,

    // Mutation keys for course operations
    mutations: {
      create: () => [...queryKeys.courses.all, "create"] as const,
      update: (id: string) => [...queryKeys.courses.all, "update", id] as const,
      delete: (id: string) => [...queryKeys.courses.all, "delete", id] as const,
      enroll: (courseId: string) =>
        [...queryKeys.courses.all, "enroll", courseId] as const,
      unenroll: (courseId: string) =>
        [...queryKeys.courses.all, "unenroll", courseId] as const,
      favorite: (courseId: string) =>
        [...queryKeys.courses.all, "favorite", courseId] as const,
      unfavorite: (courseId: string) =>
        [...queryKeys.courses.all, "unfavorite", courseId] as const,
    },
  },
  categories: {
    all: ["categories"] as const,
    list: () => [...queryKeys.categories.all, "list"] as const,
    detail: (id: string) =>
      [...queryKeys.categories.all, "detail", id] as const,
  },
};
