import React from "react";
import { Chart } from "@/components/ui/chart";

interface EducationalMaterialsChartProps {
  data?: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  };
}

export function EducationalMaterialsChart({
  data,
}: EducationalMaterialsChartProps): React.ReactElement {
  // Default sample data if no data provided
  const defaultData = {
    labels: [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
    datasets: [
      {
        label: "المواد التعليمية المسجلة",
        data: [9.8, 3.9, 4.9, 5.9, 9.8, 2.9, 2.9, 2.9, 2.9, 3.9, 0.9, 1.9],
        backgroundColor: "rgba(139, 92, 246, 0.8)",
        borderColor: "rgba(139, 92, 246, 1)",
        borderWidth: 0,
        borderRadius: 20,
        borderSkipped: false,
        maxBarThickness: 15,
      },
    ],
  };

  const chartData = data || defaultData;

  // Check if we have actual data or if it's empty
  const hasData = chartData.datasets.some((dataset) =>
    dataset.data.some((value) => value > 0)
  );

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "rect",
          color: "#6b7280",
          font: {
            size: 14,
            family: "Cairo, sans-serif",
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(139, 92, 246, 1)",
        borderWidth: 1,
        titleFont: {
          family: "Cairo, sans-serif",
        },
        bodyFont: {
          family: "Cairo, sans-serif",
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: 12,
            family: "Cairo, sans-serif",
          },
        },
        border: {
          color: "#e5e7eb",
        },
      },
      y: {
        grid: {
          color: "rgba(229, 231, 235, 0.8)",
          lineWidth: 1,
        },
        ticks: {
          color: "#6b7280",
          beginAtZero: true,
          stepSize: 1,
          max: 10,
          font: {
            size: 12,
            family: "Cairo, sans-serif",
          },
        },
        border: {
          color: "#e5e7eb",
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 4,
        borderSkipped: false,
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 10,
      },
    },
  };

  if (!hasData) {
    return (
      <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-purple-600 text-2xl">📊</span>
          </div>
          <p className="text-gray-500">لا توجد بيانات لعرضها</p>
        </div>
      </div>
    );
  }

  return (
    <Chart
      type="bar"
      data={chartData}
      options={chartOptions}
      height={400}
      className="w-full"
    />
  );
}
