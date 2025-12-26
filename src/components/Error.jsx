import { AlertTriangle, RefreshCw, Home, SearchX, ServerCrash } from "lucide-react";

const presets = {
  404: {
    title: "Page not found",
    message: "The page you’re looking for doesn’t exist or was moved.",
    Icon: SearchX,
    badge: "404",
  },
  500: {
    title: "Server error",
    message: "Our servers had an issue. Please try again in a moment.",
    Icon: ServerCrash,
    badge: "500",
  },
  default: {
    title: "Something went wrong",
    message: "An unexpected error occurred. Please try again.",
    Icon: AlertTriangle,
    badge: "Error",
  },
};

export function ErrorState({
  status,
  title,
  message,
  details,
  onRetry,
  onHome,
  retryLabel = "Try again",
  homeLabel = "Go home",
  compact = false,
}) {
  const preset = presets[status] ?? presets.default;
  const Icon = preset.Icon;

  const finalTitle = title ?? preset.title;
  const finalMessage = message ?? preset.message;

  return (
    <div
      className={[
        "w-full rounded-2xl border",
        "bg-light-surface dark:bg-dark-surface",
        "border-light-border dark:border-dark-border",
        compact ? "p-4" : "p-6 sm:p-10",
      ].join(" ")}
    >
      <div className="flex items-start gap-4">
        <div
          className={[
            "shrink-0 rounded-xl p-3 border",
            "bg-white/60 dark:bg-black/20",
            "border-light-border dark:border-dark-border",
          ].join(" ")}
        >
          <Icon className="h-6 w-6 text-light-accent dark:text-dark-accent" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-lg sm:text-xl font-semibold text-light-text dark:text-dark-text">
              {finalTitle}
            </h2>
            <span
              className={[
                "text-xs font-semibold px-2 py-1 rounded-full border",
                "text-light-muted dark:text-dark-muted",
                "border-light-border dark:border-dark-border",
              ].join(" ")}
            >
              {preset.badge}
            </span>
          </div>

          <p className="mt-2 text-sm sm:text-base text-light-muted dark:text-dark-muted">
            {finalMessage}
          </p>

          {details ? (
            <div
              className={[
                "mt-4 rounded-xl border p-3 text-xs sm:text-sm overflow-auto",
                "bg-white/60 dark:bg-black/20",
                "border-light-border dark:border-dark-border",
                "text-light-text dark:text-dark-text",
              ].join(" ")}
            >
              {details}
            </div>
          ) : null}

          {(onRetry || onHome) && (
            <div className="mt-5 flex flex-wrap gap-3">
              {onRetry ? (
                <button
                  onClick={onRetry}
                  className={[
                    "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium",
                    "bg-light-primary dark:bg-dark-primary",
                    "text-black",
                    "hover:opacity-90 transition-opacity",
                  ].join(" ")}
                >
                  <RefreshCw className="h-4 w-4" />
                  {retryLabel}
                </button>
              ) : null}

              {onHome ? (
                <button
                  onClick={onHome}
                  className={[
                    "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium",
                    "border",
                    "border-light-border dark:border-dark-border",
                    "text-light-text dark:text-dark-text",
                    "hover:bg-light-border dark:hover:bg-dark-border transition-colors",
                  ].join(" ")}
                >
                  <Home className="h-4 w-4" />
                  {homeLabel}
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}