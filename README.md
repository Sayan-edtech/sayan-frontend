# Sayan Frontend

A modern React application for educational services with features including AI-powered learning, employee training, course management, and launch academy programs.

## 🚀 Tech Stack

- **Frontend Framework**: React 19.1.0 with TypeScript
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.7
- **Routing**: React Router DOM 7.6.1
- **State Management**: Zustand 5.0.5
- **HTTP Client**: Axios 1.9.0
- **Data Fetching**: TanStack React Query 5.80.7
- **Forms**: React Hook Form 7.57.0 with Zod validation
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Notifications**: Sonner
- **Carousel**: Swiper.js

## 📁 Project Structure

```
sayan-frontend/
├── public/                          # Static assets
│   ├── assets/
│   │   ├── icons/                   # SVG icons
│   │   │   ├── ai/                  # AI-related icons
│   │   │   ├── employee-training/   # Training-related icons
│   │   │   ├── social-media/        # Social media icons
│   │   │   └── why-us/             # Feature icons
│   │   └── images/                  # Images and graphics
│   │       ├── ai/                  # AI section images
│   │       ├── auth/                # Authentication images
│   │       ├── employee-training/   # Training images
│   │       ├── home/                # Homepage images
│   │       └── launch-academy/      # Academy images
│   └── vite.svg, react.svg
├── src/
│   ├── components/                  # Reusable components
│   │   ├── shared/                  # Shared components
│   │   │   ├── CourseCard.tsx
│   │   │   ├── faqs.tsx
│   │   │   ├── features.tsx
│   │   │   ├── Loader.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── searchbar.tsx
│   │   │   ├── footer/              # Footer components
│   │   │   ├── formFields/          # Form field components
│   │   │   ├── header/              # Header components
│   │   │   └── Icon/                # Icon components
│   │   └── ui/                      # UI primitives
│   │       ├── accordion.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── checkbox.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       └── sheet.tsx
│   ├── constants/                   # Application constants
│   │   └── enums.ts
│   ├── features/                    # Feature-based modules
│   │   ├── ai/                      # AI features
│   │   │   └── components/
│   │   ├── auth/                    # Authentication
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── utils/
│   │   │   ├── store.ts             # Auth state management
│   │   │   └── store-new.ts
│   │   ├── course/                  # Course management
│   │   │   └── components/
│   │   ├── employee-training/       # Employee training
│   │   │   └── components/
│   │   ├── home/                    # Homepage
│   │   │   └── components/
│   │   └── launch-academy/          # Launch academy
│   │       └── components/
│   ├── hooks/                       # Custom React hooks
│   │   └── useDebounce.ts
│   ├── lib/                         # Library configurations
│   │   ├── axios.ts                 # Axios configuration
│   │   ├── cookies.ts               # Cookie utilities
│   │   ├── query-keys.ts            # React Query keys
│   │   ├── react-query.tsx          # React Query setup
│   │   └── utils.ts                 # Utility functions
│   ├── pages/                       # Page components
│   │   ├── about.tsx
│   │   ├── ai.tsx
│   │   ├── employee-training.tsx
│   │   ├── index.tsx
│   │   ├── launch-academy.tsx
│   │   ├── not-found.tsx
│   │   ├── auth/
│   │   │   ├── signin.tsx
│   │   │   └── signup.tsx
│   │   └── courses/
│   │       └── [slug].tsx
│   ├── routes/                      # Routing configuration
│   │   ├── AppRoutes.tsx            # Main routing setup
│   │   └── DashboardRoutes.tsx      # Dashboard routing
│   ├── styles/                      # Global styles
│   │   └── index.css
│   ├── types/                       # TypeScript type definitions
│   │   ├── app.ts
│   │   ├── couse.ts
│   │   ├── swiper.d.ts
│   │   └── user.ts
│   ├── validations/                 # Zod validation schemas
│   │   └── auth.ts
│   ├── App.tsx                      # Main App component
│   ├── main.tsx                     # Application entry point
│   └── vite-env.d.ts               # Vite environment types
├── docs/                           # Documentation
│   ├── ACCESS_REFRESH_TOKENS.md
│   ├── AUTH_SETUP.md
│   ├── COOKIE_MIGRATION.md
│   ├── IMPLEMENTATION_SUMMARY.md
│   ├── LOADER_COMPONENTS.md
│   ├── MIGRATION_SUMMARY.md
│   └── ZUSTAND_MIGRATION.md
├── components.json                 # shadcn/ui configuration
├── eslint.config.js               # ESLint configuration
├── index.html                     # HTML template
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── tsconfig.app.json             # App-specific TypeScript config
├── tsconfig.node.json            # Node-specific TypeScript config
└── vite.config.ts                # Vite configuration
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd sayan-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory and add necessary environment variables:

   ```env
   VITE_API_BASE_URL=your_api_base_url
   VITE_APP_NAME=Sayan
   # Add other environment variables as needed
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## 🏗️ Architecture Overview

