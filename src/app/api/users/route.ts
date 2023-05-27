import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'
//next/navigation


export async function POST(req: NextRequest) {

  
  // console.log('in the post')

  // console.log('here is the req',req)
  // console.log('here are the headers:', req.headers)

  // console.log(Request.nextUrl)

  // const url = new URL('/FormBuilder','http://localhost:3000/signup')

  // console.log(url.hostname)
  // console.log(url.pathname)


  const dataInHere = await req.json()
  
  const prisma = new PrismaClient()

  try {

    const newUser = await prisma.user.create({ 
      data: {
        username: dataInHere.username,
        email: dataInHere.email,
        password: dataInHere.password
      }
    })

    console.log(newUser)


    return NextResponse.json({ message: 'success' }, { status: 200 })

  } catch(error) {
    console.log(error)
    return NextResponse.json({ error: error }, { status: 500 })
  }

    // const { name, email } = req.body

    // console.log(name, email)


      
    // return NextResponse.json({message:'success in the post'})
  
}