import { Pagination } from "../school";
import { Staff } from "../user";

export type SystemStaff = Staff & { school: { institutionName: string } };

export type GetSystemStaffs = {
  pagination: Pagination;
  data: SystemStaff[];
};
