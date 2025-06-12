import { useAuth } from "@/features/auth/hooks/useAuthStore";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { UserProfile } from "@/features/auth/components/UserProfile";

// Example of a dashboard component that requires authentication
export function Dashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              مرحباً، {user?.name}!
            </h1>
            <p className="text-muted-foreground">هذه لوحة التحكم الخاصة بك</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="md:col-span-2 lg:col-span-2">
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4">معلومات الحساب</h2>
                <UserProfile />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-4">الإحصائيات</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">حالة الحساب:</span>
                    <span className="text-green-600 font-medium">نشط</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">نوع الحساب:</span>
                    <span className="font-medium">
                      {user?.user_type === "STUDENT" ? "طالب" : "أكاديمية"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-4">إعدادات سريعة</h3>
                <div className="space-y-2">
                  <button className="w-full text-right px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded">
                    تعديل الملف الشخصي
                  </button>
                  <button className="w-full text-right px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded">
                    تغيير كلمة المرور
                  </button>
                  <button className="w-full text-right px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded">
                    إعدادات الخصوصية
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
