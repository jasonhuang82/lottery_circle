import { useState, useCallback, useEffect } from "react";

const useGetPeople = ({ didMountQuery = true, limit = 10, offset = 0 } = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const getPeople = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch(`https://randomuser.me/api?results=${limit}&page=${offset}`)
        .then((res) => res.json())
        .then(res => res);
      const result = res?.results;
      if (!result) {
        throw "there is no result from api.";
      }
      setLoading(false);
      setData(result);
      return {
        error: null,
        data: result,
      };
    } catch (err) {
      setError(err);
      setLoading(false);
      throw {
        error,
        data: null,
      };
    }
  }, []);


  useEffect(() => {
    if (didMountQuery) {
      getPeople();
    }
  }, []);
  
  return {
    loading,
    error,
    data,
    refetchQuery: getPeople,
  };
};


export default useGetPeople;
