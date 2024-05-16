export default function CreatePage() {
  return (
    <div>
      <h2 className="text-2xl font-bold my-8">Add new post</h2>

      <form className="flex gap-3 flex-col">
        <input type="text" name="title" placeholder="Title" className="py-1 px-4 border rounded-md" />
        <textarea name="content" rows={10} placeholder="Content" className="py-1 px-4 border rounded-md"></textarea>
        <button className="bg-black text-white mt-5 px-1 py-4 rounded-md cursor-pointer">Add</button>
      </form>
    </div>
  );
}
