
import Link from "next/link";
import BackgroundStyleFixed from "./_Components/backgroundStyle";

export default function Page() {
  return (
    <div>
      <BackgroundStyleFixed />
      <div className="relative top-4 flex flex-col items-center justify-center">
        <h1 className="font-bold text-5xl">Page Not Found</h1>
        <Link href="/" className="bg-black px-2 py-1 border-2 mt-2 hover:cursor-pointer rounded-md text-white">Home</Link>
      </div>
    </div>
  );
}
