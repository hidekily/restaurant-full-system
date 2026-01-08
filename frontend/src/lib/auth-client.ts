import { createAuthClient } from "better-auth/client";
import { emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3001", // URL do seu backend Fastify
  
  plugins: [
    emailOTPClient() 
  ],
});

