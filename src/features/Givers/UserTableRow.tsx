import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/user";

interface UserTableRowProps {
  user: User;
  index: number;
}

export const UserTableRow: React.FC<UserTableRowProps> = ({ user, index }) => {
  return (
    <TableRow
      className={`${
        index % 2 === 0 ? "bg-white" : "bg-gray-200"
      }  border-transparent hover:bg-gray-100`}
    >
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
          <span className="sm:hidden">{user.fullName.split(" ")[0]}</span>
        </div>
      </TableCell>
      <TableCell>{user.dateReg}</TableCell>
      <TableCell>{user.phoneNo}</TableCell>
      <TableCell className="max-w-[200px] truncate">{user.email}</TableCell>
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
  );
};
