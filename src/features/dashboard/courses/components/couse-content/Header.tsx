import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
      <p>
        تعلم HTML في 5 دقائق{" "}
        <span className="text-white font-medium rounded-md bg-primary px-2 h-10">
          Live
        </span>{" "}
        تم نشر 5 دقائق من محتوى الدورة
      </p>

      <DeleteCourseModal />
    </header>
  );
};

function DeleteCourseModal() {
  const handleDelete = () => {
    // Handle delete course logic here
    console.log("Deleting course...");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="destructive">
          حذف الدورة
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>حذف الدورة</DialogTitle>
          <DialogDescription>
            هل أنت متأكد من أنك تريد حذف هذه الدورة نهائياً؟ سيتم حذف جميع
            الدروس والمحتوى المرتبط بها. لا يمكن التراجع عن هذا الإجراء.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">إلغاء</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={handleDelete}>
              حذف الدورة نهائياً
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default Header;
