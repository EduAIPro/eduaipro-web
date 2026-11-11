import { Pagination } from "./school";

export type CreateConsultationRequest = {
  schoolName: string;
  email: string;
  consultationDate: string; // "YYYY-MM-DD"
  schoolSize: number; // integer
};

export type CreateConsultationResponse = {
  id: string;
  schoolName: string;
  email: string;
  consultationDate: string;
  schoolSize: number;
};

export type ConsultationRequestRow = {
  id: string;
  schoolName: string;
  email: string; // "" for requests saved before email was collected
  consultationDate: string;
  schoolSize: number;
  createdAt: string;
};

export type ConsultationListResponse = {
  pagination: Pagination;
  data: ConsultationRequestRow[];
};
