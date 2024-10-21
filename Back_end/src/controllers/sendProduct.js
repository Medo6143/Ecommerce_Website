import mongoose from 'mongoose';
import Product from '../models/productmodel.js';
import { products } from '../data/product.js';

const seedProducts = async () => {
    try {
        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log('Data seeded successfully');
    } catch (error) {
        console.error('Error seeding data:', error);
    }
};

export default seedProducts;
