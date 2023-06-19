import Category from "../models/category.js";
import Product from "../models/product.js";
import { categorySchema } from "../schemas/category.js";
// GET LIST CATEGORY
export const getCategories = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 5,
      order = "asc",
      sort = "createdAt",
    } = req.query;

    const options = {
      page: page,
      limit: limit,
      sort: {
        [sort]: order === "asc" ? 1 : -1,
      },
    };

    const categories = await Category.paginate({}, options);
    if (categories.length === 0 || categories.docs.length === 0) {
      return res.status(400).json({
        message: "There are no categories in the list!",
      });
    }
    return res.status(200).json({
      message: "Get the list of categories successfully!",
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// GET ONE CATEGORY
export const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById({ _id: id }).populate("products");
    if (!category) {
      return res.status(400).json({
        message: "There are no category in the list!",
      });
    }

    console.log(category);
    return res.status(200).json({
      message: "Get the category successfully!",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ADD CATEGORY
export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Validate các trường dữ liệu trước khi thêm mới danh mục
    const { error } = categorySchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errArr = error.details.map((e) => e.message);
      return res.status(400).json({
        "Validate error": errArr,
      });
    }

    // kiểm tra có tồn tại tên danh mục nào trong db giống với tên danh mục gửi lên ko
    // sử dụng biểu thức chính quy chuyển name về lower case để so sánh
    const nameExists = await Category.findOne({
      name: { $regex: new RegExp("^" + name + "$", "i") },
    });

    if (nameExists) {
      return res.status(400).json({
        message:
          "This category name already exists! Please choose another name.",
      });
    }

    const category = await Category.create(req.body);

    if (!category) {
      return res.status(400).json({
        message: "Added category failed!",
      });
    }

    return res.status(200).json({
      message: "Added category successfully!",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE CATEGORY
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate các trường dữ liệu trước khi thêm mới sản phẩm
    const { error } = categorySchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errArr = error.details.map((e) => e.message);
      return res.status(400).json({
        "Validate error": errArr,
      });
    }

    const categoryUpdated = await Category.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    if (!categoryUpdated) {
      return res.status(400).json({
        message: "Can't find the category to update!",
      });
    }
    return res.status(200).json({
      message: "Category update successfully!",
      category: categoryUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE CATEGORY
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // CHỨC NĂNG: XÓA DANH MỤC VÀ CHUYỂN CÁC SẢN PHẨM THUỘC DANH MỤC VỪA BỊ XÓA
    // SANG DANH MỤC "UNCATEGORIZED" (Chưa được phân loại)

    // Kiểm tra xem category có tồn tại hay không
    const category = await Category.findOne({ _id: id });
    if (!category) {
      return res.status(400).json({
        message: "Category does not exist!",
      });
    }

    // Tìm và chuyển các sản phẩm liên quan sang danh mục "uncategorized"
    const productsToUpdate = await Product.find({ categoryId: id });
    // Tìm xem đã có danh mục Uncategorized trong db chưa
    const uncategorizedCategory = await Category.findOne({
      name: "Uncategorized",
    });

    // cập nhật categoryId của các sản phẩm thuộc category đang chuẩn bị được xóa sang id của "Uncategorized"
    if (uncategorizedCategory) {
      await Product.updateMany(
        { categoryId: id },
        { categoryId: uncategorizedCategory._id }
      );

      // Cập nhật mảng products của danh mục "uncategorized"
      await Category.findByIdAndUpdate(
        { _id: uncategorizedCategory._id },
        {
          $push: {
            products: {
              $each: productsToUpdate.map((product) => product._id),
            },
          },
        }
      );
    } else {
      const newUncategorizedCategory = await Category.create({
        name: "Uncategorized",
      });
      await Product.updateMany(
        { categoryId: id },
        { categoryId: newUncategorizedCategory._id }
      );

      // Cập nhật mảng products của danh mục "uncategorized"
      await Category.findByIdAndUpdate(
        { _id: newUncategorizedCategory._id },
        {
          $push: {
            products: {
              $each: productsToUpdate.map((product) => product._id),
            },
          },
        }
      );
    }

    // XÓA DANH MỤC SẢN PHẨM
    await Category.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Category delete successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
