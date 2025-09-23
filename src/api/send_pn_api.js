import apiInstance from "./axios";

export const send_pn_api = async (pn, qte) => {
  try {
    const res = await apiInstance.post(
      "/pn",
      { pn, qte },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return { resData: res.data, resError: null };
  } catch (error) {
    return { resData: null, resError: error };
  }
};
