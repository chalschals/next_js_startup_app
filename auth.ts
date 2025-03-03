import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { AUTHOR_BY_GITHUB_EMAIL_QUERY } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write-client"


export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    signIn: async ({ user, profile }: any) => {
      const existingUser = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_EMAIL_QUERY, { email: profile.email });
      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: profile.id,
          name: user?.name,
          username: profile?.login,
          email: user?.email,
          image: user?.image,
          bio: profile?.bio || ""
        })
        console.log("New User Created :: ", user?.email)
      }
      return true;
    },

    jwt: async (params: any) => {
      const { token } = params;
      if (token.email) {
        const user = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_EMAIL_QUERY, { email: token.email });
        if (user) {
          token.id = user.id
        }
      }
      return token
    },

    session: async (params: any) => {
      const { session, token } = params;
      Object.assign(session, { id: token.id });
      return session;
    },
  }
})