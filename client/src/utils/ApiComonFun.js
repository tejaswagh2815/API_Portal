import axios from "axios";

export const ApiComonFun = async (url, method, withCred, data) => {
  try {
    const result = await axios({
      method: method,
      url: url,
      withCredentials: withCred,
      data: data,
    });
    return result.data;
  } catch (error) {
    return error;
  }
};
