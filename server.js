const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE_LOCAL;
mongoose
  .connect(DB, { useNewUrlParser: true, userCreateIndex: true, useFindAndModify: false })
  .then(() => {
    // console.log(con.connections);
    console.log('DB connection successful!');
  });
// console.log(process.env);
const tourSchema = new mongoose.Schema({
  name: { type: String, require: [true, 'Tên là bắt buộc!'], unique: true },
  rating: { type: Number, default: 4.5 },
  price: { type: Number, require: [true, 'Giá tiền là bắt buộc!'] }
});
const Tour = mongoose.model('Tour', tourSchema);
// START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
