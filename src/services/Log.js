import Axios from "./Axios";
const route = "/usuario/login";

const Log = async (credentials) => {
  const info = await Axios.post(route, credentials);
  return info.data.body;
};

export default Log;
