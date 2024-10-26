import React from "react";
import {
  LucideIcon,
  User,
  Users,
  Search,
  Clock,
  Wallet,
  Coffee,
  Briefcase,
  Flag,
  BanknoteIcon,
} from "lucide-react";

// Types
type BoxSize = "large" | "small";

interface BoxProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  color: string;
  size: BoxSize;
  showChart?: boolean;
}

interface MetricsData {
  users: number;
  givers: number;
  seekers: number;
  escrowBalance: number;
  walletBalance: number;
  activeContracts: number;
  completedContracts: number;
  disputes: number;
  paymentDisputes: number;
  seekerBalance: number;
  giverBalance: number;
}

// Utility function to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amount);
};

// Chart Component
const Chart: React.FC<{ color: string }> = ({ color }) => (
  <div className="flex items-end space-x-0.5">
    <div className={`w-0.5 h-2 ${color} opacity-50 rounded-sm`}></div>
    <div className={`w-0.5 h-3 ${color} opacity-50 rounded-sm`}></div>
    <div className={`w-0.5 h-4 ${color} opacity-50 rounded-sm`}></div>
  </div>
);

// Box Component
const Box: React.FC<BoxProps> = ({
  icon: Icon,
  value,
  label,
  color,
  size,
  showChart = false,
}) => {
  const boxClasses = `rounded-lg p-4 flex flex-col justify-between ${
    size === "large" ? "col-span-1" : "col-span-1"
  } ${color}`;

  return (
    <div className={boxClasses}>
      <div className="flex justify-between items-start">
        <Icon className={`${size === "large" ? "mb-4" : "mb-2"}`} />
        {showChart && (
          <Chart
            color={
              color.includes("white") || color.includes("yellow")
                ? "bg-gray-400"
                : "bg-white"
            }
          />
        )}
      </div>
      <div>
        <div
          className={`text-xl font-bold ${size === "large" ? "mb-1" : ""} 
              overflow-hidden text-ellipsis whitespace-pre-wrap break-words 
              sm:text-base md:text-lg lg:text-xl`}
        >
          {value}
        </div>
        <div className="text-sm">{label}</div>
      </div>
    </div>
  );
};

// Dashboard Component
const Metrics: React.FC<{ data: MetricsData }> = ({ data }) => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap justify-between gap-4 ">
        {/* Left Section - Two Rows with 8 Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
          <Box
            icon={User}
            value={data.users}
            label="Users"
            color="bg-gray-200"
            size="large"
          />
          <Box
            icon={Users}
            value={data.givers}
            label="Givers"
            color="bg-blue-500 text-white"
            size="large"
            showChart
          />
          <Box
            icon={Search}
            value={data.seekers}
            label="Seekers"
            color="bg-yellow-400"
            size="large"
          />
          <Box
            icon={Clock}
            value={formatCurrency(data.escrowBalance)}
            label="Escrow Balance"
            color="bg-white"
            size="large"
            showChart
          />
          <Box
            icon={Coffee}
            value={data.activeContracts}
            label="Active Contract"
            color="bg-yellow-400"
            size="small"
            showChart
          />
          <Box
            icon={Briefcase}
            value={data.completedContracts}
            label="Completed Contract"
            color="bg-green-200"
            size="small"
            showChart
          />
          <Box
            icon={Flag}
            value={data.disputes}
            label="Dispute"
            color="bg-red-200"
            size="small"
            showChart
          />
          <Box
            icon={BanknoteIcon}
            value={formatCurrency(data.paymentDisputes)}
            label="Payment Dispute"
            color="bg-gray-200"
            size="small"
            showChart
          />
        </div>

        {/* Right Section - Three Stacked Boxes */}
        <div className="flex flex-col gap-4 w-full lg:w-auto">
          <Box
            icon={Wallet}
            value={formatCurrency(data.walletBalance)}
            label="Wallet Balance"
            color="bg-gray-800 text-white"
            size="large"
            showChart
          />
          <Box
            icon={Wallet}
            value={formatCurrency(data.seekerBalance)}
            label="Seeker Balance"
            color="bg-yellow-400"
            size="small"
            showChart
          />
          <Box
            icon={Wallet}
            value={formatCurrency(data.giverBalance)}
            label="Giver Balance"
            color="bg-blue-500 text-white"
            size="small"
            showChart
          />
        </div>
      </div>
    </div>
  );
};

// MetricsTable Component
const MetricsTable: React.FC = () => {
  // Dummy data
  const metricsData: MetricsData = {
    users: 12,
    givers: 1200,
    seekers: 900,
    escrowBalance: 12500120,
    walletBalance: 52000000,
    activeContracts: 900,
    completedContracts: 900,
    disputes: 900,
    paymentDisputes: 12500120,
    seekerBalance: 12500120,
    giverBalance: 52000000,
  };

  return (
    <div>
      <Metrics data={metricsData} />
    </div>
  );
};

export default MetricsTable;
