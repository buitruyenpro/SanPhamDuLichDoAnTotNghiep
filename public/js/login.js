/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password
      }
    });
    http: if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const loginWallet = async (email, password, tourId, idUser) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/loginWallet',
      data: {
        email,
        password,
        tourId,
        idUser
      }
    });
    http: if (res.data.status === 'success') {
      showAlert('success', 'Thanh toán thành công!');
      window.setTimeout(() => {
        location.assign('/my-tours');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', 'Thanh toán không thành công!');
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout'
    });
    if ((res.data.status = 'success')) location.reload(true);
  } catch (err) {
    // console.log(err.response);
    showAlert('error', 'Error logging out! Try again.');
  }
};
