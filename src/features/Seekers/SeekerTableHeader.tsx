import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SortField, SortOrder, User } from "@/types/user";

interface SeekerTableHeaderProps {
  sortField: SortField;
  sortOrder: SortOrder;
  handleSort: (field: SortField) => void;
  setSelectedVerification: (value: "All" | User["verification"]) => void;
  setSelectedStatus: (value: "All" | User["status"]) => void;
}

export const SeekerTableHeader: React.FC<SeekerTableHeaderProps> = ({
  //   sortField,
  handleSort,
  setSelectedVerification,
  setSelectedStatus,
}) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[150px] min-w-[150px]">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleSort("fullName")}
          >
            Full Name <ArrowUpDown className="ml-2 h-4 w-4" />
            {/* {sortField === "fullName" && (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )} */}
          </div>
        </TableHead>
        <TableHead className="w-[120px] min-w-[120px]">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleSort("dateReg")}
          >
            Date Reg <ArrowUpDown className="ml-2 h-4 w-4" />
            {/* {sortField === "dateReg" && (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )} */}
          </div>
        </TableHead>
        <TableHead className="w-[120px] min-w-[120px]">Phone No.</TableHead>
        <TableHead className="w-[200px] min-w-[200px]">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleSort("email")}
          >
            Email <ArrowUpDown className="ml-2 h-4 w-4" />
            {/* {sortField === "email" && <ArrowUpDown className="ml-2 h-4 w-4" />} */}
          </div>
        </TableHead>
        <TableHead className="w-[150px] min-w-[150px]">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center cursor-pointer">
                Verification (KYC) <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setSelectedVerification("All")}>
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
                User Status <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setSelectedStatus("All")}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSelectedStatus("Active")}>
                Active
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSelectedStatus("Suspended")}>
                Suspended
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};
