import * as React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
  Filler,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { cn } from "@/lib/utils";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "bar" | "line" | "doughnut";
  data: {
    labels?: string[];
    datasets: {
      label?: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string | string[];
      borderWidth?: number;
      [key: string]: unknown;
    }[];
  };
  options?: Record<string, unknown>;
  height?: number;
}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  ({ className, type, data, options, height = 300, ...props }, ref) => {
    const defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top" as const,
          labels: {
            font: {
              family: "Noto Kufi Arabic, sans-serif",
            },
          },
        },
        tooltip: {
          titleFont: {
            family: "Noto Kufi Arabic, sans-serif",
          },
          bodyFont: {
            family: "Noto Kufi Arabic, sans-serif",
          },
        },
      },
      scales:
        type !== "doughnut"
          ? {
              x: {
                ticks: {
                  font: {
                    family: "Noto Kufi Arabic, sans-serif",
                  },
                },
              },
              y: {
                ticks: {
                  font: {
                    family: "Noto Kufi Arabic, sans-serif",
                  },
                },
              },
            }
          : undefined,
      ...options,
    };

    const ChartComponent = {
      bar: Bar,
      line: Line,
      doughnut: Doughnut,
    }[type];

    return (
      <div
        ref={ref}
        className={cn("w-full", className)}
        style={{ height }}
        {...props}
      >
        <ChartComponent data={data} options={defaultOptions} />
      </div>
    );
  }
);

Chart.displayName = "Chart";

export { Chart };
