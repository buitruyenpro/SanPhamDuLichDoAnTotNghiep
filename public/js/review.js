import axios from 'axios';
import { showAlert } from './alerts';

const commentForm = document.querySelector('.form--comment');
export const createReview = async data => {
  try {
    const url = '/api/v1/reviews';
    const res = await axios({
      method: 'POST',
      url,
      data
    });
    if (res.data.status === 'success') {
      if (data.classify == 'tích cực') {
        showAlert('success', `Cám ơn bạn đã để lại lời đánh giá tích cực!`);
      } else {
        showAlert('error', `Cám ơn bạn đã để lại đánh giá, chúng tôi sẽ gắng cải thiện tốt hơn!`);
      }
      commentForm.style.display = 'none';
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
