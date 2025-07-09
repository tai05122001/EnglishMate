import { useState, useEffect } from "react";

export function useApi<T>(
  promiseFactory: () => Promise<{ data: T }>,
  deps: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);
    setData(null);
    promiseFactory()
      .then((res) => {
        if (!ignore) setData(res.data);
      })
      .catch(() => {
        if (!ignore) setError("API error");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, deps);

  return { data, loading, error };
}
