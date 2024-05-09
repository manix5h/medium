import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import z from 'zod';
import {signupInput, signinInput, blogInput, updateInput} from "@manix5h/medium-common"
import { cors } from 'hono/cors'

// import { userRouter } from './route/user'
// import { blogRouter } from './route/blog'
const app = new Hono<{
  Bindings:{
    DATABASE_URL:string
    JWT_SECRET:string
  },
  Variables:{

    userId:string
    
  }
}>()
app.use('/*', cors())



 
// app.route('/api/v1/user', userRouter)
// app.route('/api/v1/blog', blogRouter)

app.post('/api/v1/signup', async (c) => {

  const body = await c.req.json();
  const {success} = signupInput.safeParse(body)
  if(!success){
    c.status(411);
    return c.json({
      message:"invalid validation"
    })
  }
 
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())


try{
  const user = await prisma.user.create({
    data:{
      email:body.email,
      password:body.password
    }
  });
  const jwt = await sign({id:user.id,email:body.email}, c.env.JWT_SECRET);
  console.log(jwt)
  return c.json(jwt);
  
}
  catch(e){
    console.log(e)
    c.status(403);
    return c.json({error:"error while signup"});
  }
  
 
})



app.post('/api/v1/signin',  async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try{
    
    const body = await c.req.json();
    // const {success} = signinInput.safeParse(body);
    
    // if(!success){
    //   c.status(411);
    //   return c.json({
    //     error:"wrong signin validation"
    //   })
    // }
  const user = await prisma.user.findUnique({
    where:{
      email:body.email,
      password:body.password
    }
  });

  if(!user){
    c.status(403);
    return c.json(
      {
        error:"user not found"
      }
    )
  }

  const jwt = await sign({id:user.id},c.env.JWT_SECRET)
  console.log(jwt)
  return c.json(jwt)
  }

  catch(e){
    console.log(e);
    c.status(403);
    return c.text("invalid")
  } 
})

app.use('/*', async (c,next)=>{
  const authHeader = c.req.header("authorization") || "";
  const user = await verify(authHeader, c.env.JWT_SECRET);
  if(user){
    c.set("userId", user.id)
    await next()
  } else{
    c.status(403);
    return c.json({
      error:"unable to login"
    })
  }
})


app.post('/api/v1/blog', async(c) => {
  const authorID = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const {success} = blogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      error:"wrong create post validation"
    })
  }
  

 const post  = await prisma.post.create({
  data:{
    title:body.title,
    content:body.content,
    
    authorId:Number(authorID)
  }
 })

  return c.json(
    {
      id:post.id
    }
  )
})



app.put('/api/v1/update-blog', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();

  const {success} = updateInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      error:"wrong update validaton"
    })
  }

 const post  = await prisma.post.update({
  where:{
    id:body.id
  },
  data:{
    title:body.title,
    content:body.content,
    
  }
 })

  return c.json(
    {
      id:post.id
    }
  )
  
})


app.get("/api/v1/bulk",async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl:c.env.DATABASE_URL,

  }).$extends(withAccelerate());

  const posts = await prisma.post.findMany({
    select:{
      content:true,
      title:true,
      id:true,
      author:{
        select:{
          name:true
        }
      }
    }
  });

	return c.json({
    posts
  })
})
export default app



app.get('/api/v1/blog/:id', async(c) => {

  try{
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
  
    }).$extends(withAccelerate());
    const id = await c.req.param('id');
    const post = await prisma.post.findFirst({
      where:{
       
        id:Number(id)
      },
      select:{
        content:true,
        title:true,
        id:true,
        author:{
          select:{
            name:true
          }
        }
      }
    })
    return c.json({
      post
    })
  } catch(e){
    c.status(411);
    return c.json({ 
      message:"error while fetching"
    })

  } 
})
