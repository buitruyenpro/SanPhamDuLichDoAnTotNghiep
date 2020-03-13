const mongooes = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE_LOCAL;
mongooes
  .connect(DB, { useNewUrlParser: true, userCreateIndex: true, useFindAndModify: false })
  .then(() => {
    // console.log(con.connections);
    console.log('DB connection successful!');
  });
// console.log(process.env);

// START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
