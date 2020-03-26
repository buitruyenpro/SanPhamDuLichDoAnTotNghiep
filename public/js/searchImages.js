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
      console.log('2222222222222222222222222222222222');
      window.location.href = '/search-by-image';
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
