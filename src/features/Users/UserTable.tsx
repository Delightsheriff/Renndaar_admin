import { Table, TableBody } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { dummyUsers } from "@/data/mockUsers";
import { UserTableRow } from "./UserTableRow";
import { UserTableHeader } from "./UserTableHeader";
import { UserTableControls } from "./UserTableControls";
// import { PaginationControls } from "../shared/PaginationControls";
import { useTableState } from "@/hooks/useTableState";
import { PaginationControls } from "@/components/shared/PaginationControls";
import { Button } from "@/components/ui/button";

export default function UserTable() {
  //TODO: Implement the following:
  // 1. Implement the api to fetch the user from the server

  const {
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    itemsPerPage,
    setItemsPerPage,
    sortField,
    handleSort,
    // selectedStatus,
    // selectedVerification,
    setSelectedStatus,
    setSelectedVerification,
    filteredAndSortedUsers,
    paginatedUsers,
    totalPages,
  } = useTableState({ initialData: dummyUsers });

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white border-none rounded-md">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">ALL USERS</h1>

      <UserTableControls searchTerm={searchTerm} onSearchChange={setSearchTerm}>
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          //   showingFrom={(currentPage - 1) * itemsPerPage + 1}
          //   showingTo={Math.min(
          //     currentPage * itemsPerPage,
          //     filteredAndSortedUsers.length,
          //   )}
          //   totalItems={filteredAndSortedUsers.length}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </UserTableControls>

      <div className="overflow-x-auto">
        <Table>
          <UserTableHeader
            sortField={sortField}
            sortOrder="asc"
            handleSort={handleSort}
            setSelectedVerification={setSelectedVerification}
            setSelectedStatus={setSelectedStatus}
          />
          <TableBody>
            {paginatedUsers.map((user, index) => (
              <UserTableRow key={user.id} user={user} index={index} />
            ))}
          </TableBody>
        </Table>
      </div>

      {/* <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between  space-y-2 sm:space-y-0">
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => setItemsPerPage(Number(value))}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 Per Page</SelectItem>
            <SelectItem value="20">20 Per Page</SelectItem>
            <SelectItem value="50">50 Per Page</SelectItem>
          </SelectContent>
        </Select>
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          showingFrom={(currentPage - 1) * itemsPerPage + 1}
          showingTo={Math.min(
            currentPage * itemsPerPage,
            filteredAndSortedUsers.length,
          )}
          totalItems={filteredAndSortedUsers.length}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
        />
        <Button>Jump</Button>
      </div> */}
      <div className="mt-10 flex flex-col sm:flex-row items-center sm:items-center justify-between space-y-4 sm:space-y-0">
        <div className="w-full sm:w-auto flex justify-center sm:justify-start">
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => setItemsPerPage(Number(value))}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 Per Page</SelectItem>
              <SelectItem value="20">20 Per Page</SelectItem>
              <SelectItem value="50">50 Per Page</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-auto flex justify-center sm:justify-start">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            showingFrom={(currentPage - 1) * itemsPerPage + 1}
            showingTo={Math.min(
              currentPage * itemsPerPage,
              filteredAndSortedUsers.length,
            )}
            totalItems={filteredAndSortedUsers.length}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>
        <div className="w-full sm:w-auto flex justify-center sm:justify-start">
          <Button>Jump</Button>
        </div>
      </div>
    </div>
  );
}
