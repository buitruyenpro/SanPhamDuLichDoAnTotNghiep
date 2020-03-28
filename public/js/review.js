import axios from 'axios';
import { showAlert } from './alerts';
export const createReview = async data => {
  try {
    const url = '/api/v1/reviews';
    const res = await axios({
      method: 'POST',
      url,
      data
    });
    if (res.data.status === 'success') {
      showAlert('success', `Cám ơn bạn đã để lại đánh giá!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
