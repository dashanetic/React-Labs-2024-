import { useState, useCallback, useEffect } from "react";

const useFetch = (url, options = {}, immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requestCount, setRequestCount] = useState(0);

  const generateRequestId = useCallback(() => {
    const timestamp = new Date().getTime();
    return `${url.replace(/[^a-zA-Z0-9]/g, "_")}_${timestamp}`;
  }, [url]);

  const logApiCall = useCallback(
    (requestId, payload, status, responseData) => {
      try {
        const logs = JSON.parse(localStorage.getItem("api_logs") || "[]");

        const logEntry = {
          id: requestId,
          timestamp: new Date().toISOString(),
          url,
          payload,
          status,
          responseData: responseData
            ? JSON.stringify(responseData).substring(0, 1000)
            : null,
        };

        logs.unshift(logEntry);
        const trimmedLogs = logs.slice(0, 50);
        localStorage.setItem("api_logs", JSON.stringify(trimmedLogs));

        console.log(`[useFetch] Logged API call to ${url}:`, logEntry);
      } catch (err) {
        console.error("[useFetch] Error logging to localStorage:", err);
      }
    },
    [url]
  );

  const fetchData = useCallback(
    async (customOptions = {}) => {
      const requestId = generateRequestId();
      const mergedOptions = { ...options, ...customOptions };
      let payload = null;

      if (mergedOptions.body) {
        try {
          payload =
            typeof mergedOptions.body === "string"
              ? JSON.parse(mergedOptions.body)
              : mergedOptions.body;
        } catch (e) {
          payload = { raw: mergedOptions.body };
        }
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, mergedOptions);
        const status = response.status;

        let responseData;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          responseData = await response.json();
        } else {
          responseData = await response.text();
        }

        logApiCall(requestId, payload, status, responseData);

        if (!response.ok) {
          throw new Error(`Request failed with status: ${status}`);
        }

        setData(responseData);
        setRequestCount((prev) => prev + 1);
        return responseData;
      } catch (err) {
        setError(err.message || "An error occurred during fetch");
        logApiCall(requestId, payload, "error", { message: err.message });
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [url, options, generateRequestId, logApiCall]
  );

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [immediate, fetchData]);

  return { data, loading, error, fetchData, requestCount };
};

export default useFetch;
