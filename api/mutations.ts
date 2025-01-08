import api from "./base";

export async function signup(data: {}) {
  const res = await api.post("/auth/user/signup", data);
}
