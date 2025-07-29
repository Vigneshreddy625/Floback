import React, { createContext, useState, useContext, useEffect } from "react";
import { addUser, clearUser } from "../redux/Auth/authSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import LoadingScreen from "../components/Items/LoadingScreen";

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
axios.defaults.baseURL = API_URL;


axios.defaults.withCredentials = true;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/v1/users/current-user`, {withCredentials: true}
        );
        if (response.data.data) {
          setUser(response.data.data);
          dispatch(addUser(response.data.data));
        }
      } catch (err) {
        if (err.response?.status === 401) {
          setUser(null);
          dispatch(clearUser());
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const { fullName, email, password } = userData;

      if (!fullName || !email || !password) {
        throw new Error("All fields are required");
      }

      const response = await axios.post(
        `/api/v1/users/register`,
        userData,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Registration failed"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);

      const { email, password } = credentials;

      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      const response = await axios.post(
        `/api/v1/users/login`,
        credentials,
        {
          withCredentials: true,
        }
      );

      const { user: userData } = response.data.data;
      setUser(userData);
      dispatch(addUser(userData));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);

      await axios.post(
        `/api/v1/users/logout`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      setUser(null);
      dispatch(clearUser());
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await axios.post(
        `/api/v1/users/refresh-token`,
        {},
        { withCredentials: true }
      );

      const accessToken = response.data.accessToken;

      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      return accessToken;
    } catch (err) {
      setUser(null);
      dispatch(clearUser());
      throw err;
    }
  };

const deleteUser = async (userId) => {
  try {
    setLoading(true);
    setError(null);

    await axios.post(
      `/api/v1/users/delete-user/${userId}`, 
      {}, 
      {
        withCredentials: true,
      }
    );
    

    setUser(null);
    dispatch(clearUser());
    return true;
  } catch (error) {
    console.error("Delete request failed:", error);
    setError(error.response?.data?.message || error.message || "Delete failed");
    throw error;
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !originalRequest.url?.includes("refresh-token")
        ) {
          originalRequest._retry = true;

          try {
            await refreshToken();
            return axios(originalRequest);
          } catch (err) {
            setUser(null);
            dispatch(clearUser());
            return Promise.reject(err);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    refreshToken,
    deleteUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const { user, loading, isAuthenticated } = useAuth();

    if (loading) {
      return <LoadingScreen/>;
    }

    if (!isAuthenticated) {
      return <div>Please login to access this page</div>;
    }

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export const withAdminAuth = (Component) => {
  const AdminComponent = (props) => {
    const { user, loading, isAuthenticated } = useAuth();

    if (loading) {
      return <div>Loading in progress...</div>;
    }

    if (!isAuthenticated) {
      return <div>Please login to access this page</div>;
    }

    if (user.role !== "admin") {
      return <div>Access denied. Admin privileges required.</div>;
    }

    return <Component {...props} />;
  };

  return AdminComponent;
};