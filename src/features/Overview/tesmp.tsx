import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  TooltipProps,
} from "recharts";
import { CalendarIcon, InfoIcon } from "lucide-react";

// Types
interface UserData {
  date: string;
  android: number;
  ios: number;
}

interface ChartData {
  name: string;
  value: number;
}

interface DateRange {
  start: string;
  end: string;
}

// Custom type for the tooltip
interface CustomTooltipProps extends TooltipProps<any, any> {
  active?: boolean;
  payload?: any[];
  label?: string;
}

// Utility functions
const calculatePercentage = (data: ChartData[]): number => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const active = data.find((item) => item.name === "Active")?.value || 0;
  return Math.round((active / total) * 100);
};

const filterDataByDateRange = (
  data: UserData[],
  range: DateRange,
): UserData[] => {
  const startIndex = data.findIndex((item) => item.date === range.start);
  const endIndex = data.findIndex((item) => item.date === range.end) + 1;
  return data.slice(startIndex, endIndex);
};

// Components
const DateSelector: React.FC<{
  range: DateRange;
  onRangeChange: (range: DateRange) => void;
  availableDates: string[];
}> = ({ range, onRangeChange, availableDates }) => {
  return (
    <div className="flex items-center space-x-4 text-gray-600">
      <CalendarIcon size={20} />
      <select
        className="border rounded p-1"
        value={`${range.start}-${range.end}`}
        onChange={(e) => {
          const [start, end] = e.target.value.split("-");
          onRangeChange({ start, end });
        }}
      >
        <option
          value={`${availableDates[0]}-${
            availableDates[availableDates.length - 1]
          }`}
        >
          Full Range
        </option>
        <option value={`${availableDates[0]}-${availableDates[6]}`}>
          Last 7 Days
        </option>
        <option value={`${availableDates[0]}-${availableDates[13]}`}>
          Last 14 Days
        </option>
      </select>
    </div>
  );
};

const UserChart: React.FC<{ data: UserData[] }> = ({ data }) => {
  const CustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md">
          <p className="font-bold">{`Day ${label}`}</p>
          {payload.map((pld, index) => (
            <p
              key={index}
              style={{ color: pld.color }}
            >{`${pld.name}: ${pld.value}`}</p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="android"
          stroke="#FFA500"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="ios"
          stroke="#007AFF"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const KYCChart: React.FC<{ data: ChartData[] }> = ({ data }) => {
  const COLORS = ["#007AFF", "#FF3B30"];

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const ContractChart: React.FC<{ data: ChartData[] }> = ({ data }) => {
  const COLORS = ["#FFA500", "#34C759", "#FF3B30"];
  const percentage = useMemo(() => calculatePercentage(data), [data]);

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
        {percentage}%
      </div>
    </div>
  );
};

const ToggleSwitch: React.FC<{
  isOn: boolean;
  onToggle: () => void;
}> = ({ isOn, onToggle }) => {
  return (
    <div className="flex items-center space-x-2">
      <div
        className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer ${
          isOn ? "bg-blue-500" : "bg-gray-300"
        }`}
        onClick={onToggle}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${
            isOn ? "translate-x-7" : ""
          }`}
        />
      </div>
      <span className="text-sm text-gray-600">Turned On "Post No Debit"</span>
      <InfoIcon size={16} className="text-gray-400" />
    </div>
  );
};

// Sample data
// Dummy data
const userData: UserData[] = [
  { date: "1", android: 5, ios: 5 },
  { date: "2", android: 6, ios: 8 },
  { date: "3", android: 7, ios: 10 },
  { date: "4", android: 8, ios: 12 },
  { date: "5", android: 8, ios: 14 },
  { date: "6", android: 9, ios: 15 },
  { date: "7", android: 9, ios: 17 },
  { date: "8", android: 10, ios: 17 },
  { date: "9", android: 10, ios: 18 },
  { date: "10", android: 11, ios: 19 },
  { date: "11", android: 12, ios: 22 },
  { date: "12", android: 13, ios: 25 },
  { date: "13", android: 14, ios: 28 },
  { date: "14", android: 14, ios: 29 },
  { date: "15", android: 13, ios: 27 },
  { date: "16", android: 12, ios: 25 },
  { date: "17", android: 11, ios: 22 },
  { date: "18", android: 10, ios: 20 },
  { date: "19", android: 11, ios: 21 },
  { date: "20", android: 12, ios: 23 },
  { date: "21", android: 13, ios: 25 },
  { date: "22", android: 14, ios: 27 },
];

const kycData: ChartData[] = [
  { name: "Verified", value: 75 },
  { name: "Unverified", value: 25 },
];

const contractData: ChartData[] = [
  { name: "Active", value: 40 },
  { name: "Completed", value: 50 },
  { name: "Dispute", value: 10 },
];

// Main Temp Component
const Temp: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: userData[0].date,
    end: userData[userData.length - 1].date,
  });
  const [isToggleOn, setIsToggleOn] = useState(true);

  const filteredUserData = useMemo(
    () => filterDataByDateRange(userData, dateRange),
    [dateRange],
  );

  const availableDates = useMemo(() => userData.map((d) => d.date), []);

  return (
    <div className="my-4">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3 bg-white p-4 rounded-lg shadow">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="flex gap-4">
              <h1 className="text-xl font-bold text-gray-800 mb-2 md:mb-0">
                USERS IN RENNDAAR
              </h1>
              <DateSelector
                range={dateRange}
                onRangeChange={setDateRange}
                availableDates={availableDates}
              />
            </div>
            <div className="flex justify-end space-x-4 mb-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#FFA500] mr-2"></div>
                <span className="text-sm text-gray-600">Android</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#007AFF] mr-2"></div>
                <span className="text-sm text-gray-600">iOS</span>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg shadow">
            <UserChart data={filteredUserData} />
          </div>
        </div>
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="flex-1 bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Verified (KYC)</h2>
            <div className="h-48">
              <KYCChart data={kycData} />
            </div>
          </div>
          <div className="flex-1 bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Contracts</h2>
            <div className="h-48 relative">
              <ContractChart data={contractData} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <ToggleSwitch
              isOn={isToggleOn}
              onToggle={() => setIsToggleOn(!isToggleOn)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Temp;
