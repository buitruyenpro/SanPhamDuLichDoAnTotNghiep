const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('./../controllers/authController');
const bookingController = require('./../controllers/bookingController');

const router = express.Router();

// ROUTE HANDLERS

router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewsController.getOverview
);
router.get(
  '/search-by-image',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewsController.getOverviewSearch
);
router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/blockchain/:tourId', authController.protect, viewsController.BuyByBlockchain);
router.get('/my-tours', authController.protect, viewsController.getMyTours);
router.post('/submit-user-data', authController.protect, viewsController.updateUserData);

module.exports = router;
