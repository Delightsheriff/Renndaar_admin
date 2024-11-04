// const PrivacySecurity = () => {
//   return <div>PrivacySecurity</div>;
// };

// export default PrivacySecurity;


import * as React from "react";
import { addDays, format, subMonths, startOfMonth, endOfMonth } from "date-fns";
import { ChevronDown, Filter, Printer, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Types
type User = {
  id: number;
  initiatorName: string;
  initiatorAvatar: string;
  dateInitiated: string;
  reportedName: string;
  reportedAvatar: string;
  reason: string | null;
  status: "New Activity" | "Resolved" | "Blocked" | "Pending";
};

type TimeRange = "all" | "this-month" | "last-month" | "3-months";

// Generate dummy data
const generateDummyData = (
  count: number,
  status: User["status"] = "New Activity",
): User[] => {
  const users = ["Funke Adebayo", "Samuel Johnson", "Janet Doe", "Nonso Jude"];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    initiatorName: users[Math.floor(Math.random() * users.length)],
    initiatorAvatar: `/placeholder.svg?height=40&width=40`,
    dateInitiated: format(
      addDays(new Date(), -Math.floor(Math.random() * 90)),
      "dd MMM yyyy",
    ),
    reportedName: users[Math.floor(Math.random() * users.length)],
    reportedAvatar: `/placeholder.svg?height=40&width=40`,
    reason:
      Math.random() > 0.3
        ? "Here is the reason for reporting this user..."
        : "Nil",
    status,
  }));
};

const EmptyState = () => (
  <div className="text-center py-10">
    <h3 className="mt-2 text-sm font-semibold text-gray-900">No data</h3>
    <p className="mt-1 text-sm text-gray-500">
      There are no entries to display at this time.
    </p>
  </div>
);

