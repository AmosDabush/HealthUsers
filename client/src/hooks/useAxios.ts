import { useState, useEffect, useRef } from "react";
import axios, {
  AxiosRequestConfig,
  AxiosError,
  CancelTokenSource,
} from "axios";


type UseAxiosParams<K> = {
  url: string;
  method?: "get" | "post" | "put" | "delete" | "patch";
  body?: K | null;
  config?: AxiosRequestConfig;
  dependencies?: any[];
};

type UseAxiosReturn<T> = {
  data: T;
  error: string | null;
  isLoading: boolean;
  refetch: () => void;
};

const useAxios = <T, K>({
  url,
  method = "get",
  body = null,
  config = {},
  dependencies = [],
}: UseAxiosParams<K>): UseAxiosReturn<T> => {
  const [data, setData] = useState<T>(undefined as T);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [trigger, setTrigger] = useState(0); 

  const cancelToken = useRef(axios.CancelToken.source());

  const fetchData = async (source: CancelTokenSource) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios({
        url,
        method,
        data: body,
        cancelToken: source.token,
        ...config,
      });
      setData(response.data);
    } catch (error) {
      if (!axios.isCancel(error)) {
        setError((error as AxiosError).message || "An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetch = async () => {
      await fetchData(source);
    };
    fetch();

    return () => source.cancel("Operation canceled by the user.");
  }, [url, method, body, trigger, ...dependencies]);

  const refetch = () => {
    cancelToken.current.cancel("Operation canceled due to new request.");
  };

  return { data, isLoading, error, refetch };
};

export default useAxios;