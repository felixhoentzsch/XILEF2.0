// api/auth/[...nextauth].js

import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import mongodb from "@/utils/mongodb";
import UserModel from "@/models/user";

// const UserInfo = async (username) =>{
//     await mongodb.dbConnect()
//     const user = await UserModel.findOne({ username });
//     console.log("userInfo"+user)
//     return user
// }

export default NextAuth({
  providers: [
    CredentialsProvider({
    //   name: "credentials",
    //   credentials: {},
      async authorize(credentials) {
        // var user2 = {
        //     id: "1",
        //     name: "Max Mustermann",
        //     email: "max@example.com",
        //     role: "admin",
        //     customField: "Custom data here",
        //   };
        //  console.log(user2)
        //  return Promise.resolve(user2);
        const { username, passwort } = credentials;
        console.log(username)
        console.log(passwort)

        try {
          await mongodb.dbConnect();
          const user = await UserModel.findOne({ username });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(passwort, user.passwort);
          console.log(passwort)
          console.log(user.passwort)
          console.log(passwordsMatch)

          if (!passwordsMatch) {
            return null;
          }

        console.log(user)
        
        const returnedUser={
            username: user.username,
            role: user.role,
            Zentrum: user.Zentrum_ID,
            Studie: user.Studien_ID,
            mail: user.mail
        }

        return Promise.resolve(returnedUser)

        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    storage:"sessionStorage",
    strategy: "jwt", 
    jwt: "true"
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/create", 
  },
  cookie: {
    secure: false,
  },
  storage: "sessionStorage",

  callbacks: {
    jwt: async ({ token, user }) => {
        user && (token.user = user)
        return token
    },
    session: async ({ session, token }) => {
        session.user = token.user
        return session
    }
}

});


// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import mongodb from "@/utils/mongodb";
// import UserModel from "@/models/user";

// const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {},

//       async authorize(credentials) {
//         const { username, passwort } = credentials;

//         try {
//           await mongodb.dbConnect()
//           const user = await UserModel.findOne({ username });

//           if (!user) {
//             return null;
//           }

//           const passwordsMatch = await bcrypt.compare(passwort, user.passwort);

//           if (!passwordsMatch) {
//             return null;
//           }

//           return user;
//         } catch (error) {
//           console.log("Error: ", error);
//         }
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/create",
//   },
// };

// const handler = NextAuth(authOptions);

//  export { handler as GET, handler as POST };