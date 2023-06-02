
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export async function POST (req: Request, res:Response) {
  const dataInPost = await req.json();
  if ( dataInPost.type === 'saveCode') {
    const { htmlCode, tsCode, userid } = dataInPost;
    try {
      const newSavedComponent = await prisma.SavedComponents.create({
        data: {
          html: htmlCode,
          typescript: tsCode,
          user: {connect: { id: userid }}
        }
      })
      return NextResponse.json({ message: 'successfully saved form component' }, { status: 200 });
    } catch(error) {
      console.log(error)
      return NextResponse.json({ error: error }, { status: 500 })
    }
  }
  else if ( dataInPost.type === 'getCode') {
    try {
      const getSavedComponent = await prisma.SavedComponents.findMany({
        // 51 is where there cookiie is suppose to inform our backend what saved components to fetch
        where: { userid: dataInPost.userid }
      })
      return NextResponse.json({ message: getSavedComponent }, { status: 200 })
    } catch (error) {
      console.log(error)
      return NextResponse.json({ error: error }, { status: 500 })
    }
  }

}