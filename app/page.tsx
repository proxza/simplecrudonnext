"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IPost {
  $id: string;
  title: string;
  content: string;
}

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/posts/");
        if (!response.ok) {
          throw new Error("Failed to fetch posts!");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log("Error: ", error);
        setError("Failed to load posts. Please try reload the page!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/posts/${id}`, { method: "DELETE" });
      setPosts((prevPosts) => prevPosts?.filter((i) => i.$id !== id));
    } catch (error) {
      setError("Failed to delete post. Please try again!");
    }
  };

  return (
    <div>
      {error && <p className="py-4 text-red-600">{error}</p>}
      {isLoading ? (
        <p>Loading posts...</p>
      ) : posts?.length > 0 ? (
        <div>
          {posts?.map((post) => (
            <div key={post.$id} className="p-4 my-2 rounded-md border-b leading-8">
              <div className="font-bold">
                <Link href={`/post/${post.$id}`}>{post.title}</Link>
              </div>
              <div>{post.content}</div>

              <div className="flex gap-4 mt-4 justify-end">
                <Link className="bg-slate-200 px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest" href={`/edit/${post.$id}`}>
                  Edit
                </Link>
                <button onClick={() => handleDelete(post.$id)} className="bg-red-600 text-white px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts get found.</p>
      )}
    </div>
  );
}