### Feature-Based Structure

The application follows a feature-based architecture where each major feature has its own directory containing:

- **Components**: Feature-specific React components
- **Hooks**: Custom hooks for the feature
- **Services**: API calls and business logic
- **Utils**: Feature-specific utility functions
- **Store**: State management (Zustand stores)

### Key Features

1. **Authentication System** (`/features/auth/`)

   - Sign in/Sign up functionality
   - Protected routes
   - Token management with cookies
   - User session handling

2. **AI Features** (`/features/ai/`)

   - AI-powered learning tools
   - Interactive AI components

3. **Course Management** (`/features/course/`)

   - Course browsing and enrollment
   - Course content delivery

4. **Employee Training** (`/features/employee-training/`)

   - Corporate training programs
   - Progress tracking

5. **Launch Academy** (`/features/launch-academy/`)
   - Academy programs
   - Skill development courses

### State Management

- **Zustand**: Used for global state management
- **React Query**: Handles server state, caching, and data fetching
- **React Hook Form**: Manages form state and validation

### Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Custom UI Components**: Located in `/components/ui/`

### Internationalization

The application supports Right-to-Left (RTL) languages (Arabic text visible in components), with proper direction handling configured in the Toaster component.

## 🔧 Development Guidelines

### Code Organization

1. **Components**: Use functional components with TypeScript
2. **Hooks**: Create custom hooks for reusable logic
3. **Types**: Define TypeScript interfaces in `/types/`
4. **Validation**: Use Zod schemas in `/validations/`
5. **API**: Configure axios interceptors in `/lib/axios.ts`

### Path Aliases

The project uses path aliases configured in `vite.config.ts`:

- `@/` - Points to the `src/` directory

### Routing

- Public routes defined in `AppRoutes.tsx`
- Protected dashboard routes in `DashboardRoutes.tsx`
- Authentication-protected areas using `ProtectedRoute` component

## 📚 Additional Documentation

Detailed documentation is available in the `/docs/` directory:

- [Authentication Setup](./docs/AUTH_SETUP.md)
- [Access & Refresh Tokens](./docs/ACCESS_REFRESH_TOKENS.md)
- [Cookie Migration](./docs/COOKIE_MIGRATION.md)
- [Zustand Migration](./docs/ZUSTAND_MIGRATION.md)
- [Implementation Summary](./docs/IMPLEMENTATION_SUMMARY.md)
- [Loader Components](./docs/LOADER_COMPONENTS.md)

## 🤝 Contributing

1. Follow the existing code structure and naming conventions
2. Write TypeScript interfaces for new data structures
3. Use the established patterns for API calls and state management
4. Ensure components are accessible and responsive
5. Add appropriate error handling and loading states

## 📦 Build and Deployment

### Production Build

```bash
npm run build
```

This creates a `dist/` directory with optimized production files.

### Preview Production Build

```bash
npm run preview
```

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**: Change the port in `vite.config.ts`
2. **TypeScript Errors**: Check `tsconfig.json` configurations
3. **Build Issues**: Ensure all dependencies are installed correctly

### Environment Issues

- Verify Node.js version compatibility
- Clear `node_modules` and reinstall if needed
- Check environment variables are properly set

---

For more specific implementation details, refer to the documentation files in the `/docs/` directory.
