import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center p-6 text-center">
      <div className="space-y-4">
        <p className="text-sm font-semibold text-blue-600">404</p>
        <h1 className="text-3xl font-bold">Page not found</h1>
        <p className="text-slate-600">The page you requested does not exist.</p>
        <Link
          className="inline-flex rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          href="/"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
