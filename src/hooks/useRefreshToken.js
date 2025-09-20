import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const authValues = useAuth();

  const refresh = async () => {
    // const response = await axios.get("/auth/refresh", {
    //   withCredentials: true,
    // });
    console.log(authValues);
    const response = await axios.post(
      "/auth/refresh",
      JSON.stringify({
        ExpiredAccessToken: authValues.auth.accessToken,
        RefreshToken: authValues.auth.refreshToken,
      }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
