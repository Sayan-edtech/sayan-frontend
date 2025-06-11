import React from "react";

function Features({
  features,
}: {
  features: { icon: React.ReactNode; title: string; description: string }[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-8 text-right group hover:shadow-lg transition-all duration-300 border border-gray-100"
        >
          {/* Icon */}
          <div
            style={{ border: "1px solid rgba(0, 0, 0, 0.03)" }}
            className={`inline-flex bg-[#F9F9FF] items-center justify-center w-20 h-20 rounded-[20px] mb-6 group-hover:scale-110 transition-transform duration-300`}
          >
            {feature.icon}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-foreground mb-4 leading-tight">
            {feature.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed text-right">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Features;
