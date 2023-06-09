import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma/db';
import jwt, { JwtPayload } from 'jsonwebtoken';

const KEY = process.env.JWT_KEY!;

// if (!KEY) {
//   throw new Error('Missing JWT_KEY environment variable');
// }

export async function POST(req: NextRequest) {
  const dataInPost = await req.json();

  if (dataInPost.type === 'sign up') {
    try {
      const newUser = await prisma.user.create({
        data: {
          username: dataInPost.username,
          email: dataInPost.email,
          password: dataInPost.password,
        },
      });
      const payload = {
        id: newUser.id,
      };

      const cookie = jwt.sign(payload, KEY, { expiresIn: 31556926 });

      return NextResponse.json({
        message: `successsful log in by ${dataInPost.username}`,
        status: 200,
        body: cookie,
      });
    } catch (error) {
      return NextResponse.json({ error: error, status: 401 });
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
            
            return NextResponse.json({ message: `successsful log in by ${dataInPost.usernameEmail}`, status:200, body: cookie, user: findUser.username })

          } else {
            return NextResponse.json({ error: 'log in request failed', status: 401 })
          }
        }  else {
          return NextResponse.json({ error: 'log in request failed', status: 401 })
        }
      
    } catch (error) {
      return NextResponse.json({ error: error, status: 401 });
    }
  }

  if (dataInPost.type === 'auth') {
    try {
      if (typeof dataInPost.currentToken === 'string') {
        const decryptToken = jwt.verify(dataInPost.currentToken, KEY) as JwtPayload;
        try {
          const findUser = await prisma.user.findFirst({ 
            where: {id: decryptToken.id}
          })
          console.log('founder user:',findUser)
          return NextResponse.json({ status: 200, user: findUser?.username, userId: findUser?.id });
        } catch (error) {
          return NextResponse.json({error:error})
        }
      } else {
        throw new Error('Missing or invalid token');
      }
    } catch (error) {
      return NextResponse.json({ error: error });
    }
  }
  
}
