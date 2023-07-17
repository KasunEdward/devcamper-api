const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  bootcampUploadPhoto,

} = require("../controllers/bootcamps");
const router = express.Router();

router.route("/").get(getBootcamps).post(createBootcamp);

router.route("/:id/photo").put(bootcampUploadPhoto);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);
router.get("/", (req, res) => {});

module.exports = router;
