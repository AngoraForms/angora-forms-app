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
    
  
      return NextResponse.json({ message: 'success', status: 200 })
  
    } catch(error) {
      return NextResponse.json({ error: error, status: 500 })
    }

  }

  if (dataInPost.type === 'log in') {

      try {
    
        const findUser = await prisma.user.findFirst({ 
          where: { OR: [{username: dataInPost.usernameEmail},{email: dataInPost.usernameEmail}]}
        })

        if (findUser !== null) {
          
          if (dataInPost.password === findUser.password) {

            const payload = {
              id: findUser.id
            }

            const cookie = jwt.sign(payload, KEY, {expiresIn: 31556926})
            
            return NextResponse.json({ message: 'success', status:200, body: cookie })

          } else {
            return NextResponse.json({ error: 'log in request failed', status: 401 })
          }

        } else {

          return NextResponse.json({ error: 'log in request failed', status: 401 })
        }
  
      } catch(error) {
        return NextResponse.json({ error: error, status: 401 })
      }

  }

  if (dataInPost.type === 'auth') {

    try {
      const decryptToken = jwt.verify(dataInPost.currentToken.key, KEY)
      return NextResponse.json({status: 200, userId:decryptToken.id})

    } catch(error) {
      return NextResponse.json({error: error})
    }

  }

}