/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import { searchImages } from './searchImages';
import { createReview } from './review';
import { bookTour } from './stripe';
import { showAlert } from './alerts';
import axios from 'axios';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');

// COMMENT REVIEWS
const commentForm = document.querySelector('.form--comment');
//SEARCH
const searchForm = document.querySelector('.form__upload_search');

const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
// Tìm kiếm hình ảnh
if (searchForm) {
  setInterval(function() {
    if (document.getElementById('photo-search').files[0]) {
      const form = new FormData();
      form.append('photo', document.getElementById('photo-search').files[0]);
      searchImages(form);
    }
  }, 100);
}
if (logOutBtn) logOutBtn.addEventListener('click', logout);

// Cập nhật thông tin người dùng
if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    updateSettings(form, 'data');
  });

// Tạo đánh giá người dùng
if (commentForm)
  commentForm.addEventListener('submit', e => {
    e.preventDefault();
    const rating = document.querySelectorAll('.rated').length;
    const review = document.querySelector('.input--comment').value;
    const tour = document.querySelector('.form--hidden-comment').value;
    axios
      .post('http://localhost:5000/classify', {
        comment: review
      })
      .then(function(response) {
        const classify = response.data.message;
        createReview({ review, rating, tour, classify });
      })
      .catch(function(error) {
        console.log(error);
      });
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings({ passwordCurrent, password, passwordConfirm }, 'password');

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (bookBtn)
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 20);
