const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Tên là bắt buộc!'], unique: true, trim: true },
  ratingsAverage: { type: Number, default: 4.5 },
  ratingsQuantity: { type: Number, default: 0 },
  duration: { type: Number, required: [true, 'Thời gian là bắt buộc!'] },
  price: { type: Number, required: [true, 'Giá tiền là bắt buộc!'] },
  maxGroupSize: { type: Number, required: [true, 'Số người là bắt buộc'] },
  difficulty: { type: String, required: [true, 'Độ khó là bắt buộc!'] },
  priceDiscount: { type: Number },
  summary: { type: String, trim: true, required: [true, 'Dữ liệu tóm tắt là bắt buộc!'] },
  descriptors: { type: String },
  imageCover: { type: String, required: [true, 'imageCover là bắt buộc!'] },
  images: { type: [String] },
  description: { type: String },
  createAt: { type: Date, default: Date.now() },
  startDates: { type: [Date] }
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
