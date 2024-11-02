import { useState, useMemo } from "react";
import { Seeker, SeekerSortField, SeekerSortOrder } from "@/types/user";

interface UseTableStateProps {
  initialData: Seeker[];
  defaultItemsPerPage?: number;
}

export const useSeekerState = ({
  initialData,
  defaultItemsPerPage = 10,
}: UseTableStateProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [sortField, setSortField] = useState<SeekerSortField>("fullName");
  const [sortOrder, setSortOrder] = useState<SeekerSortOrder>("asc");
  const [selectedStatus, setSelectedStatus] = useState<
    "All" | Seeker["status"]
  >("All");

  const filteredAndSortedSeekers = useMemo(() => {
    return initialData
      .filter(
        (user) =>
          (user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (selectedStatus === "All" || user.status === selectedStatus),
      )
      .sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [initialData, searchTerm, sortField, sortOrder, selectedStatus]);

  const totalPages = Math.ceil(filteredAndSortedSeekers.length / itemsPerPage);
  const paginatedSeekers = filteredAndSortedSeekers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSort = (field: SeekerSortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return {
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    itemsPerPage,
    setItemsPerPage,
    sortField,
    sortOrder,
    handleSort,
    selectedStatus,
    setSelectedStatus,
    filteredAndSortedSeekers,
    paginatedSeekers,
    totalPages,
  };
};
