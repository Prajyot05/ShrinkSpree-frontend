import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
  ChartOptions,
  ChartData,
} from "chart.js";

ChartJS.register(
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend,
  Filler
);

interface GraphProps {
  graphData: { clickDate: string; count: number }[];
}

const Graph: React.FC<GraphProps> = ({ graphData }) => {
  const labels = graphData?.map((item) => item.clickDate);
  const userPerDay = graphData?.map((item) => item.count);

  const data: ChartData<"bar"> = {
    labels: graphData.length > 0 ? labels : Array(14).fill(""),
    datasets: [
      {
        label: "Total Clicks",
        data:
          graphData.length > 0
            ? userPerDay
            : [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1],
        backgroundColor:
          graphData.length > 0 ? "#3b82f6" : "rgba(54, 162, 235, 0.1)",
        borderColor: "#1D2327",
        barThickness: 20,
        categoryPercentage: 1.5,
        barPercentage: 1.5,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return Number.isInteger(value) ? value.toString() : "";
          },
        },
        title: {
          display: true,
          text: "Number Of Clicks",
          font: {
            family: "Arial",
            size: 16,
            weight: "bold",
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
          font: {
            family: "Arial",
            size: 16,
            weight: "bold",
          },
        },
      },
    },
  };

  return <Bar className="w-full h-full" data={data} options={options} />;
};

export default Graph;
