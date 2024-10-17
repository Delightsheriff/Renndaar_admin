import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, ArrowUpDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type User = {
  id: string;
  fullName: string;
  dateReg: string;
  phoneNo: string;
  email: string;
  verification: "Pending" | "Verified";
  status: "Active" | "Suspended";
};

type SortField = keyof User;
type SortOrder = "asc" | "desc";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const generateDummyUsers = (count: number): User[] => {
  const statuses: User["status"][] = ["Active", "Suspended"];
  const verifications: User["verification"][] = ["Pending", "Verified"];

  return Array.from({ length: count }, (_, i) => ({
    id: `user${i + 1}`,
    fullName: `User ${i + 1}`,
    dateReg: new Date(2022, 0, 1 + i).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    phoneNo: `080${String(i).padStart(8, "0")}`,
    email: `user${i + 1}@example.com`,
    verification:
      verifications[Math.floor(Math.random() * verifications.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));
};

const dummyUsers = generateDummyUsers(100);

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => (
  <div className="flex items-center justify-center space-x-2 my-4">
    <Button
      variant="outline"
      size="icon"
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>
    <span className="text-sm">
      Page {currentPage} of {totalPages}
    </span>
    <Button
      variant="outline"
      size="icon"
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
    >
      <ChevronRight className="h-4 w-4" />
    </Button>
  </div>
);

export default function UserTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortField, setSortField] = useState<SortField>("fullName");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [selectedStatus, setSelectedStatus] = useState<"All" | User["status"]>(
    "All",
  );
  const [selectedVerification, setSelectedVerification] = useState<
    "All" | User["verification"]
  >("All");

  const filteredAndSortedUsers = useMemo(() => {
    return dummyUsers
      .filter(
        (user) =>
          (user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (selectedStatus === "All" || user.status === selectedStatus) &&
          (selectedVerification === "All" ||
            user.verification === selectedVerification),
      )
      .sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [searchTerm, sortField, sortOrder, selectedStatus, selectedVerification]);

  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);

  const paginatedUsers = filteredAndSortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">ALL USERS</h1>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
        <Select defaultValue="This Month">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="This Month">This Month</SelectItem>
            <SelectItem value="Last Month">Last Month</SelectItem>
            <SelectItem value="This Year">This Year</SelectItem>
          </SelectContent>
        </Select>
        <div className="w-full sm:w-auto">
          <Input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64"
          />
        </div>
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px] min-w-[150px]">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSort("fullName")}
                >
                  Full Name{" "}
                  {sortField === "fullName" && (
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="w-[120px] min-w-[120px]">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSort("dateReg")}
                >
                  Date Reg{" "}
                  {sortField === "dateReg" && (
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="w-[120px] min-w-[120px]">
                Phone No.
              </TableHead>
              <TableHead className="w-[200px] min-w-[200px]">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSort("email")}
                >
                  Email{" "}
                  {sortField === "email" && (
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead className="w-[150px] min-w-[150px]">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center cursor-pointer">
                      Verification (KYC) <Filter className="ml-2 h-4 w-4" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onSelect={() => setSelectedVerification("All")}
                    >
                      All
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => setSelectedVerification("Verified")}
                    >
                      Verified
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => setSelectedVerification("Pending")}
                    >
                      Pending
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableHead>
              <TableHead className="w-[120px] min-w-[120px]">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center cursor-pointer">
                      User Status <Filter className="ml-2 h-4 w-4" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onSelect={() => setSelectedStatus("All")}>
                      All
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => setSelectedStatus("Active")}
                    >
                      Active
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => setSelectedStatus("Suspended")}
                    >
                      Suspended
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={`/placeholder.svg?height=32&width=32`}
                        alt={user.fullName}
                      />
                      <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline">{user.fullName}</span>
                    <span className="sm:hidden">
                      {user.fullName.split(" ")[0]}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{user.dateReg}</TableCell>
                <TableCell>{user.phoneNo}</TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {user.email}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.verification === "Verified"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {user.verification}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => setItemsPerPage(Number(value))}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 Per Page</SelectItem>
              <SelectItem value="20">20 Per Page</SelectItem>
              <SelectItem value="50">50 Per Page</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <span className="text-sm text-gray-500">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredAndSortedUsers.length)}{" "}
          of {filteredAndSortedUsers.length}
        </span>
      </div>
    </div>
  );
}
