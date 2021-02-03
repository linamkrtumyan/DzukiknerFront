import { toast } from "react-toastify";
import axios from "axios";

export default async function sendRequest(url) {
  const response = await axios(url);

  console.log(response.data.success);
  if (!response.data.success) {
    if (window.location.pathname !== "/login") {
      axios
        .get(`/user/logout`)
        .then((res) => {
          if (res.data.success) {
            toast.error(res.data);
            window.location.reload();
          } else {
            toast.error(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return response.data.success;
}
