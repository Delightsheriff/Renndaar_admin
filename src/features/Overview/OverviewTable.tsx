import { DisputeRequestList, SupportRequestList } from "./support";
import Temp from "./tesmp";

export default function OverviewTable() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Temp />
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8"> */}
        {/* <div className="lg:col-span-2"> */}
        {/* <div className="flex justify-between gap-6">
          <div className="flex-1">
            <Chart />
          </div>
          <PieChartComponent />
        </div> */}
        <div className="flex flex-col lg:flex-row gap-4">
          <SupportRequestList />
          <DisputeRequestList />
        </div>
      </main>
    </div>
  );
}
