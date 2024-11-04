// const Disputes = () => {
//   return <div>Disputes</div>;
// };

// export default Disputes;

"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Filter, Search, ThumbsDown, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Types
type DisputeStatus = "Closed" | "Open" | "In-Review";
type Entity = "Seeker" | "Giver" | "Renndaar";

type Dispute = {
  id: number;
  raisedBy: {
    name: string;
    avatar: string;
  };
  entity: Entity;
  date: string;
  serviceClass: string;
  contractAmount: number;
  disputeAmount: number;
  status: DisputeStatus;
};

// Generate dummy data
const generateDummyData = (count: number): Dispute[] => {
  const users = [
    { name: "Janet Doe", avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Funke Adebayo", avatar: "/placeholder.svg?height=32&width=32" },
    { name: "CS", avatar: "/placeholder.svg?height=32&width=32" },
  ];

  const entities: Entity[] = ["Seeker", "Giver", "Renndaar"];
  const statuses: DisputeStatus[] = ["Closed", "Open", "In-Review"];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    raisedBy: users[Math.floor(Math.random() * users.length)],
    entity: entities[Math.floor(Math.random() * entities.length)],
    date: format(
      addDays(new Date(), -Math.floor(Math.random() * 30)),
      "dd MMM yyyy",
    ),
    serviceClass: "Web Development",
    contractAmount: 250000.0,
    disputeAmount: 250000.0,
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amount);
};

const StatsCard = ({
  title,
  value,
  icon,
  className,
}: {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
}) => (
  <Card className={className}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="mt-4 h-[30px]">
        {/* Placeholder for mini chart */}
        <div className="flex h-full items-end gap-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="bg-primary/20 w-[4px]"
              style={{ height: `${Math.random() * 100}%` }}
            />
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function Disputes() {
  const [disputes] = React.useState<Dispute[]>(generateDummyData(100));
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredDisputes = disputes.filter(
    (dispute) =>
      dispute.raisedBy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dispute.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dispute.serviceClass.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredDisputes.length / itemsPerPage);
  const paginatedDisputes = filteredDisputes.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  // const totalDisputes = disputes.length;
  // const totalPaymentDisputes = disputes.filter(
  //   (d) => d.status === "Open",
  // ).length;
  const totalRefunds = disputes.reduce(
    (acc, curr) => acc + curr.disputeAmount,
    0,
  );

  return (
    <div className="w-full space-y-6 p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Disputes"
          value={30}
          className="bg-[#FF7171] text-white"
        />
        <StatsCard
          title="Payment Dispute"
          value={125}
          className="bg-gray-400 text-white"
        />
        <StatsCard
          title="All Dispute"
          value={195}
          icon={<ThumbsDown className="h-4 w-4" />}
        />
        <StatsCard
          title="Total Refunds"
          value={formatCurrency(totalRefunds)}
          icon={<Clock className="h-4 w-4" />}
        />
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">PAYMENT DISPUTE</h2>
            <Select defaultValue="this-month">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="3-months">Last 3 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-[300px]">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
              <Input
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Raised By</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Service Class</TableHead>
                <TableHead>Contract Amount (₦)</TableHead>
                <TableHead>Dispute Amount (₦)</TableHead>
                <TableHead>Dispute Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedDisputes.map((dispute) => (
                <TableRow key={dispute.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={dispute.raisedBy.avatar}
                          alt={dispute.raisedBy.name}
                        />
                        <AvatarFallback>
                          {dispute.raisedBy.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      {dispute.raisedBy.name}
                    </div>
                  </TableCell>
                  <TableCell>{dispute.entity}</TableCell>
                  <TableCell>{dispute.date}</TableCell>
                  <TableCell>{dispute.serviceClass}</TableCell>
                  <TableCell>
                    {formatCurrency(dispute.contractAmount)}
                  </TableCell>
                  <TableCell>{formatCurrency(dispute.disputeAmount)}</TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        dispute.status === "Closed"
                          ? "bg-red-100 text-red-600"
                          : dispute.status === "Open"
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {dispute.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      ...
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => setItemsPerPage(parseInt(value))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 Per Page</SelectItem>
                <SelectItem value="20">20 Per Page</SelectItem>
                <SelectItem value="50">50 Per Page</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-500">
              Showing {itemsPerPage} of {filteredDisputes.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm">Jump to:</span>
              <Input
                type="number"
                min={1}
                max={totalPages}
                value={page}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value >= 1 && value <= totalPages) {
                    setPage(value);
                  }
                }}
                className="w-16"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
