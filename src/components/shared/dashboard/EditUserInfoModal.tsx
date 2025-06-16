import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  coverImage?: string;
}

interface EditUserInfoModalProps {
  userInfo: UserInfo;
  onSave: (updatedInfo: UserInfo) => void;
  trigger?: React.ReactNode;
}

export function EditUserInfoModal({
  userInfo,
  onSave,
  trigger,
}: EditUserInfoModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<UserInfo>(userInfo);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof UserInfo, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSave(formData);
      setOpen(false);
    } catch (error) {
      console.error("Error saving user info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(userInfo); // Reset form data
    setOpen(false);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData((prev) => ({
          ...prev,
          avatar: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData((prev) => ({
          ...prev,
          coverImage: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
            تحديث المعلومات
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-right text-xl font-bold">
            تحديث المعلومات الشخصية
          </DialogTitle>
          <DialogDescription className="text-right text-gray-600">
            قم بتحديث معلوماتك الشخصية وصورة الملف الشخصي
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Cover Image Section */}
          <div className="space-y-4">
            <h3 className="text-right text-lg font-semibold text-gray-900">
              صورة الغلاف
            </h3>
            <div
              className="relative cursor-pointer group h-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg overflow-hidden"
              onClick={() => document.getElementById("cover-upload")?.click()}
            >
              {formData.coverImage || userInfo.coverImage ? (
                <img
                  src={formData.coverImage || userInfo.coverImage}
                  alt="Cover"
                  className="w-full h-full object-cover transition-all duration-200 group-hover:opacity-80"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 transition-all duration-200 group-hover:opacity-80">
                  <div className="text-center">
                    <Camera className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">اضغط لإضافة صورة غلاف</p>
                  </div>
                </div>
              )}
              <div className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition-colors">
                <Camera className="w-4 h-4" />
              </div>
              <input
                id="cover-upload"
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <div
              className="relative cursor-pointer group"
              onClick={() => document.getElementById("avatar-upload")?.click()}
            >
              <Avatar className="w-24 h-24 transition-all duration-200 group-hover:opacity-80">
                <AvatarImage
                  src={formData.avatar || userInfo.avatar}
                  alt="Profile"
                />
                <AvatarFallback className="bg-gray-200 text-gray-600 text-2xl">
                  {formData.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition-colors">
                <Camera className="w-4 h-4" />
              </div>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
            <p className="text-sm text-gray-500 text-center">
              اضغط على الصورة لتغيير صورة الملف الشخصي
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="text-right">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الاسم الكامل
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="text-right"
                placeholder="أدخل اسمك الكامل"
              />
            </div>

            <div className="text-right">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="text-right"
                placeholder="أدخل بريدك الإلكتروني"
              />
            </div>

            <div className="text-right">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رقم الهاتف
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="text-right"
                placeholder="أدخل رقم هاتفك"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2 justify-start">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
          >
            إلغاء
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                جاري الحفظ...
              </div>
            ) : (
              "حفظ التغييرات"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
