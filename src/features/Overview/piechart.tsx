// // import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
// // // import { ResponsiveContainer } from "recharts";

// // type PieChartData = {
// //   name: string;
// //   value: number;
// //   color: string;
// // };

// // const pieChartData2: PieChartData[] = [
// //   { name: "Verified (KYC)", value: 30, color: "#0071FF" },
// //   { name: "Unverified", value: 25, color: "#F97A60" },
// // ];
// // const pieChartData1: PieChartData[] = [
// //   { name: "Direct", value: 30, color: "#0088FE" },
// //   { name: "Social", value: 25, color: "#00C49F" },
// //   { name: "Email", value: 45, color: "#FFBB28" },
// // ];

// // export const PieChartComponent: React.FC = () => (
// //   <div className="bg-white p-4 rounded-lg shadow">
// //     <section>
// //       <h2 className="text-lg font-semibold mb-4">Contacts</h2>
// //       <div className="flex items-center justify-center">
// //         <ResponsiveContainer width={200} height={200}>
// //           <PieChart>
// //             <Pie
// //               data={pieChartData1}
// //               cx="50%"
// //               cy="50%"
// //               innerRadius={60}
// //               outerRadius={80}
// //               fill="#8884d8"
// //               paddingAngle={5}
// //               dataKey="value"
// //             >
// //               {pieChartData1.map((entry, index) => (
// //                 <Cell key={`cell-${index}`} fill={entry.color} />
// //               ))}
// //             </Pie>
// //           </PieChart>
// //         </ResponsiveContainer>
// //         <div className="ml-4">
// //           {pieChartData1.map((entry, index) => (
// //             <div key={index} className="flex items-center mb-2">
// //               <span
// //                 className={`w-3 h-3 rounded-full mr-2`}
// //                 style={{ backgroundColor: entry.color }}
// //               ></span>
// //               <span className="text-sm text-gray-600">
// //                 {entry.name}: {entry.value}%
// //               </span>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //     <section>
// //       <div className="flex items-center justify-center">
// //         <ResponsiveContainer width={200} height={200}>
// //           <PieChart>
// //             <Pie
// //               data={pieChartData2}
// //               cx="50%"
// //               cy="50%"
// //               innerRadius={60}
// //               outerRadius={80}
// //               fill="#8884d8"
// //               paddingAngle={5}
// //               dataKey="value"
// //             >
// //               {pieChartData2.map((entry, index) => (
// //                 <Cell key={`cell-${index}`} fill={entry.color} />
// //               ))}
// //             </Pie>
// //           </PieChart>
// //         </ResponsiveContainer>
// //         <div className="ml-4">
// //           {pieChartData2.map((entry, index) => (
// //             <div key={index} className="flex items-center mb-2">
// //               <span
// //                 className={`w-3 h-3 rounded-full mr-2`}
// //                 style={{ backgroundColor: entry.color }}
// //               ></span>
// //               <span className="text-sm text-gray-600">
// //                 {entry.name}: {entry.value}%
// //               </span>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   </div>
// // );

// import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// type PieChartData = {
//   name: string;
//   value: number;
//   color: string;
// };

// const pieChartData2: PieChartData[] = [
//   { name: "Verified (KYC)", value: 30, color: "#0071FF" },
//   { name: "Unverified", value: 25, color: "#F97A60" },
// ];

// const pieChartData1: PieChartData[] = [
//   { name: "Direct", value: 30, color: "#0088FE" },
//   { name: "Social", value: 25, color: "#00C49F" },
//   { name: "Email", value: 45, color: "#FFBB28" },
// ];

// interface ChartSectionProps {
//   data: PieChartData[];
//   title?: string;
// }

// const ChartSection: React.FC<ChartSectionProps> = ({ data, title }) => (
//   <div className="w-full p-2">
//     {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
//     <div className="flex flex-col items-center">
//       <div className="h-48 w-full">
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={data}
//               cx="50%"
//               cy="50%"
//               innerRadius={45}
//               outerRadius={60}
//               fill="#8884d8"
//               paddingAngle={5}
//               dataKey="value"
//             >
//               {data.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={entry.color} />
//               ))}
//             </Pie>
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//       <div className="grid grid-cols-1 gap-2 mt-2">
//         {data.map((entry, index) => (
//           <div key={index} className="flex items-center">
//             <span
//               className="w-2.5 h-2.5 rounded-full mr-2"
//               style={{ backgroundColor: entry.color }}
//             />
//             <span className="text-sm text-gray-600">
//               {entry.name}: {entry.value}%
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// );

// export const PieChartComponent: React.FC = () => (
//   <div className="bg-white p-4 rounded-lg shadow h-full">
//     <div className="grid grid-rows-2 h-full">
//       <ChartSection data={pieChartData1} title="Contacts" />
//       <ChartSection data={pieChartData2} />
//     </div>
//   </div>
// );

// export default PieChartComponent;
