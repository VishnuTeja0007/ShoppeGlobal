import { useRouteError, isRouteErrorResponse, Link, useLocation } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  const location = useLocation();

  const status = isRouteErrorResponse(error) ? error.status : 500;
  const title = isRouteErrorResponse(error)
    ? error.statusText
    : "Unexpected Error";

  const message = isRouteErrorResponse(error)
    ? error.data || "The page you are looking for does not exist."
    : "Something went wrong. Please try again later.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-violet-100 px-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">

        {/* Error Code */}
        <h1 className="text-7xl font-extrabold text-indigo-600 mb-2">
          {status}
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          {title}
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-4">
          {message}
        </p>

        {/* Invalid URL */}
        {status === 404 && (
          <p className="text-sm text-gray-400 mb-6 break-all">
            URL: <span className="font-medium">{location.pathname}</span>
          </p>
        )}

        {/* Action */}
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Go back Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
