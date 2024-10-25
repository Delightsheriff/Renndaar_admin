import { DisputeRequestList, SupportRequestList } from "./support";
import Charts from "./Charts";

export default function OverviewTable() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Charts />

        <div className="flex flex-col lg:flex-row gap-4">
          <SupportRequestList />
          <DisputeRequestList />
        </div>
      </main>
    </div>
  );
}
