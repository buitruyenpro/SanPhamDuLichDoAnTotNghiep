const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
mongoose
  .connect(DB + '', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {});
process.on('unhandledRejection', err => {
  server.close(() => {
    process.exit(1);
  });
});
