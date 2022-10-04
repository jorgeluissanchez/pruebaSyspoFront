import Axios from "./Axios";

const Post = (route, item) => {
  const file = Axios.post(route, item);
  return file;
};

export default Post;
