import axios from 'axios';
import { showAlert } from './alerts';
export const searchImages = async (data = null) => {
  try {
    const url = '/api/v1/tours/searchImages';
    const res = await axios({
      method: 'PATCH',
      url,
      data
    });
    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} search successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
