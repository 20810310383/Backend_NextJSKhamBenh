const mongoose = require("mongoose");

const PhieuKhamSchema = new mongoose.Schema(
  {
    tiepDon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TiepDon",
      required: true,
    },
    // Sinh hiệu
    mach: String,
    nhietDo: String,
    huyetAp: String,
    nhipTho: String,
    canNang: String,
    chieuCao: String,
    bmi: String,

    // Hỏi bệnh
    tienSuBenh: String,

    // Khám bệnh
    khamToanThan: String,
    khamBoPhan: String,
    luuY: String,

    // Chẩn đoán
    chanDoanSoBo: String,
    chanDoanChinh: String,
    chanDoanKemTheo: String,
    moTaChiTiet: String,

    // Kết luận
    ketLuan: String,

    // Chỉ định
    chiDinh: {
      type: String,
      enum: ["1", "2", "3"], // 1: Thủ thuật - phẫu thuật, 2: Điều trị dài hạn, 3: Không có chỉ định
    },

    trangThai: {
      type: String,
      enum: ["Chờ Thực Hiện", "Đã Hoàn Thành"],
      default: "Chờ Thực Hiện",
    },

    fileKetQua: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("PhieuKham", PhieuKhamSchema);
