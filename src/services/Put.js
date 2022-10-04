import Axios from "./Axios";

const Put = async (route, newInfo) => {
  const { data } = await Axios.put(route, newInfo);
  return data.body;
};

export default Put;
