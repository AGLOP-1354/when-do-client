import ky from 'ky';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FetchRequest = {
  data?: object,
  url: string,
  method: string,
}

const USER_ID = 'userId';

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

  const kyFetchWithUserId = async ({ data = {}, url, method }: FetchRequest) => {
    const asyncStoragePersonId = await AsyncStorage.getItem(USER_ID);
    try {
      const response = await ky(
        `http://localhost:4500${url}`,
        {
          method,
          ...(
            Object.keys(data).length > 0
              ? {
                json: {
                  userId: asyncStoragePersonId,
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
    kyFetchWithUserId,
  };
};

export default useFetch;
