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
