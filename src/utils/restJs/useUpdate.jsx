import { useCallback, useState } from 'react';
import axios from 'axios';

const useUpdate = (url) => {
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

  const updateData = useCallback(
    (request, config, additionalURLParams) => {
      setLoading(true);
      axios
        .put(
          additionalURLParams !== undefined
            ? updateURL(additionalURLParams)
            : url,
          request,
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

  const update = useCallback(
    (request, config = undefined, additionalURLParams = undefined) => {
      updateData(request, config, additionalURLParams);
    },
    [updateData]
  );

  const clearResponse = useCallback(() => {
    setResponse(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { response, loading, error, update, clearResponse, clearError };
};

export default useUpdate;
