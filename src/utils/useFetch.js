import { useEffect, useState } from "react";
import axios from "axios";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        if (!isMounted) return;
        // Support both list endpoints (products array) and single-item endpoints (object)
        const payload = response?.data?.products ?? response?.data ?? [];
        setData(payload);
      } catch (err) {
        if (!isMounted) return;
        setError(err);
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, [url]);

  return [data, loading, error];
}

export default useFetch;