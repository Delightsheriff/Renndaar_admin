import { DisputeRequestList, SupportRequestList } from "./support";
import Charts from "./Charts";
import MetricsTable from "./Metrics";

export default function OverviewTable() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <MetricsTable />
        <Charts />

        <div className="flex flex-col lg:flex-row gap-4">
          <SupportRequestList />
          <DisputeRequestList />
        </div>
      </main>
    </div>
  );
}
