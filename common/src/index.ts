import z from "zod"



 export const signupInput = z.object({
    email:z.string().email(),
    password:z.string().min(6),
    name:z.string().optional()
  
  })

  export type SignupType = z.infer<typeof signupInput>;



  export const signinInput = z.object({
    email:z.string().email(),
    password:z.string().min(6)
  })

  export type SigninType = z.infer<typeof signinInput>;




  export const blogInput = z.object({
    title:z.string().min(10),
    content:z.string().min(10)
  })
  export type blogInput = z.infer<typeof blogInput>;




  export const updateInput = z.object({
    title:z.string().min(10),
    content:z.string().min(10),
    id:z.number()
  })

  export type updateInput = z.infer<typeof updateInput>;
  