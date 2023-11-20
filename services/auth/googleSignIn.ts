import { useAuthRequest } from "expo-auth-session/providers/google";
import axios from "axios";
import { useEffect, useState } from "react";
import { androidClientId } from "../../models/constants";

export const useGoogleSignIn = () => {
  const [request, response, promptAsync] = useAuthRequest({
    androidClientId,
  });

  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const startGoogleSignIn = () => {
    setIsLoading(true);
    promptAsync();
  };

  useEffect(() => {
    getGoogleAuthTokenOnMount();
  }, [response]);

  const getGoogleAuthTokenOnMount = async () => {
    if (response?.type === "success") {
      await getUserInfo(response.authentication.accessToken);
    } else {
      setIsLoading(false);
      setIsSuccess(false);
      setUserInfo(null);

      if (response?.type === "error") {
        setIsError(true);
        setError(response.error.message);
      }
    }
  };

  const getUserInfo = async (token: string) => {
    if (!token) return;
    await axios({
      method: "GET",
      url: "https://www.googleapis.com/userinfo/v2/me",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setUserInfo(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setUserInfo(null);
        setIsLoading(false);
      });
  };

  return {
    // request,
    // response,
    startGoogleSignIn,
    // getGoogleAuthTokenOnMount,
    userInfo,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};
