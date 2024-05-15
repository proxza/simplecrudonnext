import Link from "next/link";

export default function Home() {
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
