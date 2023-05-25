import { useCallback, useState } from 'react';
import axios from 'axios';

const useFind = (url) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateURL = useCallback(
    (additionalURLParams) => {
      let URL = url;
      additionalURLParams?.forEach((param) => {
        URL = URL.replace(`{${param.name}}`, param.value);
      });
      return URL;
    },
    [url]
  );

  const fetchData = useCallback(
    (config, additionalURLParams) => {
      setLoading(true);
      axios
        .get(
          additionalURLParams !== undefined
            ? updateURL(additionalURLParams)
            : url,
          config
        )
        .then((res) => {
          setResponse(res);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [url, updateURL]
  );

  const find = useCallback(
    (config = undefined, additionalURLParams = undefined) => {
      fetchData(config, additionalURLParams);
    },
    [fetchData]
  );

  const clearResponse = useCallback(() => {
    setResponse(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { response, loading, error, find, clearResponse, clearError };
};

export default useFind;
