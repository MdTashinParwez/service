import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home, SearchX } from "lucide-react";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="w-full max-w-2xl text-center">

        {/* Icon */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <SearchX className="h-9 w-9 text-slate-600" strokeWidth={1.7} />
        </div>

        {/* 404 */}
        <p className="text-8xl font-bold tracking-tight text-slate-900 sm:text-9xl">
          404
        </p>

        {/* Heading */}
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Page not found
        </h1>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
          The page you're looking for doesn't exist, has been moved,
          or the URL may be incorrect.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

          <Link
            to="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 sm:w-auto"
          >
            <Home className="h-4 w-4" />
            Go to Homepage
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>

        </div>

        {/* Small footer text */}
        <p className="mt-10 text-xs text-slate-400">
          Error code: 404
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;