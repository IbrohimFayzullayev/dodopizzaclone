import axios from "axios";

const getData = async (query) => {
  const data = await axios.get(`http://13.40.130.53/api/v1/vkusi`, {
    params: { turi: `${query}` },
  });
  return data.data.data;
};

export default getData;
