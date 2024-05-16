import ky from 'ky';

type FetchRequest = {
  data?: object,
  url: string,
  method: string,
}

const useFetch = () => {
  const kyFetch = async ({ data = {}, url, method }: FetchRequest) => {
    try {
      const response = await ky(
        `http://localhost:4500${url}`,
        {
          method,
          ...(
            Object.keys(data).length > 0
              ? {
                json: {
                  ...data,
                },
            } : {}
          )
        },
      );

      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  // const kyFetchWithoutUerId = async ({ data = {}, url, method }: FetchRequest) => {
  //   try {
  //     const response = await ky(
  //       `http://localhost:4500${url}`,
  //       {
  //         method,
  //         ...(
  //           Object.keys(data).length > 0 ? { json: data } : {}
  //         )
  //       },
  //     );
  //
  //     return response.json();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return {
    kyFetch,
  };
};

export default useFetch;
