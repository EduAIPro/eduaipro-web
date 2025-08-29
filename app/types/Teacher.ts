export interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  school: string;
  teachingLevel: string;
  status: "Active" | "Inactive";
  dateJoined: string;
}