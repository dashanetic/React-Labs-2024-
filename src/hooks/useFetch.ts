import { useState, useCallback, useEffect, useRef } from "react";

interface FetchOptions extends RequestInit {}

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: (customOptions?: Partial<FetchOptions>) => Promise<T | null>;
  requestCount: number;
}

const useFetch = <T>(
  url: string,
  options: FetchOptions = {},
  immediate: boolean = true
): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [requestCount, setRequestCount] = useState<number>(0);

  const prevUrlRef = useRef<string>(url);
  const optionsRef = useRef<FetchOptions>(options);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (JSON.stringify(options) !== JSON.stringify(optionsRef.current)) {
      optionsRef.current = options;
    }
  }, [options]);

  const fetchData = useCallback(
    async (customOptions: Partial<FetchOptions> = {}): Promise<T | null> => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      const mergedOptions = {
        ...optionsRef.current,
        ...customOptions,
        signal: abortControllerRef.current.signal,
      };

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, mergedOptions);

        let responseData: T;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          responseData = (await response.json()) as T;
        } else {
          responseData = (await response.text()) as unknown as T;
        }

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        setData(responseData);
        setRequestCount((prev) => prev + 1);
        return responseData;
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          return null;
        }

        const errorMessage =
          err instanceof Error ? err.message : "An error occurred during fetch";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  useEffect(() => {
    let isActive = true;

    if (immediate && (url !== prevUrlRef.current || requestCount === 0)) {
      fetchData().catch((err) => {
        if (err?.name !== "AbortError" && isActive) {
          console.error("Fetch error:", err);
        }
      });
      prevUrlRef.current = url;
    }

    return () => {
      isActive = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [immediate, url, fetchData, requestCount]);

  return { data, loading, error, fetchData, requestCount };
};

export default useFetch;
