'use server';
import { db,auth } from "@/firebase/admin"
import { Session } from "inspector/promises";
import { cookies } from "next/headers";
import { _success } from "zod/v4/core";



const SESSION_DURATION= 60*60*27*7

//Sign in
export async function SignUp(params:SignUpParams){
    

    const {uid,name, email,password}=params

   try {
    console.log("Storing user", uid);
    const userRecord = await db.collection("users").doc(uid).get();
    if(userRecord.exists){
        return{
            success:false,
            message:"User already exist"
        }
    }

    await db.collection("users").doc(uid).set({
        name,
        email,
        password
    })
    return{
        success:true,
        message:"User generation is successfull"
    }
    
   } catch (error : any) {
    console.error("Error in creating user" , error)

    if(error.code==="auth/email-already-exists"){
        return {
            success: false,
        message: "This email is already in use",
        }
    }

    return {
        success:false,
        message:"Failed to create account. Please try again"
    }
    
   }

}

export const generateSession= async (tokenID:string)=>{
    const cookieStore=await cookies()

    const sessionCookie=await auth.createSessionCookie(tokenID,{
        expiresIn:SESSION_DURATION *1000
    })

    cookieStore.set("session",sessionCookie,{
        maxAge: SESSION_DURATION,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
    })
}


//Sign in
export async function signIn(params:SignInParams){
    const {email,tokenID}=params

    try {
        const userRecord=await auth.getUserByEmail(email)
        if(!userRecord){
           return{
            success:false,
            message:"Account does not exist"
           }
        }

        await generateSession(tokenID)
    } catch (error:any) {
        console.log(error)
        return {
            success:false,
            message:"Failed to login. Please try again"
        }

        
    }
}

// export async function updateProfile(params:UpdateProfileParams){
//     const {id,name,email,password}=params

//     console.log(name)
//     try {
//         const userRecord=await auth.getUser(id)
//         if(!userRecord){
//             return{
//                 success:false,
//                 message:"Failed to Update. Try again"
//             }
//         }

//         const updateUser=await auth.updateUser(id,{
//             displayName:name,
//             email,
//             password
            

//         })
//         console.log(updateUser)

//         return {
//             successs:true,
//             message:"Successfully Updated"
//         }
        
//     } catch (error) {

//         console.log(error)

//         return{
//             success:false,
//             message:"Error in updating"
//         }
        
//     }

// }

export async function getCurrentUser(){
    const cookieStore=await cookies()
    const sessionCookie=cookieStore.get("session")?.value
    if(!sessionCookie) return null
    try{
        const decodedClaims=await auth.verifySessionCookie(sessionCookie,true)

        console.log(decodedClaims.uid)

        const userRecord=await db
        .collection("users")
        .doc(decodedClaims.uid)
        .get()

        console.log("currentuser is",userRecord.id)
        console.log("userRecord.exists", userRecord.exists);
        console.log("userRecord.data()", userRecord.data());
        if(!userRecord.exists) return null

        return{
            ...userRecord.data(),
            id:userRecord.id } as User
        }catch(error){
            console.log(error)
            return null

        }
    }

export async function isAuthenticated(){
     const user =await getCurrentUser()
     console.log("user is ", user)

     return !!user
}
    
export async function signOut(){
    const cookieStore=await cookies();

    cookieStore.delete("session")
    
}