"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Post({ params }: { params: { id: string } }) {
  const [post, setPostData] = useState({ title: "", content: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/posts/${params.id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch post.");
        }

        const data = await response.json();

        setPostData({
          title: data.post.title,
          content: data.post.content,
        });
      } catch (error) {
        setError("Failed to load post.");
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <div className="p-4 my-2 rounded-md border-b leading-8">
        <div className="font-bold">{post.title}</div>
        <div>{post.content}</div>

        <div className="flex gap-4 mt-4 justify-end">
          <Link className="bg-slate-200 px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest" href={`/edit/${params.id}`}>
            Edit
          </Link>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest">Delete</button>
        </div>
      </div>
    </div>
  );
}
