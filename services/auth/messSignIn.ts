import axios from "axios";
import cheerio from "cheerio";
import { useState } from "react";
// import { API_BASE_URL } from "../../models/globals";

export const useFetchMessOrderId = () => {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  // const [messId, setMessId] = useState<number | null>(null);

  const fetchOrderId = async (email: string, password: string) => {
    const loginData = new FormData();
    loginData.append("useremail", email);
    loginData.append("userpassword", password);

    let order_id: string | null = null;
    let mess_name: string | null = null;
    let roll_no: string | null = null;
    let name: string | null = null;

    try {
      setLoading(true);
      const loginResponse = await axios({
        method: "POST",
        url: "http://mess.iitgn.ac.in/phpscripts/authenticate.php",
        data: loginData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (loginResponse.status === 200) {
        if (loginResponse.data === "Incorrect username password!") {
          setLoading(false);
          setIsError(true);
          setIsSuccess(false);
          setOrderId(null);
          setError("Could not validate credentials");

          return { order_id, mess_name, roll_no, name };
        } else if (
          loginResponse.data ===
          "Please fill both the username and password fields!"
        ) {
          setLoading(false);
          setIsError(true);
          setIsSuccess(false);
          setOrderId(null);
          setError("Username or password cannot be blank");

          return { order_id, mess_name, roll_no, name };
        } else {
          const indexPageResponse = await axios({
            method: "GET",
            url: "http://mess.iitgn.ac.in/index.php",
            withCredentials: true,
          });

          const indexPage = indexPageResponse.data;
          const $ = cheerio.load(indexPage);

          order_id = $("span.text-purple")[1].children[0]["data"];

          mess_name = $(
            "table#table-bordered tbody tr:nth-child(1) td:nth-child(4)"
          ).text();
          roll_no = $(
            ".row.m-t-40 .col-md-3.col-xl-3:nth-child(1) .counter"
          ).text();
          name = $(
            ".row.m-t-40 .col-md-3.col-xl-3:nth-child(2) .counter"
          ).text();

          // TODO scrape mess name and call API to store mess ID in local storage
          // const messResponse = await axios({
          //   method: "GET",
          //   url: `${API_BASE_URL}/mess`,
          // });

          setLoading(false);
          setIsError(false);
          setIsSuccess(true);
          setOrderId(order_id);
          setError(null);

          return { order_id, mess_name, roll_no, name };
        }
      } else {
        setLoading(false);
        setIsError(true);
        setIsSuccess(false);
        setOrderId(null);
        setError("Could not login to mess portal");

        return { order_id, mess_name, roll_no, name };
      }
    } catch (error) {
      setLoading(false);
      setIsError(true);
      setIsSuccess(false);
      setOrderId(null);
      setError(error.message);

      return { order_id, mess_name, roll_no, name };
    }
  };

  return {
    fetchOrderId,
    loading,
    isError,
    error,
    isSuccess,
  };
};

export const useResetMessPassword = () => {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const sendOtp = async (rollno: string, email: string): Promise<boolean> => {
    const data = new FormData();
    data.append("rollno", rollno);
    data.append("useremail", email);

    try {
      setLoading(true);

      const response = await axios({
        method: "POST",
        url: "http://mess.iitgn.ac.in/phpscripts/pass_recovery_script.php",
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        if (response.data === 200) {
          setLoading(false);
          setIsError(false);
          setError(null);
          return true;
        } else if (response.data === 404) {
          setLoading(false);
          setIsError(true);
          setError("User not found");
          return false;
        } else if (response.data === 503) {
          setLoading(false);
          setIsError(true);
          setError("Something went wrong");
          return false;
        } else {
          setLoading(false);
          setIsError(true);
          setError("Something went wrong");
          return false;
        }
      } else {
        setLoading(false);
        setIsError(true);
        setError("Could not send OTP");
        return false;
      }
    } catch (error) {
      setLoading(false);
      setIsError(true);
      setError(error.message);
    }
  };

  const resetPassword = async (otp: string, password: string) => {
    const data = new FormData();
    data.append("userotp", otp);
    data.append("userpassword", password);

    const response = await axios({
      method: "POST",
      url: "http://mess.iitgn.ac.in/phpscripts/set_new_password_script.php",
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    try {
      if (response.status === 200) {
        if (response.data === 200) {
          setLoading(false);
          setIsError(false);
          setError(null);
          return true;
        } else if (response.data === 405) {
          setLoading(false);
          setIsError(true);
          setError("OTP is invalid");
          return false;
        } else if (response.data === 105) {
          setLoading(false);
          setIsError(true);
          setError("Something went wrong");
          return false;
        } else {
          setLoading(false);
          setIsError(true);
          setError("Something went wrong");
          return false;
        }
      } else {
        setLoading(false);
        setIsError(true);
        setError("Could not reset password");
        return false;
      }
    } catch (error) {
      setLoading(false);
      setIsError(true);
      setError(error.message);
      return false;
    }
  };

  return {
    loading,
    isError,
    error,
    sendOtp,
    resetPassword,
    setLoading,
    setIsError,
    setError,
  };
};
