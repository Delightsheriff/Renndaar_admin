import { Link } from "react-router-dom";

type SupportRequest = {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  type: string;
  status: "pending" | "open" | "completed";
  time: string;
};

const supportRequests: SupportRequest[] = [
  {
    id: "1",
    user: { name: "John Doe", avatar: "/placeholder.svg?height=40&width=40" },
    type: "Web Development",
    status: "pending",
    time: "2h ago",
  },
  {
    id: "2",
    user: { name: "Jane Smith", avatar: "/placeholder.svg?height=40&width=40" },
    type: "UI/UX Design",
    status: "open",
    time: "1d ago",
  },
  {
    id: "3",
    user: {
      name: "Bob Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    type: "SEO Optimization",
    status: "completed",
    time: "3d ago",
  },
  {
    id: "4",
    user: {
      name: "Alice Brown",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    type: "Mobile App",
    status: "pending",
    time: "4h ago",
  },
];

export const SupportRequestList: React.FC = () => (
  <div className="bg-white p-4 rounded-lg shadow w-full">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">
        Pending Customer Support Request
      </h2>
      {/* <button className="text-blue-500 hover:text-blue-700">See all</button> */}
      <Link to={"/support"} className="text-blue-500 hover:text-blue-700">
        See all
      </Link>
    </div>
    <ul className="space-y-4">
      {supportRequests.map((request) => (
        <li
          key={request.id}
          className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg"
        >
          <img
            src={request.user.avatar}
            alt={request.user.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <p className="font-medium">{request.user.name}</p>
            <p className="text-sm text-gray-500">{request.type}</p>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              request.status === "pending"
                ? "bg-yellow-200 text-yellow-800"
                : request.status === "open"
                ? "bg-blue-200 text-blue-800"
                : "bg-green-200 text-green-800"
            }`}
          >
            {request.status}
          </span>
          <span className="text-sm text-gray-500">{request.time}</span>
        </li>
      ))}
    </ul>
  </div>
);

type PaymentDispute = {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  type: string;
  status: "pending" | "open" | "completed";
  time: string;
};

const disputes: PaymentDispute[] = [
  {
    id: "1",
    user: { name: "John Doe", avatar: "/placeholder.svg?height=40&width=40" },
    type: "Web Development",
    status: "pending",
    time: "2h ago",
  },
  {
    id: "2",
    user: { name: "Jane Smith", avatar: "/placeholder.svg?height=40&width=40" },
    type: "UI/UX Design",
    status: "open",
    time: "1d ago",
  },
  {
    id: "3",
    user: {
      name: "Bob Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    type: "SEO Optimization",
    status: "completed",
    time: "3d ago",
  },
  {
    id: "4",
    user: {
      name: "Alice Brown",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    type: "Mobile App",
    status: "pending",
    time: "4h ago",
  },
];

export const DisputeRequestList: React.FC = () => (
  <div className="bg-white p-4 rounded-lg shadow w-full">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">Payment Dispute</h2>
      {/* <button className="text-blue-500 hover:text-blue-700">See all</button> */}
      <Link to="/disputes" className="text-blue-500 hover:text-blue-700">
        See all
      </Link>
    </div>
    <ul className="space-y-4">
      {disputes.map((request) => (
        <li
          key={request.id}
          className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg"
        >
          <img
            src={request.user.avatar}
            alt={request.user.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <p className="font-medium">{request.user.name}</p>
            <p className="text-sm text-gray-500">{request.type}</p>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              request.status === "pending"
                ? "bg-yellow-200 text-yellow-800"
                : request.status === "open"
                ? "bg-blue-200 text-blue-800"
                : "bg-green-200 text-green-800"
            }`}
          >
            {request.status}
          </span>
          <span className="text-sm text-gray-500">{request.time}</span>
        </li>
      ))}
    </ul>
  </div>
);
