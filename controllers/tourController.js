const Tour = require('./../models/tourModel');

exports.getAllTours = (req, res) => {
  res.status(200).json({
    requestedAt: req.requestTime
    // status: 'success',
    // data: {
    //   tours
    // }
  });
};

exports.getTour = (req, res) => {
  const id = parseInt(req.params.id, 10);
  // const tour = tours.find(el => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {}
  });
};

exports.createTour = async (req, res) => {
  // const newTour = new Tour({});
  // newTour.save();
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      tour: newTour
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { tour: '<Updated tour here...>' }
  });
};
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
