import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { CreateUser, findUser } from "./action";
import { redirect } from "next/dist/server/api-utils";
export const authOptions:any = {
  // Configure one or more authentication providers
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENTID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
      }),
    // ...add more providers here
  ],
  callbacks: {
    authorized({ auth, request }:{auth:any,request:any}) {
      return !!auth?.user;
    },
    async signIn(auth:any){
        try{
          const existingGuest=  await findUser(auth.user.email);
          if(!existingGuest){
            let userId="";
            if(auth.account.provider=="google"){
             const s=await CreateUser({...auth.profile,provider:auth.account.provider});
             userId=s?.data._id;            
            }
            else if(auth.account.provider=="github"){
              const [given_name,family_name]=auth.user.name.trim().split(" ");
              const picture=auth.profile.avatar_url;
              const s=await CreateUser({...auth.profile,given_name,picture,family_name,provider:auth.account.provider});
              userId=s?.data._id;
            }
          }
          return true;
        }
        catch(err:any){
            console.log(err.message);
            return false;
        }
    },
    async session({session}:{session:any}){
      try{
          const user:any=await findUser(await session?.user.email);
          // console.log(session);
          // console.log(guest);
          session.user._id=user?._id;
          session.user.image=user?.profile_img;
          session.user.username=user?.username;
          // console.log(session);
          return session;
      }catch(err:any){
          console.log("SESSION m ERROR");
          console.log(err.message);
      }
  }
},
pages:{
  signIn:"/signin",
},
}


export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
 } =NextAuth(authOptions)