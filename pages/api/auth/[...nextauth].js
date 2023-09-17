// api/auth/[...nextauth].js

import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import mongodb from "@/utils/mongodb";
import UserModel from "@/models/user";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        // const user ={id:"1"}
        // return user;
        const { username, passwort } = credentials;
        console.log(username)
        console.log(passwort)

        try {
          await mongodb.dbConnect();
          const user = await UserModel.findOne({ username });
          console.log(user)

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

          const userData= {
            id: user._id,
            username: user.username,
            role: user.role
          }

          console.log(userData)

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    storage:"sessionStorage",
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/create"
  },
  cookie: {
    secure: false,
  },
  storage: "sessionStorage",

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