export default function PrivacySecurity() {
  const [newEntries] = React.useState<User[]>(
    generateDummyData(100, "New Activity"),
  );
  const [resolvedEntries] = React.useState<User[]>(
    generateDummyData(50, "Resolved"),
  );
  const [blockedEntries] = React.useState<User[]>(
    generateDummyData(20, "Blocked"),
  );
  const [pendingEntries] = React.useState<User[]>(
    generateDummyData(30, "Pending"),
  );
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(15);
  const [timeRange, setTimeRange] = React.useState<TimeRange>("all");
  const [reportedType, setReportedType] = React.useState("Reported Givers");
  const [searchQuery, setSearchQuery] = React.useState("");

  const getEntriesByTab = (tab: string) => {
    switch (tab) {
      case "new":
        return newEntries;
      case "resolved":
        return resolvedEntries;
      case "blocked":
        return blockedEntries;
      case "pending":
        return pendingEntries;
      default:
        return [];
    }
  };

  const filterEntriesByTimeRange = (entries: User[], range: TimeRange) => {
    const now = new Date();
    switch (range) {
      case "this-month":
        return entries.filter(
          (entry) =>
            new Date(entry.dateInitiated) >= startOfMonth(now) &&
            new Date(entry.dateInitiated) <= endOfMonth(now),
        );
      case "last-month": {
        const lastMonth = subMonths(now, 1);
        return entries.filter(
          (entry) =>
            new Date(entry.dateInitiated) >= startOfMonth(lastMonth) &&
            new Date(entry.dateInitiated) <= endOfMonth(lastMonth),
        );
      }
      case "3-months":
        return entries.filter(
          (entry) => new Date(entry.dateInitiated) >= subMonths(now, 3),
        );
      default:
        return entries;
    }
  };

  const filterEntriesBySearch = (entries: User[], query: string) => {
    if (!query) return entries;
    return entries.filter(
      (entry) =>
        entry.initiatorName.toLowerCase().includes(query.toLowerCase()) ||
        entry.reportedName.toLowerCase().includes(query.toLowerCase()) ||
        entry.reason?.toLowerCase().includes(query.toLowerCase()),
    );
  };

  const renderTable = (entries: User[]) => {
    let filteredEntries = filterEntriesByTimeRange(entries, timeRange);
    filteredEntries = filterEntriesBySearch(filteredEntries, searchQuery);

    const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);
    const paginatedData = filteredEntries.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage,
    );

    if (filteredEntries.length === 0) {
      return <EmptyState />;
    }

    return (
      <>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name of Initiator</TableHead>
                <TableHead>Dated Initiated</TableHead>
                <TableHead>Reported Party</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={item.initiatorAvatar}
                          alt={item.initiatorName}
                        />
                        <AvatarFallback>{item.initiatorName[0]}</AvatarFallback>
                      </Avatar>
                      {item.initiatorName}
                    </div>
                  </TableCell>
                  <TableCell>{item.dateInitiated}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={item.reportedAvatar}
                          alt={item.reportedName}
                        />
                        <AvatarFallback>{item.reportedName[0]}</AvatarFallback>
                      </Avatar>
                      {item.reportedName}
                    </div>
                  </TableCell>
                  <TableCell>{item.reason}</TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        item.status === "New Activity"
                          ? "bg-blue-100 text-blue-600"
                          : item.status === "Resolved"
                          ? "bg-green-100 text-green-600"
                          : item.status === "Blocked"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {item.status}
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

        <div className="mt-4 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => setItemsPerPage(parseInt(value))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 Per Page</SelectItem>
                <SelectItem value="25">25 Per Page</SelectItem>
                <SelectItem value="50">50 Per Page</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-500">
              Showing {itemsPerPage} of {filteredEntries.length}
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
      </>
    );
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="new" className="w-full">
        <TabsList className="border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger
            value="new"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-yellow-400 data-[state=active]:bg-transparent"
          >
            New Entry{" "}
            <span className="ml-2 rounded-full bg-yellow-400 px-2 py-0.5 text-xs">
              {newEntries.length}
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="resolved"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-yellow-400 data-[state=active]:bg-transparent"
          >
            Resolved{" "}
            <span className="ml-2 rounded-full bg-yellow-400 px-2 py-0.5 text-xs">
              {resolvedEntries.length}
            </span>
          </TabsTrigger>
        </TabsList>

        {["new", "resolved"].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue} className="mt-6">
            <Tabs defaultValue="givers" className="w-full">
              <div className="overflow-x-auto">
                <TabsList className="h-auto space-x-2 rounded-none bg-transparent p-0 w-max">
                  <TabsTrigger
                    value="givers"
                    className="rounded-md bg-yellow-400 data-[state=active]:bg-yellow-400"
                  >
                    Reported Givers & Seekers
                  </TabsTrigger>
                  <TabsTrigger
                    value="contracts"
                    className="rounded-md bg-transparent data-[state=active]:bg-yellow-400"
                  >
                    Reported Contract Request & Services
                  </TabsTrigger>
                  <TabsTrigger
                    value="blocked"
                    className="rounded-md bg-transparent data-[state=active]:bg-yellow-400"
                  >
                    Blocked Service
                  </TabsTrigger>
                  <TabsTrigger
                    value="inspection"
                    className="rounded-md bg-transparent data-[state=active]:bg-yellow-400"
                  >
                    Reported Inspection Request
                  </TabsTrigger>
                </TabsList>
              </div>

              {["givers", "contracts", "blocked", "inspection"].map(
                (subTabValue) => (
                  <TabsContent
                    key={subTabValue}
                    value={subTabValue}
                    className="mt-6"
                  >
                    <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full md:w-[200px]"
                            >
                              {reportedType}
                              <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="start"
                            className="w-[200px]"
                          >
                            <DropdownMenuItem
                              onSelect={() =>
                                setReportedType("Reported Givers")
                              }
                            >
                              Reported Givers
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={() =>
                                setReportedType("Reported Seekers")
                              }
                            >
                              Reported Seekers
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <Select
                          value={timeRange}
                          onValueChange={(value: TimeRange) =>
                            setTimeRange(value)
                          }
                        >
                          <SelectTrigger className="w-full md:w-[200px]">
                            <SelectValue placeholder="Select time range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Time</SelectItem>
                            <SelectItem value="this-month">
                              This Month
                            </SelectItem>
                            <SelectItem value="last-month">
                              Last Month
                            </SelectItem>
                            <SelectItem value="3-months">
                              Last 3 Months
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <div className="relative flex-1">
                          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
                          <Input
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon">
                          <Filter className="h-4 w-4" />
                          <span className="sr-only">Filter</span>
                        </Button>
                        <Button variant="outline" size="icon">
                          <Printer className="h-4 w-4" />
                          <span className="sr-only">Print</span>
                        </Button>
                      </div>
                    </div>

                    {renderTable(getEntriesByTab(tabValue))}
                  </TabsContent>
                ),
              )}
            </Tabs>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
