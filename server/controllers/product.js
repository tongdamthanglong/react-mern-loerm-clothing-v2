import slugify from "slugify";
import fs from "fs";
import Product from "../models/product.js";

export const create = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name.trim():
        res.json({ error: "Name is required." });
      case !description.trim():
        res.json({ error: "Description is required." });
      case !price.trim():
        res.json({ error: "Price is required." });
      case !category.trim():
        res.json({ error: "Category is required." });
      case !quantity.trim():
        res.json({ error: "Quantity is required." });
      case !shipping.trim():
        res.json({ error: "Shipping is required." });
      case photo && photo.size > 1000000:
        res.json({ error: "Image should be less than 1mb." });
    }

    //create product
    const product = await new Product({
      ...req.fields,
      slug: slugify(name),
    }).save();

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
};

export const list = async (req, res) => {
  try {
    const products = await Product.find({})
      .select("-photo")
      .populate("category")
      // limit list product per time
      .limit(12)
      .sort({ createAt: -1 });
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

export const read = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
};
