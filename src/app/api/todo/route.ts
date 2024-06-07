import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { rows } = await sql`select * from todo`;
    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}



//create POST which accept id, text and completed then insert into todo table
export async function POST(req: NextRequest) {
  const { id, text, completed } = await req.json();
  try {
    const { rows } =
      await sql`insert into todo values(${id}, ${text}, ${completed}) returning *`;
    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}

//create DELETE which accept id then delete id's record from todo table
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  try {
    const { rows } = await sql`delete from todo where id = ${id} returning *`;
    return NextResponse.json({ "Record deleted =": rows }, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}

//create PATCH which accept id and completed then updates the id's record from todo table
export async function PATCH(req: NextRequest) {
  const { id, completed } = await req.json();
  try {
    const { rows } =
      await sql`update todo set completed = ${completed} where id = ${id} returning *`;
    return NextResponse.json({ "updated=": rows }, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}

//create PUT which accept id and text then updates the id's record from todo table
export async function PUT(req: NextRequest) {
  const { id, text } = await req.json();
  try {
    const { rows } =
      await sql`update todo set text = ${text} where id = ${id} returning *`;
    return NextResponse.json({ "updated=": rows }, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
} 
