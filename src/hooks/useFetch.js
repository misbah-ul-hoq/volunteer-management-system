import { useEffect, useState } from "react";
import api from "../axios/fetch";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(`${endpoint}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [endpoint]);

  return { data, loading };
};

export default useFetch;
