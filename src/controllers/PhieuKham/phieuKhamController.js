const PhieuKham = require("../../model/PhieuKham");
const TiepDon = require("../../model/TiepDon");

exports.createPhieuKham = async (req, res) => {
  try {
    const phieuKham = new PhieuKham({
      tiepDon: req.body.tiepDon, // ID của tiếp đón

      mach: req.body.mach,
      nhietDo: req.body.nhietDo,
      huyetAp: req.body.huyetAp,
      nhipTho: req.body.nhipTho,
      canNang: req.body.canNang,
      chieuCao: req.body.chieuCao,
      bmi: req.body.bmi,

      tienSuBenh: req.body.tienSuBenh,

      khamToanThan: req.body.khamToanThan,
      khamBoPhan: req.body.khamBoPhan,
      luuY: req.body.luuY,

      chanDoanSoBo: req.body.chanDoanSoBo,
      chanDoanChinh: req.body.chanDoanChinh,
      chanDoanKemTheo: req.body.chanDoanKemTheo,
      moTaChiTiet: req.body.moTaChiTiet,

      ketLuan: req.body.ketLuan,
      chiDinh: req.body.chiDinh,
    });

    const savedPhieuKham = await phieuKham.save();

    res.status(201).json({
      message: "Tạo phiếu khám thành công",
      data: savedPhieuKham,
    });
  } catch (error) {
    console.error("Lỗi tạo phiếu khám:", error);
    res.status(500).json({
      message: "Lỗi server khi tạo phiếu khám",
      error: error.message,
    });
  }
};

// Lấy danh sách phiếu khám
exports.getAllPhieuKham = async (req, res) => {
  try {
    // Lấy page và limit từ query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Đếm tổng số bản ghi
    const totalRecords = await PhieuKham.countDocuments();

    // Lấy danh sách
    const list = await PhieuKham.find()
      .populate({
        path: "tiepDon",
        populate: [
          { path: "dichVu" },
          { path: "bacSi" }
        ]
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      data: list,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalRecords / limit),
        totalRecords
      }
    });
  } catch (error) {
    console.error("Lỗi getAllPhieuKham:", error);
    res.status(500).json({
      message: "Lỗi server khi lấy danh sách",
      error: error.message,
    });
  }
};


// Cập nhật phiếu khám
exports.updatePhieuKham = async (req, res) => {
  try {
    const id = req.params.id;

    // 1. Cập nhật phiếu khám
    const updated = await PhieuKham.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Không tìm thấy phiếu khám" });
    }

    // 2. Cập nhật trạng thái tiếp đón nếu cần
    if (updated.trangThai) {
      let trangThaiTiepDon;
      if (updated.trangThai === "Đã Hoàn Thành") {
        trangThaiTiepDon = "Đã Khám";
      } else {
        trangThaiTiepDon = "Chờ Khám";
      }

      await TiepDon.findByIdAndUpdate(updated.tiepDon, {
        trangThai: trangThaiTiepDon,
      });
    }

    res.json({
      message: "Cập nhật thành công",
      data: updated,
    });
  } catch (error) {
    console.error("Lỗi updatePhieuKham:", error);
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};


// Xóa phiếu khám
exports.deletePhieuKham = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await PhieuKham.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy phiếu khám" });
    }
    res.json({ message: "Xóa thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

exports.getPhieuKhamById = async (req, res) => {
  try {
    const id = req.params.id;
    const phieu = await PhieuKham.findById(id).populate({
      path: "tiepDon",
      populate: [{ path: "dichVu" }, { path: "bacSi" }],
    });
    if (!phieu) {
      return res.status(404).json({ message: "Không tìm thấy phiếu khám" });
    }
    res.json({ data: phieu });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

exports.getPhieuKhamByTiepDon = async (req, res) => {
  try {
    const tiepDonId = req.params.tiepDonId;
    const list = await PhieuKham.find({ tiepDon: tiepDonId })
    .populate({
      path: "tiepDon",
      populate: [{ path: "dichVu" }, { path: "bacSi" }],
    })
    .sort({ createdAt: 1 });
    res.json({ data: list });
  } catch (error) {
    console.error("Lỗi getPhieuKhamByTiepDon:", error);
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};


exports.uploadFilePhieuKham = async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.file) {
      return res.status(400).json({ message: "Không có file" });
    }
    const updated = await PhieuKham.findByIdAndUpdate(
      id,
      { fileKetQua: req.file.filename },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Không tìm thấy phiếu khám" });
    }
    res.json({ message: "Tải file thành công", data: updated });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

