import { UserRoles } from "../auth";

export type School = {
  admins: any[];
  _id: string;
  name: string;
  adminName?: string;
  city?: string;
  state?: string;
  type: string;
  location: string;
  contactNumber: string;
  officialEmail: string;
  contactEmail?: string;
  focusAreas?: any[];
  staffCount?: number;
  role: UserRoles;
  isActive: boolean;
  website?: string;
  position: string;
  schoolID: string;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  teachers?: any[];
  activeAdminsCount: number;
  id: string;
};

export type Teacher = {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  isActive: boolean;
  qualifications: string;
  teachingLevel: string;
  specialSkills: string[];
  createdAt: string;
};
