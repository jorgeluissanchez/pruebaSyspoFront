import axios from "axios";
const Axios = axios.create({
  baseURL: "http://localhost:5000/api",
});

const Reg = async (route, item) => {
  const info = await Axios.post(route, item);
  return info.data.body;
};

export default Reg;
