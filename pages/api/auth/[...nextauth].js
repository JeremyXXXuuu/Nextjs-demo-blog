import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // ...add more providers here
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    {
      id: "orosound",
      name: "Orosound",
      type: "oauth",
      wellKnown: process.env.ORO_OIDC_CONF,
      scope: "openid email profile",
      authorization: { params: { scope: "openid email profile" } },
      clientId: "foo",
      clientSecret: "bar",
      idToken: true,
      //we can't get email and name in Id token
      //https://stackoverflow.com/questions/50740532/should-id-token-contain-claims-when-used-during-authorization-code-flow
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.profile.name,
          email: profile.email,
          role: profile.profile.role,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token to the token right after signin
      console.log("token1", token);
      console.log("account", account);
      console.log("profile", profile);
      if (account) {
        token.id = profile.sub;
        token.accessToken = account.access_token;
      }
      console.log("token2", token);
      return token;
    },
    async session({ session, token, user, profile }) {
      // Send properties to the client, like an access_token from a provider.
      console.log("seesion callback user", user);
      console.log("seesion callback token", token);
      console.log(" session callback session", session);
      console.log(" session callback profile:", profile);
      session.accessToken = token.accessToken;
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log("sign In");
      const isAllowedToSignIn = true;
      console.log(email);
      console.log("sign profile:", profile);
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
  },
  // secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
