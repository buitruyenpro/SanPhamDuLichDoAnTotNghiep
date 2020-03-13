const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is:${val}`);
  // eslint-disable-next-line radix
  const id = parseInt(val);
  if (id > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({ status: 'fail', message: 'Missing name or price' });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    results: tours.length,
    requestedAt: req.requestTime,
    status: 'success',
    data: {
      tours
    }
  });
};

exports.getTour = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const tour = tours.find(el => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const newTour = { id: newId, ...req.body };
  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), () => {
    res.status(201).json({
      message: 'success',
      data: {
        tour: newTour
      }
    });
  });
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
