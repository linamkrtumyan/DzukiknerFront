import { toast } from "react-toastify";
import axios from "axios";

export default async function sendRequest(url) {

  const response = await axios(url);
  // const response = await fetch(url, { signal });


  console.log(response.data.success);
  // if (!response.data.success) {
  //   if (window.location.pathname !== "/login") {
  //       axios
  //       .get(`/user/logout`)
  //       .then((res) => {
  //         console.log(res.data.success);
  //         if (res.data.success) {
  //           toast.error(res.data);
  //           window.location.reload();
  //         } else {
  //           toast.error(res.data);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  //   toast.error("Չհաջողվեց մուտք գործել");
  // }
  return response.data.success;
}
 