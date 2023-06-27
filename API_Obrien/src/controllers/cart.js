import Product from "../models/product.js";
import User from "../models/user.js";
import Cart from "../models/cart.js";
import Bill from "../models/bill.js";
// GET All CART
export const getCarts = async (req, res) => {
  try {
    const carts = await Cart.find({});

    // Nếu không tìm thấy giỏ hàng, trả về lỗi
    if (carts.length === 0) {
      return res.status(400).json({ message: "Carts not found!" });
    }

    res.status(200).json({
      message: "Get cart successfully!",
      carts,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET ONE CART
export const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    // Tìm kiếm giỏ hàng của người dùng
    let cart = await Cart.findOne({ userId }).populate("products.productId");

    // Nếu không tìm thấy giỏ hàng, trả về lỗi
    if (!cart) {
      return res.status(400).json({ message: "Cart not found!" });
    }

    res.status(200).json({
      message: "Get cart successfully!",
      cart,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ADD TO CART
export const addToCart = async (req, res) => {
  const { userId, productId, quantity = 1 } = req.body;
  try {
    // Kiểm tra xem user đang thực hiện chức năng đã có giỏ hàng chưa
    let cart = await Cart.findOne({ userId: userId });
    // Nếu chưa có giỏ hàng thì tạo mới
    if (!cart) {
      cart = await Cart.create({
        userId: userId,
        products: [],
        shippingFee: 10,
        coupon: "OBR_CTP1808",
      });

      // Cập nhật id của Cart trong collection User
      await User.findByIdAndUpdate(userId, { cartId: cart._id });
    }
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    let productExists = cart.products.find(
      (product) => product.productId == productId
    );

    if (!productExists) {
      // Sản phẩm chưa tồn tại trong giỏ hàng, thêm mới
      const product = await Product.findById(productId);
      cart.products.push({
        productId: product._id,
        quantity: quantity,
        price: product.price,
      });
    } else {
      // Sản phẩm đã tồn tại trong giỏ hàng, chỉ cần cập nhật số lượng và giá
      productExists.quantity++;
      const getPriceProduct = await Product.findById(productId).select("price");
      productExists.price = getPriceProduct.price * productExists.quantity;
    }

    await cart.save();

    // Tính tổng giá của giỏ hàng
    handleTotalOrder(cart);

    res
      .status(200)
      .json({ message: "The product has been added to cart.", cart });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE CART
export const updateCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    // Kiểm tra xem user đang thực hiện chức năng đã có giỏ hàng chưa
    let cart = await Cart.findOne({ userId: userId });

    // Nếu không tìm thấy giỏ hàng, trả về lỗi
    if (!cart) {
      return res.status(400).json({ message: "Cart not found!" });
    }

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    let product = cart.products.find((product) =>
      product.productId.equals(productId)
    );

    // Nếu không tìm thấy sản phẩm trong giỏ hàng, trả về lỗi
    if (!product) {
      return res.status(400).json({ message: "Product not found in cart!" });
    }

    // Cập nhật số lượng sản phẩm
    product.quantity = quantity;

    // Cập nhật lại giá sản phẩm theo số lượng
    const getPriceProduct = await Product.findById(productId).select("price");
    product.price = getPriceProduct.price * quantity;

    await cart.save();

    // Tính tổng giá của giỏ hàng
    handleTotalOrder(cart);

    res.status(200).json({ message: "Cart updated successfully!" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE ONE PRODUCT IN CART
export const deleteProductCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Tìm kiếm giỏ hàng của người dùng
    let cart = await Cart.findOne({ userId: userId });

    // Nếu không tìm thấy giỏ hàng, trả về lỗi
    if (!cart) {
      return res.status(400).json({ message: "Cart not found!" });
    }

    // Tạo một mảng mới chỉ chứa những sản phẩm không trùng với sản phẩm cần xóa
    cart.products = cart.products.filter(
      (product) => product.productId != productId
    );

    await cart.save();

    // Tính tổng giá của giỏ hàng
    handleTotalOrder(cart);

    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE ALL PRODUCT IN CART
export const deleteAllProductCart = async (req, res) => {
  const { userId } = req.body;
  try {
    // Tìm kiếm giỏ hàng của người dùng
    const cart = await Cart.findOne({ userId: userId });
    // Nếu không tìm thấy giỏ hàng, trả về lỗi
    if (!cart) {
      return res.status(400).json({
        message: "Cart not found!",
      });
    }

    // Tìm thấy, xóa tất cả sản phẩm trong giỏ hàng
    cart.products = [];
    await cart.save();

    return res.status(200).json({
      message: "Delete all products in cart successfully!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// CHECKOUT
export const checkOut = async (req, res) => {
  const { userId, shippingAdress, paymentMethod, orderNotes } = req.body;
  let cartProductInfo = {};
  try {
    // Tìm kiếm giỏ hàng của người dùng
    const cart = await Cart.findOne({ userId: userId }).populate(
      "products.productId"
    );

    // Nếu không tìm thấy giỏ hàng, trả về lỗi
    if (!cart || cart.products.length === 0) {
      return res
        .status(400)
        .json({ message: "Cart not found or cart has no products!" });
    }

    // Lưu thông tin sản phẩm trong giỏ hàng vào biến cartInfo
    cartProductInfo = {
      products: [...cart.products],
    };

    // Lấy thông tin user
    const user = await User.findById(userId);

    // Tạo bill
    const bill = await Bill.create({
      userId: userId,
      cartId: cart._id,
      totalPrice: cart.totalPrice,
      shippingFee: cart.shippingFee,
      shippingAdress: user.address || shippingAdress,
      totalOrder: cart.totalOrder,
      paymentMethod: paymentMethod,
      orderNotes: orderNotes,
    });

    // Populate thông tin từ bảng User và Cart
    await bill.populate("userId");

    // Sau khi đã tạo bill, cập nhật trạng thái giỏ hàng và xóa giỏ hàng
    cart.totalPrice = 0;
    cart.totalOrder = 0;
    cart.products = [];
    await cart.save();

    //Sau khi tạo bill xong, thêm luôn id của bill đó vào mảng bills của User
    user.bills.push({
      billId: bill._id,
    });

    await user.save();

    return res
      .status(200)
      .json({ message: "Order placed successfully!", bill, cartProductInfo });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// hàm để tính tổng giá sản phẩm trong giỏ hàng
const handleTotalOrder = async (cart) => {
  try {
    // Tính tổng giá của giỏ hàng
    const total = cart.products.reduce((accumulator, product) => {
      return accumulator + product.price;
    }, 0);

    cart.totalPrice = total;
    cart.totalOrder = cart.totalPrice + cart.shippingFee;
    await cart.save();
    return cart;
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
