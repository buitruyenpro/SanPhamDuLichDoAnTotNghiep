const express = require('express');
const fs = require('fs');
const app = express();
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
const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
