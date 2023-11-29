import axios from "axios";

const baseUrl = "http://localhost:3000";

export const VerifyUser = async () => {
  try {
    const result = await axios({
      method: "GET",
      url: `${baseUrl}/auth/verifyuser`,
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    return error;
  }
};

export const UserLogin = async (values) => {
  try {
    const result = await axios({
      method: "POST",
      url: `${baseUrl}/auth/login`,
      data: values,
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    return error;
  }
};

export const HandleLogout = async () => {
  try {
    const result = await axios({
      method: "GET",
      url: `${baseUrl}/auth/logout`,
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    return error;
  }
};
export const GetAllProject = async () => {
  try {
    const result = await axios({
      method: "GET",
      url: `${baseUrl}/api/allProject`,
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    return error;
  }
};

export const GetProjectById = async (data) => {
  try {
    const result = await axios({
      method: "GET",
      url: `${baseUrl}/api/project/${data}`,
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    return error;
  }
};
