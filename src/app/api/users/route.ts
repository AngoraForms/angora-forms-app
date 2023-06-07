import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma/db';
import jwt from 'jsonwebtoken';


let KEY = process.env.JWT_KEY;


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

      const payload = {
        id: newUser.id
      }

      const cookie = jwt.sign(payload, KEY, {expiresIn: 31556926})
    
  
      return NextResponse.json({ message: `successsful log in by ${dataInPost.username}`, status:200, body: cookie })
  
    } catch(error) {
      return NextResponse.json({ error: error, status: 401 })
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
            
            return NextResponse.json({ message: `successsful log in by ${dataInPost.usernameEmail}`, status:200, body: cookie, id: findUser.id })

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