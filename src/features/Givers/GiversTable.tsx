import { Table, TableBody } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { dummyGiver } from "@/data/mockUsers";
import { GiversTableRow } from "./GiversTableRow";
import { GiversTableHeader } from "./GiversTableHeader";
import { GiversTableControls } from "./GiversTableControls";
import { PaginationControls } from "@/components/shared/PaginationControls";
import { Button } from "@/components/ui/button";
import { useGiverState } from "@/hooks/giverTableState";

export default function GiverTable() {
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
    filteredAndSortedGivers,
    paginatedGivers,
    totalPages,
  } = useGiverState({ initialData: dummyGiver });

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white border-none rounded-md">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">ALL GIVERS</h1>

      <GiversTableControls
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
      </GiversTableControls>

      <div className="overflow-x-auto">
        <Table>
          <GiversTableHeader
            sortField={sortField}
            sortOrder={sortOrder}
            handleSort={handleSort}
            setSelectedStatus={setSelectedStatus}
          />
          <TableBody>
            {paginatedGivers.map((seeker, index) => (
              <GiversTableRow key={seeker.id} user={seeker} index={index} />
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
              filteredAndSortedGivers.length,
            )}
            totalItems={filteredAndSortedGivers.length}
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
