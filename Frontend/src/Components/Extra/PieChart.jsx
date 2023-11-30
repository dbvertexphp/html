import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  plugins: {
    legend: {
      display: true,
    },
    datalabels: {
      display: true, // Hide the labels on top of the pie chart
    },
  },
};
export function PieChart({ data }) {
  return <Pie data={data} options={options} />;
}
