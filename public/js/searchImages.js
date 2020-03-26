import axios from 'axios';
import { showAlert } from './alerts';
export const searchImages = async data => {
  try {
    const url = '/api/v1/tours/searchImages';
    const res = await axios({
      method: 'PATCH',
      url,
      data
    });
    if (res.data.status === 'success') {
      location.reload(true);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
