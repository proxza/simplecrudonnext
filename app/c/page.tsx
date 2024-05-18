"use client";

import { ChangeEvent, useState } from "react";

export default function CreatePage() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
  };

  return (
    <div>
      <h2 className="text-2xl font-bold my-8">Add Post</h2>

      <form onSubmit={handleSubmit} className="flex gap-3 flex-col">
        <input type="text" name="title" placeholder="Title" className="py-1 px-4 border rounded-md" value={formData.title} onChange={handleInputChange} />
        <textarea name="content" rows={10} placeholder="Content" className="py-1 px-4 border rounded-md" value={formData.content} onChange={handleInputChange}></textarea>
        <button className="bg-black text-white mt-5 px-1 py-4 rounded-md cursor-pointer" type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "ADD"}
        </button>
      </form>
      {error && <p className="font-red-600 mt-4">{error}</p>}
    </div>
  );
}
