export type AdminSchool = {
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
  _count: {
    staffMembers: number;
  };
  owner: SchoolOwner;
};

export type SchoolOwner = {
  firstName: string;
  lastName: string;
  email: string;
};
