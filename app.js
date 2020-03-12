const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'hello from the server side', app: 'Natours' });
// });
// app.post('/', (req, res) => {
//   res.send('You can post this endpoint...');
// });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    results: tours.length,
    status: 'success',
    data: {
      tours
    }
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const tour = tours.find(el => el.id === id);
  // if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
});

app.post('/api/v1/tours', (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      message: 'success',
      data: {
        tour: newTour
      }
    });
  });
});
const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
