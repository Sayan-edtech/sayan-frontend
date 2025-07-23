import type { Lesson } from "@/types/couse";
import UploadVideoLesson from "./UploadVideoLesson";
import Exam from "./exam";
import Tool from "./Tool";

function ManageLesson({ lesson }: { lesson: Lesson }) {
  let content;
  switch (lesson.type) {
    case "video":
      content = <UploadVideoLesson lesson={lesson} />;
      break;
    case "exam":
      content = <Exam lesson={lesson} />;
      break;
    case "tool":
      content = <Tool lesson={lesson} />;
      break;

    default:
      content = null;
      break;
  }
  return content;
}

export default ManageLesson;
