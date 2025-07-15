import { useState } from "react";
import Header from "./Header";
import LessonPreview from "./LessonPreview";
import LessonSidebar from "./LessonSidebar";
import LessonDetailsSidebar from "./LessonDetailsSidebar";

function CourseContent() {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleItemSelect = (item: any) => {
    setSelectedItem(item);
  };

  const handleEdit = (id: number, data: any) => {
    console.log('Edit item:', id, data);
    // Handle edit logic here
  };

  const handleDelete = (id: number) => {
    console.log('Delete item:', id);
    // Handle delete logic here
  };

  const handlePublishToggle = (id: number, isPublished: boolean) => {
    console.log('Toggle publish:', id, isPublished);
    // Handle publish toggle logic here
  };

  return (
    <div className="space-y-6">
      <Header selectedLesson={selectedItem} />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <LessonSidebar onItemSelect={handleItemSelect} />
        </div>
        <div className="lg:col-span-2">
          <LessonPreview selectedLesson={selectedItem} />
        </div>
        <div className="lg:col-span-1">
          <LessonDetailsSidebar
            selectedItem={selectedItem}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onPublishToggle={handlePublishToggle}
          />
        </div>
      </div>
    </div>
  );
}

export default CourseContent;
