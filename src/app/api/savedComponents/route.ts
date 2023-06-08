
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma/db';

//rerouting all POST request into this function
export async function POST(req: Request) {
  //make the information that was sent readable
  const dataInPost = await req.json();

  //Here we are modularizing the type of request we are based on type property
  //if we are savingCode ...
  if (dataInPost.type === 'saveCode') {
 
    const { htmlCode, tsCode, userid } = dataInPost;

    try {
      //creating a field in sql db
      const newSavedComponent = await prisma.savedComponents.create({
        data: {
          html: htmlCode,
          typescript: tsCode,
          //refers to user table with userid
          user: { connect: { id: userid } },
        },
      });

      return NextResponse.json(
        { message: 'successfully saved form component ' + newSavedComponent },
        { status: 200 }
      );
    } catch (error) {

      return NextResponse.json({ error: error }, { status: 500 });
    }
  }
  // if we are trying to get the savedCode ..
  else if (dataInPost.type === 'getCode') {
    try {
      //get every single gield with the logged in userid
      const getSavedComponent = await prisma.savedComponents.findMany({
        where: {
          userid: dataInPost.userid,
        },
      });
      return NextResponse.json({ message: getSavedComponent }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }
  //we are deleting the savedCode from our db/account
  else if (dataInPost.type === 'deleteCode') {
    try {
      //delete the component of the current displayed component
      const getDeletedComponent = await prisma.savedComponents.delete({
        where: {
          componentid: dataInPost.componentid,
        },
      });
      return NextResponse.json(
        { message: 'deletedComp:' + getDeletedComponent },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }
}
