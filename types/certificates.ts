export type ListCertificates = {
  pagination: {
    total: number;
    current: number;
    next: null | number;
  };
  data: Accreditation[];
};

export type AccreditationStatus = "ACCREDITED" | "NOT_ACCREDITED";

export type Accreditation = {
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
