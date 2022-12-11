import axios from 'axios';

const URL = 'https://www.openstreetmap.org/api/0.6/map';

const getOSM = async (data) => {
  const params = { bbox: `${data.left},${data.bottom},${data.right},${data.top}` };
  try {
    const res = await axios.get(URL, { params });
    return {
      error: null,
      data: res.data
    };
  } catch (err) {
    return {
      error: err,
      data: null
    };
  }
};

export { getOSM };
