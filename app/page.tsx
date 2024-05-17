import Link from "next/link";
import { useEffect, useState } from "react";

interface IPosts {
  $id: string;
  title: string;
  content: string;
}

export default function Home() {
  const [posts, setPosts] = useState<IPosts[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/p/");
        if (!response.ok) {
          throw new Error("Failed to fetch posts!");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setIsLoading(false);
      }
    };
  }, []);

  return (
    <div>
      <div className="p-4 my-2 rounded-md border-b leading-8">
        <div className="font-bold">Title</div>
        <div>Content</div>

        <div className="flex gap-4 mt-4 justify-end">
          <Link className="bg-slate-200 px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest" href={"/e"}>
            Edit
          </Link>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest">Delete</button>
        </div>
      </div>
    </div>
  );
}
