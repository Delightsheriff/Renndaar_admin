import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SeekerTableControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  children: React.ReactNode;
}

export const SeekerTableControls: React.FC<SeekerTableControlsProps> = ({
  searchTerm,
  onSearchChange,
  children,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center mb-4 space-y-4 sm:space-y-0">
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
      <div className="w-full sm:w-auto flex justify-center sm:justify-start">
        {children}
      </div>
      <div className="w-full sm:w-auto">
        <Input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full sm:w-64"
        />
      </div>
    </div>
  );
};
