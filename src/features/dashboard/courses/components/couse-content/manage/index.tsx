import type { SelectedItem } from "..";
import ManageLesson from "./ManageLesson";
import ManageSection from "./ManageSection";

function Manage({ selectedItem }: { selectedItem: SelectedItem | null }) {
  return (
    <div className={selectedItem?.lesson?.video_id ? "" : "flex-1"}>
      {selectedItem && selectedItem.section && (
        <ManageSection section={selectedItem?.section} />
      )}
      {selectedItem && selectedItem.lesson && (
        <ManageLesson lesson={selectedItem?.lesson} />
      )}
    </div>
  );
}

export default Manage;
