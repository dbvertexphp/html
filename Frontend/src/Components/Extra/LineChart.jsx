import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineChart({ options, data }) {
  return <Line options={options} data={data} />;
}
/* <Card p={5} width={{ base: "100%", md: "65%" }}>
  <LineChart options={LineOptions} data={LineData} />
</Card> */

// const LineOptions = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//     title: {
//       display: true,
//       text: "Chart.js Line Chart",
//     },
//   },
// };

// var labels = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// const LineData = {
//   labels,
//   datasets: [
//     {
//       label: "Teachers",
//       data: [87, 32, 56, 48, 50, 62, 54, 73, 61, 79, 87, 82],
//       borderColor: "rgb(255, 99, 132)",
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//     },
//     {
//       label: "Vendors",
//       data: [76, 52, 35, 64, 69, 47, 58, 81, 53, 70, 82, 97],
//       borderColor: "rgb(53, 162, 235)",
//       backgroundColor: "rgba(53, 162, 235, 0.5)",
//     },
//   ],
// };
