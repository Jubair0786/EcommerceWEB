import Products from "../Models/Product.js"; // Ensure default export
// Add product
export const addProduct = async (req, res) => {
  const { title, description, price, category, qty, imgSrc } = req.body;

  try {
    // Create the product in the database
    const product = await Products.create({
      title,
      description,
      price,
      category,
      qty,
      imgSrc
    });

    // Respond with the created product details
    res.json({
      message: "Product added successfully",
      success: true,
      product
    });

  } catch (error) {
    // Handle any errors
    res.status(500).json({
      message: error.message,
      success: false
    });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  
    // Fetch products from the database
    let products = await Products.find().sort({ createdAt: -1 });

    // Send the fetched products as a response
    res.json({ message: 'All Products', products })
}
//find product by id
export const getProductById = async (req, res) => {
  const  id  = req.params.id;
  let product = await Products.findById(id);
  if (!product) return res.json({ message: 'Invalid ID' });
  res.json({ message: 'Specific Products', product });
}
// Update product by id
export const updateProductById = async (req, res) => {
  const  id  = req.params.id;
  let product = await Products.findByIdAndUpdate(id, req.body, { new: true });
  if (!product) return res.json({ message: 'Invalid ID' });
  res.json({ message: ' Product has been updated', product });
}
// Delete product by id
export const deleteProductById = async (req, res) => {
  const  id  = req.params.id;
  let product = await Products.findByIdAndDelete(id);
  if (!product) return res.json({ message: 'Invalid ID' });
  res.json({ message: ' Product has been deleted', product });
}

  

