// Tạo một giỏ hàng mới cho một người dùng
const createCartForUser = async (userId) => {
  const cart = new Cart({
    user: userId,
    items: [],
    shippingFee: 10,
    discountCode: "",
  });
  await cart.save();
  return cart;
};

app.post("/cart/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await getCartByUserId(userId);

    if (!cart) {
      // Tạo giỏ hàng mới nếu chưa có
      cart = await createCartForUser(userId);
    }

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingProduct = await getCartProductByProductId(
      cart._id,
      productId
    );

    if (existingProduct) {
      // Nếu đã có, cập nhật số lượng sản phẩm
      await updateCartItemQuantity(existingProduct._id, quantity);
    } else {
      // Nếu chưa có, thêm sản phẩm mới vào giỏ hàng
      await addProductToCart(cart._id, productId, quantity);
    }

    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
