function Classes() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          الفصول الدراسية
        </h3>
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <span className="text-green-600 text-xl">🎓</span>
        </div>
      </div>
      <p className="text-gray-600 text-center py-8">لا توجد فصول دراسية حالياً</p>
    </div>
  );
}

export default Classes;