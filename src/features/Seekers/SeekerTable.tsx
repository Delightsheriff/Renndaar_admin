import { Table, TableBody } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { dummySeeker } from "@/data/mockUsers";
import { SeekerTableRow } from "./SeekerTableRow";
import { SeekerTableHeader } from "./SeekerTableHeader";
import { SeekerTableControls } from "./SeekerTableControls";
import { PaginationControls } from "@/components/shared/PaginationControls";
import { Button } from "@/components/ui/button";
import { useSeekerState } from "@/hooks/seekerTableState";

export default function SeekerTable() {
  const {
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    itemsPerPage,
    setItemsPerPage,
    sortField,
    sortOrder,
    handleSort,
    setSelectedStatus,
    filteredAndSortedSeekers,
    paginatedSeekers,
    totalPages,
  } = useSeekerState({ initialData: dummySeeker });

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white border-none rounded-md">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">ALL SEEKERS</h1>

      <SeekerTableControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      >
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </SeekerTableControls>

      <div className="overflow-x-auto">
        <Table>
          <SeekerTableHeader
            sortField={sortField}
            sortOrder={sortOrder}
            handleSort={handleSort}
            setSelectedStatus={setSelectedStatus}
          />
          <TableBody>
            {paginatedSeekers.map((seeker, index) => (
              <SeekerTableRow key={seeker.id} user={seeker} index={index} />
            ))}
          </TableBody>
        </Table>
      </div>

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
              filteredAndSortedSeekers.length,
            )}
            totalItems={filteredAndSortedSeekers.length}
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
