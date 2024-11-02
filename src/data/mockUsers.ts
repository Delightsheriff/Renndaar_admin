import { User, Seeker, Giver } from "@/types/user";

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

export const generateDummySeeker = (count: number): Seeker[] => {
  const statuses: Seeker["status"][] = ["Active", "Suspended"];

  return Array.from({ length: count }, (_, i) => ({
    id: `user${i + 1}`,
    fullName: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    dateOfContract: new Date(2022, 0, 1 + i).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    phoneNo: `080${String(i).padStart(8, "0")}`,
    location: `Location ${i + 1}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));
};

// This will be replaced with API calls later
export const dummySeeker = generateDummySeeker(100);

export const generateDummyGiver = (count: number): Giver[] => {
  const statuses: Giver["status"][] = ["Active", "Suspended"];

  return Array.from({ length: count }, (_, i) => ({
    id: `user${i + 1}`,
    fullName: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    dateOfContract: new Date(2022, 0, 1 + i).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    phoneNo: `080${String(i).padStart(8, "0")}`,
    location: `Location ${i + 1}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));
};

// This will be replaced with API calls later
export const dummyGiver = generateDummyGiver(100);
