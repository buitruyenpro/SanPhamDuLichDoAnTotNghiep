const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: { type: String, require: [true, 'Tên là bắt buộc!'], unique: true },
  rating: { type: Number, default: 4.5 },
  price: { type: Number, require: [true, 'Giá tiền là bắt buộc!'] }
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
