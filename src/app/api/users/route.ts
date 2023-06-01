import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function POST(req: NextRequest) {

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
  
  
      return NextResponse.json({ message: 'success' }, { status: 200 })
  
    } catch(error) {
      console.log(error)
      return NextResponse.json({ error: error }, { status: 500 })
    }

  }

  if (dataInPost.type === 'log in') {

      try {
    
        const findUser = await prisma.user.findFirst({ 
          where: { OR: [{username: dataInPost.usernameEmail},{email: dataInPost.usernameEmail}]}
        })


        if (findUser !== null) {
          
          if (dataInPost.password === findUser.password) {

            console.log(findUser)
            return NextResponse.json({ message: 'success' }, { status: 200 })

          } else {
            return NextResponse.json({ message: 'log in request failed' }, { status: 401 })
          }

        } else {
          return NextResponse.json({ message: 'log in request failed' }, { status: 401 })
        }
  
      } catch(error) {
        console.log(error)
        return NextResponse.json({ error: error }, { status: 401 })
      }

  }
  

}