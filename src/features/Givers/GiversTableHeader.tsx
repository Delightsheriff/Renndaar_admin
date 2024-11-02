import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Giver, GiverSortField, GiverSortOrder } from "@/types/user";

interface GiversTableHeaderProps {
  sortField: GiverSortField;
  sortOrder: GiverSortOrder;
  handleSort: (field: GiverSortField) => void;
  setSelectedStatus: (value: "All" | Giver["status"]) => void;
}

export const GiversTableHeader: React.FC<GiversTableHeaderProps> = ({
  sortField,
  handleSort,
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
            Full Name
            {sortField === "fullName" && (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </div>
        </TableHead>
        <TableHead className="w-[200px] min-w-[200px]">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleSort("email")}
          >
            Email
            {sortField === "email" && <ArrowUpDown className="ml-2 h-4 w-4" />}
          </div>
        </TableHead>
        <TableHead className="w-[150px] min-w-[150px]">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleSort("dateOfContract")}
          >
            Date of Contract
            {sortField === "dateOfContract" && (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </div>
        </TableHead>
        <TableHead className="w-[120px] min-w-[120px]">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleSort("phoneNo")}
          >
            Phone Number
            {sortField === "phoneNo" && (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </div>
        </TableHead>
        <TableHead className="w-[120px] min-w-[120px]">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleSort("location")}
          >
            Location
            {sortField === "location" && (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </div>
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
