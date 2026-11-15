import { authClient } from "./auth-client";
import { headers } from "next/headers";
import { auth } from "./auth";

// Get Token from Client
export const getTokenFromClient = async () => {
  const { data } = await authClient.token();
  const token = data?.token;
  return token;
};

// Get Token from Server
export const getTokenFromServer = async () => {
  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  });
  const token = jwtToken?.token;
  return token;
};