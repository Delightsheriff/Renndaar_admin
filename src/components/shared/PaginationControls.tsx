import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  showingFrom?: number;
  showingTo?: number;
  totalItems?: number;
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
  showingFrom,
  showingTo,
  totalItems,
  //   itemsPerPage,
  //   onItemsPerPageChange,
}) => {
  return (
    // <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
    // <div className="flex items-center justify-center space-x-2 my-4">
    <div className="my-4">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="bg-yellow-100 border-none text-black font-extrabold rounded-xl"
          size="icon"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-bold">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          className="bg-yellow-100 border-none text-black font-extrabold rounded-xl"
          size="icon"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <p>
        {" "}
        {showingFrom && showingTo && totalItems && (
          <span className="text-sm text-gray-500 font-medium">
            Showing {showingFrom} to {showingTo} of {totalItems}
          </span>
        )}
      </p>
    </div>
  );
};
