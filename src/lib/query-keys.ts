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

  tools: {
    all: ["tools"] as const,
    lists: () => [...queryKeys.tools.all, "list"] as const,
    list: (filters: string) => [...queryKeys.tools.lists(), filters] as const,
    details: () => [...queryKeys.tools.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.tools.details(), id] as const,
    bySection: (sectionId: string) =>
      [...queryKeys.tools.all, "section", sectionId] as const,

    // Mutation keys for tool operations
    mutations: {
      create: () => [...queryKeys.tools.all, "create"] as const,
      update: (id: string) => [...queryKeys.tools.all, "update", id] as const,
      delete: (id: string) => [...queryKeys.tools.all, "delete", id] as const,
    },
  },
  categories: {
    all: ["categories"] as const,
    lists: () => [...queryKeys.categories.all, "list"] as const,
    list: (filters: string) =>
      [...queryKeys.categories.lists(), filters] as const,
    details: () => [...queryKeys.categories.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.categories.details(), id] as const,

    // Mutation keys for category operations
    mutations: {
      create: () => [...queryKeys.categories.all, "create"] as const,
      update: (id: string) =>
        [...queryKeys.categories.all, "update", id] as const,
      delete: (id: string) =>
        [...queryKeys.categories.all, "delete", id] as const,
    },
  },

  sections: {
    all: ["sections"] as const,
    lists: () => [...queryKeys.sections.all, "list"] as const,
    list: (filters: string) =>
      [...queryKeys.sections.lists(), filters] as const,
    details: () => [...queryKeys.sections.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.sections.details(), id] as const,
    byCourse: (courseId: string) =>
      [...queryKeys.sections.all, "course", courseId] as const,

    // Mutation keys for section operations
    mutations: {
      create: () => [...queryKeys.sections.all, "create"] as const,
      update: (id: string) =>
        [...queryKeys.sections.all, "update", id] as const,
      delete: (id: string) =>
        [...queryKeys.sections.all, "delete", id] as const,
    },
  },

  lessons: {
    all: ["lessons"] as const,
    lists: () => [...queryKeys.lessons.all, "list"] as const,
    list: (filters: string) => [...queryKeys.lessons.lists(), filters] as const,
    details: () => [...queryKeys.lessons.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.lessons.details(), id] as const,
    bySection: (sectionId: string) =>
      [...queryKeys.lessons.all, "section", sectionId] as const,
    byCourse: (courseId: string) =>
      [...queryKeys.lessons.all, "course", courseId] as const,

    // Mutation keys for lesson operations
    mutations: {
      create: () => [...queryKeys.lessons.all, "create"] as const,
      update: (id: string) => [...queryKeys.lessons.all, "update", id] as const,
      delete: (id: string) => [...queryKeys.lessons.all, "delete", id] as const,
      reorder: (sectionId: string) =>
        [...queryKeys.lessons.all, "reorder", sectionId] as const,
    },
    video: (lessonId: string) =>
      [...queryKeys.lessons.all, "video", lessonId] as const,
  },
  academy: {
    all: ["academy"] as const,
    lists: () => [...queryKeys.academy.all, "list"] as const,
    list: (filters: string) => [...queryKeys.academy.lists(), filters] as const,
    details: () => [...queryKeys.academy.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.academy.details(), id] as const,
    mainSettings: () => [...queryKeys.academy.all, "main-settings"] as const,
    mainSettingsDetail: (subdomain: string) =>
      [...queryKeys.academy.mainSettings(), subdomain] as const,
  },

  faqs: {
    all: ["faqs"] as const,
    lists: () => [...queryKeys.faqs.all, "list"] as const,
    list: (filters: string) => [...queryKeys.faqs.lists(), filters] as const,
    details: () => [...queryKeys.faqs.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.faqs.details(), id] as const,

    // Mutation keys for FAQ operations
    mutations: {
      create: () => [...queryKeys.faqs.all, "create"] as const,
      update: (id: string) => [...queryKeys.faqs.all, "update", id] as const,
      delete: (id: string) => [...queryKeys.faqs.all, "delete", id] as const,
    },
  },

  opinions: {
    all: ["opinions"] as const,
    lists: () => [...queryKeys.opinions.all, "list"] as const,
    list: (skip: number, limit: number) => [...queryKeys.opinions.lists(), `skip-${skip}-limit-${limit}`] as const,
    details: () => [...queryKeys.opinions.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.opinions.details(), id] as const,

    // Mutation keys for Opinion operations
    mutations: {
      create: () => [...queryKeys.opinions.all, "create"] as const,
      update: (id: string) => [...queryKeys.opinions.all, "update", id] as const,
      delete: (id: string) => [...queryKeys.opinions.all, "delete", id] as const,
    },
  },

  sliders: {
    all: ["sliders"] as const,
    lists: () => [...queryKeys.sliders.all, "list"] as const,
    details: () => [...queryKeys.sliders.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.sliders.details(), id] as const,

    // Mutation keys for Slider operations
    mutations: {
      create: () => [...queryKeys.sliders.all, "create"] as const,
      update: (id: string) => [...queryKeys.sliders.all, "update", id] as const,
      delete: (id: string) => [...queryKeys.sliders.all, "delete", id] as const,
    },
  },

  transactions: {
    all: ["transactions"] as const,
    lists: () => [...queryKeys.transactions.all, "list"] as const,
    list: (skip: number, limit: number) => [...queryKeys.transactions.lists(), `skip-${skip}-limit-${limit}`] as const,
  },
};
