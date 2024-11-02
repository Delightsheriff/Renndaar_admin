export type User = {
  id: string;
  fullName: string;
  dateReg: string;
  phoneNo: string;
  email: string;
  verification: "Pending" | "Verified";
  status: "Active" | "Suspended";
};

export type SortField = keyof User;
export type SortOrder = "asc" | "desc";

export interface Seeker {
  id: string | number;
  fullName: string;
  email: string;
  dateOfContract: string;
  phoneNo: string;
  location: string;
  status: "Active" | "Suspended";
}

export type SeekerSortField = keyof Seeker;
export type SeekerSortOrder = "asc" | "desc";
