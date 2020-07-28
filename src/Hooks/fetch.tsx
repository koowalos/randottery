import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

export const useGetFetch = (
  url: string,
): {
  loading: boolean;
  done: boolean;
  error: undefined | any;
  response: undefined | any | AxiosResponse;
} => {
  const [response, setResponse]: any = useState({
    loading: false,
    done: false,
    error: undefined,
    response: undefined,
  });

  useEffect(() => {
    setResponse({
      loading: true,
      done: false,
      error: undefined,
      response: undefined,
    });

    axios
      .get(url)
      .then(res => {
        setResponse({
          loading: false,
          done: true,
          error: undefined,
          response: res,
        });
      })
      .catch(err => {
        setResponse({
          loading: false,
          done: false,
          error: err,
          response: undefined,
        });
      });
  }, [url]);

  return response;
};
