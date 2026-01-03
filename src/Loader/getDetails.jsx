import axios from "axios";

export const getDetails = async ({ params }) => {
  const { id } = params;
  const data = await axios.get("https://dummyjson.com/products/" + id);
  console.log(data.data);
  return data.data;
};