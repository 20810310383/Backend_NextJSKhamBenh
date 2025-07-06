const express = require("express");
const { createPhieuKham, getAllPhieuKham, updatePhieuKham, deletePhieuKham, getPhieuKhamById, uploadFilePhieuKham } = require("../controllers/PhieuKham/phieuKhamController");
const { upload } = require("../controllers/Upload/upload");
const router = express.Router();

router.get("/get-phieu-kham", getAllPhieuKham);
router.get("/get-phieu-kham/:id", getPhieuKhamById);

router.post("/create-phieu-kham", createPhieuKham);
router.put("/update-phieu-kham/:id", updatePhieuKham);
router.delete("/delete-phieu-kham/:id", deletePhieuKham);

router.post(
  "/upload-file/:id",
  upload.single("file"),
  uploadFilePhieuKham
);


module.exports = router;
