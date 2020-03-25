const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `image-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(32, 32)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/search/${req.file.filename}`);

  next();
});

exports.searchImages = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success'
  });
});
