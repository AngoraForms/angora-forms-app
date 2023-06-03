
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma/db';

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

  else if (dataInPost.type === 'getCode') {

    try {
      const getSavedComponent = await prisma.savedComponents.findMany({
        where: { 
          userid: dataInPost.userid 
        }
      })
      return NextResponse.json({ message: getSavedComponent }, { status: 200 })
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 })
    }
  } 

  else if (dataInPost.type === 'deleteCode') {
    
    try {
      const getDeletedComponent = await prisma.savedComponents.delete({
        where: {
          componentid: dataInPost.componentid
        }
      })
      return NextResponse.json({ message: 'deletedComp:' + getDeletedComponent }, { status: 200 })
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 })
    }
  }
}
