import { useState, useMemo } from "react";
import { Giver, GiverSortField, GiverSortOrder } from "@/types/user";

interface UseTableStateProps {
  initialData: Giver[];
  defaultItemsPerPage?: number;
}

export const useGiverState = ({
  initialData,
  defaultItemsPerPage = 10,
}: UseTableStateProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [sortField, setSortField] = useState<GiverSortField>("fullName");
  const [sortOrder, setSortOrder] = useState<GiverSortOrder>("asc");
  const [selectedStatus, setSelectedStatus] = useState<"All" | Giver["status"]>(
    "All",
  );

  const filteredAndSortedGivers = useMemo(() => {
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

  const totalPages = Math.ceil(filteredAndSortedGivers.length / itemsPerPage);
  const paginatedGivers = filteredAndSortedGivers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSort = (field: GiverSortField) => {
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
    filteredAndSortedGivers,
    paginatedGivers,
    totalPages,
  };
};
