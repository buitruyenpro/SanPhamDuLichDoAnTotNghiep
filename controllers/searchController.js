const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const multer = require('multer');
const sharp = require('sharp');
const axios = require('axios');
const fs = require('fs');
const axiosFile = require('axios-file');

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
    .toFormat('jpeg')
    .jpeg({ quality: 100 })
    .toFile(`public/img/search/${req.file.filename}`);

  next();
});

exports.searchImages = catchAsync(async (req, res, next) => {
  fs.writeFileSync('public/img/obj/data.txt', '', 'utf-8');
  const data = {
    name: 'test',
    file: fs.createReadStream(`public/img/search/${req.file.filename}`)
  };
  try {
    await axiosFile({
      url: 'http://127.0.0.1:5000/upload',
      method: 'post',
      headers: {
        'cache-control': 'no-cache'
      },
      data: data
    }).then(data => {
      const images = [];
      imagesResponse = JSON.parse(data.data);
      for (let [key, value] of Object.entries(imagesResponse)) {
        images.push(value.replace('dataset/train/', ''));
      }
      fs.writeFileSync('public/img/obj/data.txt', images, 'utf-8');
    });
    res.status(200).json({
      status: 'success'
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail'
    });
  }
  next();
});
