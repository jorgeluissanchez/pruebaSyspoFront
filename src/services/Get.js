import Axios from "./Axios";

export default async function GetItem(route) {
  const { data } = await Axios.get(route);
  return data.body;
}
