
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export async function POST (req: Request, res:Response) {
  const dataInPost = await req.json();
  try {
    const newSavedComponent = await prisma.SavedComponents.create({
      data: {
        html: dataInPost.htmlCode,
        typescript: dataInPost.tsCode,
        user: {connect: { id: 51 }}
      }
    })

    return NextResponse.json({ message: 'successfully saved form component' }, { status: 200 });
  } catch(error) {
    console.log(error)
    return NextResponse.json({ error: error }, { status: 500 })
  }

}