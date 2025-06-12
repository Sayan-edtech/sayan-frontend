import { Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { Dashboard } from "@/features/auth/components/Dashboard";

// Dashboard layout component
export function DashboardLayout() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">لوحة التحكم</h1>
              {/* Add navigation or user menu here */}
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-6">
          <Dashboard />
        </main>
      </div>
    </ProtectedRoute>
  );
}

// Dashboard routes
export const dashboardRoutes = (
  <Route path="dashboard" element={<DashboardLayout />}>
    <Route index element={<Dashboard />} />
    {/* Add more dashboard routes here */}
    <Route path="profile" element={<div>صفحة الملف الشخصي</div>} />
    <Route path="settings" element={<div>صفحة الإعدادات</div>} />
  </Route>
);
