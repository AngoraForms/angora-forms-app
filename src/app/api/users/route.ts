import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken';


let KEY = process.env.JWT_KEY;

const prisma = new PrismaClient()


export async function POST(req: NextRequest, res: NextResponse) {

  const dataInPost = await req.json()

  if (dataInPost.type === 'sign up') {

    try {
  
      const newUser = await prisma.user.create({ 
        data: {
          username: dataInPost.username,
          email: dataInPost.email,
          password: dataInPost.password
        }
      })
  
      console.log(newUser)
  
  
      return NextResponse.json({ message: 'success', status: 200 })
  
    } catch(error) {
      console.log(error)
      return NextResponse.json({ error: error, status: 500 })
    }

  }

  if (dataInPost.type === 'log in') {

    console.log('in the log in POST')

      try {

        console.log('in the try')
    
        const findUser = await prisma.user.findFirst({ 
          where: { OR: [{username: dataInPost.usernameEmail},{email: dataInPost.usernameEmail}]}
        })

        console.log('here is the found user:', findUser)


        if (findUser !== null) {
          
          if (dataInPost.password === findUser.password) {

            console.log(findUser)

            const payload = {
              id: findUser.id
            }

            const cookie = jwt.sign(payload, KEY, {expiresIn: 31556926})

            console.log(typeof cookie)
            
            return NextResponse.json({ message: 'success', status:200, body: cookie })

          } else {
            return NextResponse.json({ error: 'log in request failed', status: 401 })
          }

        } else {

          console.log('user is null, therefore we are in the else')

          return NextResponse.json({ error: 'log in request failed', status: 401 })
        }
  
      } catch(error) {
        console.log(error)
        return NextResponse.json({ error: error, status: 401 })
      }

  }
  

}