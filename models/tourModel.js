const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Tên là bắt buộc!'], unique: true, trim: true },
    slug: { type: String },
    ratingsAverage: { type: Number, default: 4.5 },
    ratingsQuantity: { type: Number, default: 0 },
    duration: { type: Number, required: [true, 'Thời gian là bắt buộc!'] },
    price: { type: Number, required: [true, 'Giá tiền là bắt buộc!'] },
    maxGroupSize: { type: Number, required: [true, 'Số người là bắt buộc'] },
    difficulty: { type: String, required: [true, 'Độ khó là bắt buộc!'] },
    priceDiscount: { type: Number },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
      trim: true
    },
    images: { type: [String] },
    createAt: { type: Date, default: Date.now(), select: false },
    startDates: { type: [Date] },
    secretTour: { type: Boolean, default: false }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  // Cái này xuất hiện đầu tiên
  next();
});
// tourSchema.post('save', function(doc, next) {
//   console.log(doc);

//   next();
// });
// tourSchema.pre('save', function(next) {
//   console.log('Will save document...');
//   next();
// });

// QUERY MIDDLEWARE
// tourSchema.pre('find', function(next) {
// tourSchema.pre(/^find/, function(next) {
//   this.find({ secretTour: { $ne: true } });
//   this.start = Date.now();
//   next();
// });

// tourSchema.post(/^find/, function(docs, next) {
//   console.log(`Query took ${Date.now() - this.start} milliseconds!`);
//   next();
// });

// AGGREGATION MIDDLEWARE
// tourSchema.pre('aggregate', function(next) {
//   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

//   console.log(this.pipeline());
//   next();
// });

tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
