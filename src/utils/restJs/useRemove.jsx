import { useCallback, useState } from 'react';
import axios from 'axios';

const useRemove = (url) => {
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

  const deleteData = useCallback(
    (config, additionalURLParams) => {
      setLoading(true);
      axios
        .delete(
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

  const remove = useCallback(
    (config = undefined, additionalURLParams = undefined) => {
      deleteData(config, additionalURLParams);
    },
    [deleteData]
  );

  const clearResponse = useCallback(() => {
    setResponse(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { response, loading, error, remove, clearResponse, clearError };
};

export default useRemove;
