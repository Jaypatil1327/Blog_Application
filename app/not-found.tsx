import Link from "next/link";

function NotFound() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-2">Page does not exist</p>
      <Link className="mt-4 text-blue-500" href="/">
        Return Home
      </Link>
    </div>
  );
}

export default NotFound;
