import api from "./base";

type fetchSchoolStaffsParams = {
  accountStatus?: string;
  accreditationStatus?: string;
};
export const fetchWithSingleParam = (args: string[]) =>
  api.get(`${args[0]}/${args[1]}`).then((res) => res.data.data);

export const fetchUnitQuestions = (url: string) =>
  api.get(url).then((res) => res.data.data);

export const fetchPaginatedData = (args: string[]) =>
  api.get(`${args[0]}?page=${args[1]}`).then((res) => res.data.data);

export const generalFetcher = (url: string) =>
  api.get(url).then((res) => res.data.data);

export const fetchWithSearchQuery = (args: string[]) =>
  api.get(`${args[0]}?search=${args[1]}`).then((res) => res.data.data);

export const fetchPaginatedSearchQuery = (args: string[]) =>
  api
    .get(`${args[0]}?page=${args[1]}&search=${args[2]}`)
    .then((res) => res.data.data);

export const fetchSchoolStaffs = (
  url: string,
  params: fetchSchoolStaffsParams
) => {
  let queryUrl = url + "?";

  if (params.accountStatus) {
    queryUrl += `account-status=${params.accountStatus}`;
  }

  if (params.accreditationStatus) {
    const prefix = params.accountStatus ? "&" : "";
    queryUrl += prefix + `accreditation-status=${params.accreditationStatus}`;
  }

  return api.get(queryUrl).then((res) => res.data.data);
};
