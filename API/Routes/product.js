import express from 'express';
import { addProduct, getProducts, getProductById, updateProductById, deleteProductById } from '../Controllers/product.js';

const router = express.Router();

// Add product route
router.post('/add', addProduct);
// Get all products
router.get('/all', getProducts);
// Get product by id
router.get('/:id', getProductById);
// Update product by id
router.put('/:id', updateProductById);
// Delete product by id
 router.delete('/:id', deleteProductById);


export default router;
