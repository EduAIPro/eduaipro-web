export type SchoolSignupPayload = {
  personal: {
    firstName: string;
    lastName: string;
    phoneCountryCode: string;
    phoneNumber: string;
    position: string;
    password: string;
    email: string;
  };
  school: {
    institutionName: string;
    city: string;
    state: string;
    streetAddress: string;
    contactEmail: string;
    contactPhoneNumber: string;
    contactPhoneCountryCode: string;
    countryId: string;
  };
};

export type UpdatePersonalInfoPayload = {
  userFirstName: string;
  userLastName: string;
  phoneCountryCode: string;
  phoneNumber: string;
  positionDescription: string;
};

export type UpdateSchoolInfoPayload = {
  institutionName: string;
  contactEmail: string;
  contactPhoneNumber: string;
  contactPhoneCountryCode: string;
  state: string;
  city: string;
  streetAddress: string;
};

export type UpdateSchoolInfoResponse = {
  id: string;
  institutionName: string;
  state: string;
  city: string;
  isActive: boolean;
  isSingle: boolean;
  streetAddress: string;
  contactEmail: string;
  contactPhoneNumber: string;
  contactPhoneCountryCode: string;
  createdAt: string;
  updatedAt: string;
  countryId: string;
};

export type AcceptBulkInvitesPayload = {
  token: string;
  email: string;
  schoolId: string;
  password: string;
};

export type RetrieveSchoolInfoResponse = {
  id: string;
  institutionName: string;
  state: string;
  city: string;
  isActive: boolean;
  isSingle: boolean;
  streetAddress: string;
  contactEmail: string;
  contactPhoneNumber: string;
  contactPhoneCountryCode: string;
  createdAt: string;
  updatedAt: string;
  countryId: null | string;
};
