import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

function Searchbar() {
  return (
    <div className="flex-1 relative">
      <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
      <Input
        placeholder="ابحث..."
        className="pl-10 bg-gray-50 border-none text-right"
      />
    </div>
  );
}

export default Searchbar;
