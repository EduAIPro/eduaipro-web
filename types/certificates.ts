export type ListCertificates = {
  pagination: {
    total: number;
    current: number;
    next: null | number;
  };
  data: Certificate[];
};

export type AccreditationStatus = "ACCREDITED" | "NOT_ACCREDITED";

export type Certificate = {
  id: string;
  issuingBodyName: string;
  certificateName: string;
  certificateId: string;
  certificateImageUrl: string;
  issuedAt: string;
  expiresAt: string;
  accreditationStatus: AccreditationStatus;
  isLatest: boolean;
  createdAt: string;
  updatedAt: string;
  staffId: string;
  courseId: string;
};
