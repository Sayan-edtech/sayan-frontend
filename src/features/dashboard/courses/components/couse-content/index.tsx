import { useState } from "react";
import Header from "./Header";
import LessonPreview from "./LessonPreview";
import LessonSidebar from "./LessonSidebar";
import type { Lesson, Section } from "@/types/couse";
import { useSections } from "../../hooks/useSectionsQueries";
import { useParams } from "react-router-dom";
import Manage from "./Manage";

export type SelectedItem = {
  lesson?: Lesson;
  section?: Section;
};
function CourseContent() {
  const { courseId } = useParams();
  const { data: sections } = useSections(courseId as string);
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  return (
    <div className="space-y-6">
      <Header selectedItem={selectedItem} />
      <div className="flex gap-4">
        <LessonSidebar
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
          sections={sections?.data.items || []}
        />
        <div className="flex-1 space-y-6 flex">
          <LessonPreview selectedItem={selectedItem} />
          <Manage
            selectedItem={{
              lesson: {
                title: "test",
                id: "",
                section_id: "",
                type: "video",
                order: 0,
                is_published: false,
                created_at: "",
                updated_at: "",
              },
              section: selectedItem?.section,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CourseContent;
