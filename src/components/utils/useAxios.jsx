import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "https://609e2b4933eed80017957ebb.mockapi.io";

export const useAxios = (intialParams) => {
  const [params, setParams] = useState(intialParams);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  useEffect(() => {
    async function fetchData() {
      try {
        if (!params) {
          throw Error("no params");
        }
        const { data } = await axios(params, { cancelToken: source.token });
        setResponse(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      source.cancel("canceled");
    };
  }, [params]);

  return [{ response, error, loading }, setParams];
};
