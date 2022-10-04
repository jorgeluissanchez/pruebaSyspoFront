import Axios from "./Axios";

export default async function deleteItem(route) {
  const { data } = await Axios.delete(route);
  return data.body;
}
