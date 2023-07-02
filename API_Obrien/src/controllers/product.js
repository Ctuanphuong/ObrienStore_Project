import Product from "../models/product.js";
import Category from "../models/category.js";
import { productSchema, productSchemaUpdate } from "../schemas/product.js";

// GET LIST PRODUCT
export const getProducts = async (req, res) => {
  const {
    page = 1,
    limit = 9,
    order = "asc",
    sort = "createdAt",
    keywords = "",
  } = req.query;

  // Tạo 1 object tên "options" bao gồm những lựa chọn phân trang
  // page: trang sản phẩm hiện tại, limit: tối đa số lượng sản phẩm trên 1 trang,
  // order: sắp xếp theo "asc" hoặc "desc" (chỉ có 2 kiểu này)
  // sort: tùy chọn trường để sort với cú pháp {[key]: value}, ở đây để sort trong ngoặc vuông
  // Vì muốn lấy value của sort để làm key và lấy order làm value và có 2 lựa chọn là "asc" hoặc "desc"

  const options = {
    page: page,
    limit: limit,
    sort: {
      [sort]: order === "asc" ? 1 : -1,
    },
  };

  try {
    const query = {};
    if (keywords) {
      query.$text = { $search: keywords };
    }

    const products = await Product.paginate(query, options);
    if (products.length === 0 || products.docs.length === 0) {
      return res.status(400).json({
        message: "Couldn't find any products in the list!",
      });
    }
    return res.status(200).json({
      message: "Get the list of products successfully!",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// GET ONE PRODUCT
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById({ _id: id }).populate("categoryId");
    if (!product) {
      return res.status(400).json({
        message: "There are no product in the list!",
      });
    }
    return res.status(200).json({
      message: "Get the product successfully!",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ADD PRODUCT
export const addProduct = async (req, res) => {
  try {
    let { name, description } = req.body;
    name = name.trim();
    description = description.trim();
    // Validate các trường dữ liệu trước khi thêm mới sản phẩm
    const { error } = productSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errArr = error.details.map((e) => e.message);
      return res.status(400).json({
        "Validate error": errArr,
      });
    }

    const nameExists = await Product.findOne({
      name: { $regex: new RegExp("^" + name + "$", "i") },
    });

    if (nameExists) {
      return res.status(400).json({
        message:
          "This product name already exists! Please choose another name.",
      });
    }

    const product = await Product.create(req.body);

    // sau khi thêm sản phẩm xong, push luôn _id của sản phẩm đó vào mảng "products" của danh mục tương ứng
    await Category.findByIdAndUpdate(product.categoryId, {
      $push: {
        products: product._id,
      },
    });

    if (!product) {
      return res.status(400).json({
        message: "Added product failed!",
      });
    }

    return res.status(200).json({
      message: "Added product successfully!",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let { categoryId, name, description } = req.body;
    name = name.trim();
    description = description.trim();

    // Validate các trường dữ liệu trước khi cập nhật mới sản phẩm
    const { error } = productSchemaUpdate.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errArr = error.details.map((e) => e.message);
      return res.status(400).json({
        "Validate error": errArr,
      });
    }

    // Kiểm tra xem sản phẩm có tồn tại không
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product does not exist!" });
    }

    // Kiểm tra xem danh mục mới có tồn tại không
    const newCategory = await Category.findById(categoryId);
    if (!newCategory) {
      return res.status(404).json({ error: "Category does not exist!" });
    }

    // Kiểm tra xem sản phẩm đã thuộc danh mục cũ hay chưa
    const oldCategory = await Category.findById(product.categoryId);

    // Nếu sản phẩm thuộc danh mục cũ, di chuyển id sản phẩm sang danh mục mới
    if (oldCategory) {
      // Xóa id sản phẩm khỏi danh mục cũ
      oldCategory.products.pull(id);
      await oldCategory.save();

      //Thêm id sản phẩm vào danh mục mới
      newCategory.products.push(id);
      await newCategory.save();
    }

    // Cập nhật sản phẩm
    const productUpdated = await Product.findByIdAndUpdate(
      id,
      {
        ...req.body,
        categoryId,
      },
      {
        new: true,
      }
    );

    if (!productUpdated) {
      return res.status(400).json({
        message: "Product update failed!",
      });
    }

    return res.status(200).json({
      message: "Product update successfully!",
      product: productUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Tìm sản phẩm cần xóa
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({
        message: "Can't find the product to delete!",
      });
    }

    // Tìm danh mục tương ứng với category của sản phẩm
    const category = await Category.findById(product.categoryId);
    if (!category) {
      return res.status(400).json({
        message: "Category does not exist!",
      });
    }

    // Xóa id sản phẩm khỏi mảng products của danh mục
    category.products.pull(id);
    await category.save();

    // Xóa sản phẩm
    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Product delete successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
