import { AdminSchool } from "@/types/admin";
import { Pagination } from "@/types/school";
import { User } from "@/types/user";

export enum TicketResolutionStatus {
  PENDING = "PENDING",
  RESOLVED = "RESOLVED",
}

export enum TicketCategory {
  GENERAL = "GENERAL",
  TECHNICAL_ISSUE = "TECHNICAL_ISSUE",
  CONTENT_FEEDBACK = "CONTENT_FEEDBACK",
  ACCOUNT_HELP = "ACCOUNT_HELP",
  OTHER = "OTHER",
}

export type SupportTicket = {
  id: string;
  code: string;
  message: string;
  email: string;
  name: string;
  resolutionStatus: TicketResolutionStatus;
  category:
    | "GENERAL"
    | "TECHNICAL_ISSUE"
    | "CONTENT_FEEDBACK"
    | "ACCOUNT_HELP"
    | "OTHER";
  response: null | string;
  schoolId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  school?: AdminSchool;
  user?: User;
};

export type TableTicket = Omit<SupportTicket, "school" | "user">;
export type GetSupportTicketList = {
  pagination: Pagination;
  data: TableTicket[];
};

export type UpdateTicketPayload = {
  response: string;
  resolutionStatus: TicketResolutionStatus;
  code: string;
};

export type CreateTicketPayload = {
  category: TicketCategory;
  message: string;
  name?: string;
  email?: string;
};
