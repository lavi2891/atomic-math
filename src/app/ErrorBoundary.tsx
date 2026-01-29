import React from "react";
import { log } from "../shared/logger";

type Props = { children: React.ReactNode };

type State = { hasError: boolean; error?: unknown };

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: unknown): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown, info: unknown) {
    log.error("ui", "ErrorBoundary caught", error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div style={{ padding: 16 }}>
        <h2 style={{ margin: 0 }}>הייתה תקלה</h2>
        <p style={{ marginTop: 8 }}>נסה לרענן את הדף.</p>

        {import.meta.env.DEV ? (
          <pre style={{ whiteSpace: "pre-wrap", marginTop: 12 }}>
            {String(this.state.error)}
          </pre>
        ) : null}

        <button
          onClick={() => window.location.reload()}
          style={{ marginTop: 12 }}
        >
          רענן
        </button>
      </div>
    );
  }
}
