const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Bootcamp = require("../models/Bootcamp");

// @desc  Get all bootcamps
// @route  GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query = req.query;

  let currentPage = query.currentPage;
  let currentSize = query.currentSize;

  let housing = query.housing;

  let filterObj = {
    housing: housing,
  };

  // query = JSON.parse(queryStr);
  console.log(query);

  const bootcamps = await Bootcamp.find(filterObj)
    .sort({ _id: 1 })
    .skip(0)
    .limit(10);

  const totalCount = await Bootcamp.countDocuments(filterObj);

  res
    .status(200)
    .json({
      success: true,
      total: totalCount,
      currentPage: currentPage,
      currentSize: currentSize, 
      data: bootcamps,
    });
});

// @desc  Get single bootcamp
// @route  GET /api/v1/bootcamps/:id
// @access Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc   Create bootcamp
// @route  POST /api/v1/bootcamps
// @access Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({ success: true, data: bootcamp });
});

// @desc   Update bootcamp
// @route  PUT /api/v1/bootcamps/:id
// @access Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 400)
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc   Delete bootcamp
// @route  DELETE /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 400)
    );
  }
  res.status(200).json({ success: true, data: {} });
});

// @desc   Upload photo
// @route  PUT /api/v1/bootcamps/:id/photo 
// @access Private
exports.bootcampUploadPhoto = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 400)
    );
  }
  if(!req.files){
    return next(
      new ErrorResponse(`Please upload a file`, 400)
    );
  }
  res.status(200).json({ success: true, data: {} });
});
