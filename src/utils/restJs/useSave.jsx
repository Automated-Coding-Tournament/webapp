import { useCallback, useState } from 'react';
import axios from 'axios';

const useSave = (url) => {
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

  const saveData = useCallback(
    (request, config, additionalURLParams) => {
      setLoading(true);
      axios
        .post(
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

  const save = useCallback(
    (request, config = undefined, additionalURLParams = undefined) => {
      saveData(request, config, additionalURLParams);
    },
    [saveData]
  );

  const clearResponse = useCallback(() => {
    setResponse(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { response, loading, error, save, clearResponse, clearError };
};

export default useSave;
