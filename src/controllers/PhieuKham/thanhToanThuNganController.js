const PhieuKham = require("../../model/PhieuKham");

exports.setPriceAndGenerateQR = async (req, res) => {
  try {
    const { id } = req.params;
    const { soTien } = req.body;

    if (!soTien || soTien <= 0) {
      return res.status(400).json({ message: "Số tiền không hợp lệ" });
    }

    const qrUrl = `https://momo.vn/pay/mock/${id}`; // Mock link QR
    const updated = await PhieuKham.findByIdAndUpdate(
      id,
      {
        "thanhToan.soTien": soTien,
        "thanhToan.trangThai": "Chờ thanh toán",
        "thanhToan.ngayXacNhan": new Date(),
        "thanhToan.qrUrl": qrUrl,
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Không tìm thấy phiếu khám" });

    res.json({ message: "Cập nhật giá thành công", data: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

exports.markAsPaid = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await PhieuKham.findByIdAndUpdate(
      id,
      {
        "thanhToan.trangThai": "Đã thanh toán",
        "thanhToan.ngayThanhToan": new Date(),
      },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Không tìm thấy phiếu khám" });
    res.json({ message: "Đã đánh dấu thanh toán", data: updated });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
