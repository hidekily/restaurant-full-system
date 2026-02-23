import { createAuthClient } from "better-auth/client";
import { API_URL } from "@/lib/api";

export const authClient = createAuthClient({
  baseURL: API_URL,
});