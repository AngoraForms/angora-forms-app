import { PrismaClient } from "@prisma/client"; 

console.log('inside of the user route')


const prisma = new PrismaClient()

export async function POST(req: Request) {

  // const reqObj = await req.json()

  const { username, email, password } = await req.json()


  console.log(username, email, password)

  const newUser = await prisma.user.create({
    data: {
      username: username, 
      email: email, 
      password: password,
    },
  })

  console.log(newUser)
}