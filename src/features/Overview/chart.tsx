// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// type ChartData = {
//   name: string;
//   users: number;
//   revenue: number;
// };

// const chartData: ChartData[] = [
//   { name: "1", users: 4000, revenue: 2400 },
//   { name: "5", users: 3000, revenue: 1398 },
//   { name: "10", users: 2000, revenue: 9800 },
//   { name: "15", users: 2780, revenue: 3908 },
//   { name: "20", users: 1890, revenue: 4800 },
//   { name: "25", users: 2390, revenue: 3800 },
//   { name: "30", users: 3490, revenue: 4300 },
// ];

// export const Chart: React.FC = () => (
//   <div className="bg-white p-4 rounded-lg shadow">
//     <div className="flex items-center justify-between mb-4">
//       <h2 className="text-lg font-semibold">Users in thousands</h2>
//       <div className="flex items-center space-x-2">
//         <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
//         <span className="text-sm text-gray-600">Current</span>
//         <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
//         <span className="text-sm text-gray-600">Previous</span>
//       </div>
//     </div>
//     <ResponsiveContainer width="100%" height={300}>
//       <LineChart data={chartData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Line
//           type="monotone"
//           dataKey="users"
//           stroke="#3b82f6"
//           strokeWidth={2}
//           dot={false}
//         />
//         <Line
//           type="monotone"
//           dataKey="revenue"
//           stroke="#facc15"
//           strokeWidth={2}
//           dot={false}
//         />
//       </LineChart>
//     </ResponsiveContainer>
//   </div>
// );
