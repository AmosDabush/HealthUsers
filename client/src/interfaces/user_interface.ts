export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export type TableOrder = "asc" | "desc";
