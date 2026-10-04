import type { NextAuthOptions } from "next-auth";

/**
 * Add OAuth or Credentials providers here when authentication is configured.
 * Keeping this route available lets SessionProvider safely resolve an
 * unauthenticated session during development.
 */
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [],
  session: { strategy: "jwt" },
};
