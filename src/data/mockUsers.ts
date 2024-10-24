import { User } from "@/types/user";

export const generateDummyUsers = (count: number): User[] => {
  const statuses: User["status"][] = ["Active", "Suspended"];
  const verifications: User["verification"][] = ["Pending", "Verified"];

  return Array.from({ length: count }, (_, i) => ({
    id: `user${i + 1}`,
    fullName: `User ${i + 1}`,
    dateReg: new Date(2022, 0, 1 + i).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    phoneNo: `080${String(i).padStart(8, "0")}`,
    email: `user${i + 1}@example.com`,
    verification:
      verifications[Math.floor(Math.random() * verifications.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));
};

// This will be replaced with API calls later
export const dummyUsers = generateDummyUsers(100);
