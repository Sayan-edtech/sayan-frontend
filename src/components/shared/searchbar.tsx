import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";

function Searchbar({ className }: { className?: string }) {
  return (
    <div
      className={`relative bg-card rounded-[50px] h-[56px] flex items-center gap-2 ${className}`}
    >
      <Input
        type="search"
        placeholder="ابحث عن دورة..."
        className="!bg-transparent !border-none !outline-none !ring-0 !shadow-none h-full w-full !rounded-[50px] px-6"
      />
      <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
    </div>
  );
}

export default Searchbar;
