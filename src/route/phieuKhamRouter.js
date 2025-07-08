const express = require("express");
const { createPhieuKham, getAllPhieuKham, updatePhieuKham, deletePhieuKham, getPhieuKhamById, uploadFilePhieuKham, getPhieuKhamByTiepDon } = require("../controllers/PhieuKham/phieuKhamController");
const { upload } = require("../controllers/Upload/upload");
const { setPriceAndGenerateQR, markAsPaid } = require("../controllers/PhieuKham/thanhToanThuNganController");
const router = express.Router();

router.get("/get-phieu-kham", getAllPhieuKham);
router.get("/get-phieu-kham-by-id/:id", getPhieuKhamById);
router.get("/by-tiepdon/:tiepDonId", getPhieuKhamByTiepDon);


router.post("/create-phieu-kham", createPhieuKham);
router.put("/update-phieu-kham/:id", updatePhieuKham);
router.delete("/delete-phieu-kham/:id", deletePhieuKham);

router.post(
  "/upload-file/:id",
  upload.single("file"),
  uploadFilePhieuKham
);

router.post("/set-price/:id", setPriceAndGenerateQR);
router.post("/mark-paid/:id", markAsPaid);



module.exports = router;
