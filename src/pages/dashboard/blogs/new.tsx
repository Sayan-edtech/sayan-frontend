import AddBlogForm from "@/features/blogs/components/AddBlogForm";
import { Plus } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export interface IBlogForm {
  title: string;
  content: string;
  excerpt: string;
  image: string;
  keywords: string[];
  category: string;
  status: 'published' | 'draft';
}

function AddNewBlog() {
  const navigate = useNavigate();

  const handleSubmit = (data: IBlogForm) => {
    console.log("Blog created:", data);
    // Here you would typically send the data to your API
    // For now, we'll just navigate back to blogs
    navigate("/dashboard/blogs");
  };

  const handleCancel = () => {
    navigate("/dashboard/blogs");
  };

  return (
    <div className="space-y-6">
      <Header />

      {/* Form */}
      <AddBlogForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
}

export default AddNewBlog;

function Header() {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border-0">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Plus className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            إضافة مقال جديد
          </span>
        </div>
      </div>
    </div>
  );
}