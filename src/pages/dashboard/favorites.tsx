import Icon from "@/components/shared/Icon";

function Favorites() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <Icon name="star" size="32px" className="text-yellow-500" />
          <h1 className="text-2xl font-bold text-gray-900">المفضلة</h1>
        </div>
      </div>
      <div className="py-20">
        <p className="text-muted-foreground text-center">
          قائمة المفضلة فارغة حاليًا.
        </p>
      </div>
    </div>
  );
}

export default Favorites;
