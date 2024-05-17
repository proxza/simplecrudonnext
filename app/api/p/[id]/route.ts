import client from "@/lib/appwrite_client";
import { Databases } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

// Fetch a specific post

async function fetchPost(id: string) {
  try {
    const post = await database.getDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, "posts", id);
    return post;
  } catch (error) {
    console.error("Error fetching post - ", error);
    throw new Error("Failed to fetch post!");
  }
}

// Delete s specific post
async function deletePost(id: string) {
  try {
    const response = await database.deleteDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, "posts", id);
    return response;
  } catch (error) {
    console.error("Error deleting post - ", error);
    throw new Error("Failed to delete post!");
  }
}

// Update a specific post
async function updatePost(id: string, data: { title: string; content: string }) {
  try {
    const response = await database.updateDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, "posts", id, data);
    return response;
  } catch (error) {
    console.error("Error updating post - ", error);
    throw new Error("Failed to update post!");
  }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const post = await fetchPost(id);
    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch post!",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    await deletePost(id);
    return NextResponse.json({ message: "Post deleted." });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to delete post!",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const post = await req.json();
    await updatePost(id, post);
    return NextResponse.json({ message: "Post updated!" });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to update post!",
      },
      {
        status: 500,
      }
    );
  }
}
