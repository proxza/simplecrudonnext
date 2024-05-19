import { useEffect, useState } from "react";

export default function EditPage() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/p/`);
      } catch (error) {
        setError("Failed to load post.");
      }
    };
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold my-8">Edit Post:</h2>

      <form className="flex gap-3 flex-col">
        <input type="text" name="title" placeholder="Title" className="py-1 px-4 border rounded-md" />
        <textarea name="content" rows={10} placeholder="Content" className="py-1 px-4 border rounded-md"></textarea>
        <button className="bg-black text-white mt-5 px-1 py-4 rounded-md cursor-pointer">SAVE</button>
      </form>
    </div>
  );
}
