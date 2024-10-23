import { useState, useMemo } from "react";
import { User, SortField, SortOrder } from "@/types/user";

interface UseTableStateProps {
  initialData: User[];
  defaultItemsPerPage?: number;
}

export const useTableState = ({
  initialData,
  defaultItemsPerPage = 10,
}: UseTableStateProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [sortField, setSortField] = useState<SortField>("fullName");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [selectedStatus, setSelectedStatus] = useState<"All" | User["status"]>(
    "All",
  );
  const [selectedVerification, setSelectedVerification] = useState<
    "All" | User["verification"]
  >("All");

  const filteredAndSortedUsers = useMemo(() => {
    return initialData
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
  }, [
    initialData,
    searchTerm,
    sortField,
    sortOrder,
    selectedStatus,
    selectedVerification,
  ]);

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
    selectedVerification,
    setSelectedVerification,
    filteredAndSortedUsers,
    paginatedUsers,
    totalPages,
  };
};
