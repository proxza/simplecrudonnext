"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function EditPage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/posts/${params.id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch post.");
        }

        const data = await response.json();
        setFormData({ title: data.post.title, content: data.post.content });
      } catch (error) {
        setError("Failed to load post.");
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      setError("Please fill all the fields!");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/posts/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update post!");
      }

      router.push("/");
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold my-8">Edit Post:</h2>

      <form onSubmit={handleSubmit} className="flex gap-3 flex-col">
        <input type="text" name="title" placeholder="Title" className="py-1 px-4 border rounded-md" value={formData.title} onChange={handleInputChange} />
        <textarea name="content" rows={10} placeholder="Content" className="py-1 px-4 border rounded-md" value={formData.content} onChange={handleInputChange}></textarea>
        <button className="bg-black text-white mt-5 px-1 py-4 rounded-md cursor-pointer">{isLoading ? "Updating..." : "SAVE"}</button>
      </form>
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}
