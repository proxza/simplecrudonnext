import client from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

// Create post
async function createPost(data: { title: string; content: string }) {
  try {
    const response = await database.createDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, "posts", ID.unique(), data);

    return response;
  } catch (error) {
    console.error("Error creating post - ", error);
    throw new Error("Failed to create the post!");
  }
}

// Fetch post
async function fetchPost() {
  try {
    const response = await database.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string, "posts", [Query.orderDesc("$createdAt")]);

    return response.documents;
  } catch (error) {
    console.error("Error fetching posts - ", error);
    throw new Error("Failed to fetch the post!");
  }
}

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();
    const data = { title, content };
    const response = await createPost(data);
    return NextResponse.json({ message: "Post created." });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to create post.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    const posts = await fetchPost();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch post.",
      },
      {
        status: 500,
      }
    );
  }
}
