// app/api/notes/route.js
import { getAuth } from "@clerk/nextjs/server";
import clientPromise from "@/lib/mongodb"; // Import your MongoDB client
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(req) {
  const { userId } = getAuth(req); // Get user ID from Clerk
  const { title, content } = await req.json(); // Get data from request body

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db("noteApp"); // Your MongoDB database name
  const collection = db.collection("notes");

  const newNote = {
    title,
    content,
    userId,
    createdAt: new Date(),
  };

  await collection.insertOne(newNote);

  return NextResponse.json({ message: "Note created!" });
}

export async function GET(req) {
  const { userId } = getAuth(req);

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db("noteApp");
  const collection = db.collection("notes");

  const notes = await collection.find({ userId }).toArray();

  return NextResponse.json(notes);
}
