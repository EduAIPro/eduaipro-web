import api from "./base";

export const fetchUnitDetails = (args: string[]) =>
  api.get(`${args[0]}/${args[1]}`).then((res) => res.data.data);

export const fetchUnitQuestions = (url: string) =>
  api.get(url).then((res) => res.data.data);
