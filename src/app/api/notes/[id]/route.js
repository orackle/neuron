// app/api/notes/[id]/route.js
import { getAuth } from "@clerk/nextjs/server";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PUT(req, { params }) {
  const { userId } = getAuth(req);
  const { title, updatedContent } = await req.json(); // Extract both title and updated content
  const { id } = params; // Get the note ID from the URL params

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db("noteApp");
  const collection = db.collection("notes");

  const result = await collection.updateOne(
    { _id: new ObjectId(id), userId }, // Ensure the query uses ObjectId for the note ID
    { $set: { title, content: updatedContent, updatedAt: new Date() } } // Update both title and content
  );

  if (result.modifiedCount === 0) {
    return new NextResponse("Note not found or not updated", { status: 404 });
  }

  return NextResponse.json({ message: "Note updated!" });
}

export async function DELETE(req) {
  const { userId } = getAuth(req);
  const { id } = await req.json(); // Get the id from the request body

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db("noteApp");
  const collection = db.collection("notes");

  await collection.deleteOne({ _id: new ObjectId(id), userId });

  return NextResponse.json({ message: "Note deleted!" });
}
