import e from "express";
import { myCache } from "../index.js";
import ErrorHandler, { errorMiddleware } from "../middlewares/error.js";
import Product from "../models/Product.js";
import { rm } from "fs";
import { invalidateCache } from "../utils/features.js";

export const newProduct = async (req, res, next) => {
  try {
    const { name, category, stock, price, discount, description } = req.body;
    const photo = req.file;
    console.log(name, category, stock, price, discount, description);
    if (!photo) return next(new ErrorHandler("No image provided", 400));
    if (!name || !category || !stock || !price || !description) {
      rm(photo.path, () => {
        console.log("deleted");
      });
      return next(new ErrorHandler("Enter All Fields", 400));
    }
    const product = await Product.create({
      name,
      description,
      category: category.toLowerCase(),
      stock,
      price,
      discount,
      photo: photo?.path,
    });
    await invalidateCache({product:true})
    return res.status(201).json({
      success: true,
      msg: "Product Added",
    });
  } catch (error) {
    next(error);
  }
};
export const bestDeals = async (req, res, next) => {
  try {
    let products;
    if (myCache.has("best-deals"))
      products = JSON.parse(myCache.get("best-deals"));

    else{
      products = await Product.find({}).sort({ discount: -1 }).limit(5);
      myCache.set("best-deals", JSON.stringify(products));
    }

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    next(error);
  }
};
export const babyBestDeals = async (req, res, next) => {
  try {
    let products;
    if (myCache.has("baby-deals"))
      products = JSON.parse(myCache.get("baby-deals"));

    else{
     products = await Product.find({ category: "baby food" })
      .sort({ discount: -1 })
      .limit(5);
      myCache.set("baby-deals",JSON.stringify(products))
    }

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    next(error);
  }
};
export const getAllProducts = async (req, res, next) => {
  try {
    let products;
    if(myCache.has("all-products"))
    products = JSON.parse(myCache.get("all-products"))
  else{
    products = await Product.find({});
    myCache.set("all-products",JSON.stringify(products))
  }

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    next(error);
  }
};
export const getCategories = async (req, res, next) => {
  try {
    let categories;
    if(myCache.has("categories"))
    categories = JSON.parse(myCache.get("categories"));
    else{
     categories = await Product.distinct("category");
     myCache.set("categories",JSON.stringify(categories));
    }

    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    let product;
    if(myCache.has(`product-${id}`)){
    product = JSON.parse(myCache.get(`product-${id}`));
    }
  else{
     const product = await Product.findById(id);
     if (!product) {
       return next(new ErrorHandler("Product Not Found", 404));
     }
     myCache.set(`product-${id}`,JSON.stringify(product))
  }
   
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  rm(product.photo, () => {
    console.log("Photo Deleted");
  });
  await product.deleteOne();
  await invalidateCache({ product: true });
  return res.status(200).json({
    success: true,
    msg: "Product Deleted Successfully",
  });
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, category, stock, price, discount, description } = req.body;
    const photo = req.file;
    const product = await Product.findById(id);
    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }
    if (photo) {
      rm(product.photo, () => {
        console.log("Photo Deleted");
      });
      product.photo = photo.path;
    }
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (category) product.category = category;
    if (discount) product.discount = discount;

    await product.save();
    await invalidateCache({ product: true });
    return res.status(200).json({
      success: true,
      msg: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

export const searchProduct = async (req, res, next) => {
  try {
    const { name } = req.query;
    
    const product = await Product.find({name:{
      $regex : name ,
      $options:"i" 
    }
  });
    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

export const categoryFilter = async (req, res, next) => {
  try {
    const { category } = req.query;

    const products = await Product.find({
      category: {
        $regex: category,
        $options: "i",
      },
    });
    if (!products) {
      return next(new ErrorHandler("Product Not Found", 404));
    }
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    next(error);
  }
};
