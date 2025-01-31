import Bill from "../models/bill.js";

// GET ALL BILL
export const getBills = async (req, res) => {
  try {
    const bills = await Bill.find({})
      .populate("products.productId")
      .populate("userId");

    if (bills.length === 0) {
      return res.status(400).json({
        message: "There are no bill in the list!",
      });
    }

    return res.status(200).json({
      message: "Get bill list successfully!",
      bills,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL BILL
export const getUserBills = async (req, res) => {
  const { userId } = req.params;
  try {
    const bills = await Bill.find({ userId })
      .populate("products.productId")
      .populate("userId");
    if (bills.length === 0) {
      return res.status(400).json({
        message: "There are no bill in the list!",
      });
    }

    return res.status(200).json({
      message: "Get bill list successfully!",
      bills,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// GET ONE BILL
export const getBill = async (req, res) => {
  const { billId } = req.params;
  try {
    const bill = await Bill.findById(billId)
      .populate("products.productId")
      .populate("userId");

    if (!bill) {
      return res.status(400).json({
        message: "Bill not found!",
      });
    }

    return res.status(200).json({
      message: "Get bill successfully!",
      bill,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE STATUS BILL
export const updateBill = async (req, res) => {
  const { billId } = req.params;
  const { status, paymentStatus } = req.body;
  try {
    // Tìm kiếm bill cần cập nhật
    const bill = await Bill.findById(billId);

    if (!bill) {
      return res.status(400).json({
        message: "Bill not found!",
      });
    }

    if (status) {
      bill.status = status;
    }

    if (paymentStatus) {
      bill.paymentStatus = paymentStatus;
    }

    await bill.save();

    res.status(200).json({ message: "Bill updated successfully!", bill });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
