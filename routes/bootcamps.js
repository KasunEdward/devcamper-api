const express = require("express");
const {protect} = require('../middleware/auth');


const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  bootcampUploadPhoto,

} = require("../controllers/bootcamps");
const router = express.Router({mergeParams: true});

router.route("/").get(protect, getBootcamps).post(protect, createBootcamp);

router.route("/:id/photo").put(protect, bootcampUploadPhoto);

router
  .route("/:id")
  .get(protect, getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp);
router.get("/", (req, res) => {});

module.exports = router;
