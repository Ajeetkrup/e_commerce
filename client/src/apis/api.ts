import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Adjust as needed

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (userData: RegisterData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const loginUser = async (userData: LoginData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`http://localhost:5000/api/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const uploadProfilePicture = async (body: {
  key: string;
  fileType: string;
}) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `http://localhost:5000/api/user/upload-profile-picture`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const uploadToAWSBucket = async (file: File, url: string) => {
  const response = await axios.put(url, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
  return response.data;
};
