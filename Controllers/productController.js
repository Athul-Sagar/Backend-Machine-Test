import Product from "../Models/ProductModel.js";

export const addProduct = async (req, res) => {
    const { name, description, price, category } = req.body;
    if (!name || name.length < 3 || !description || description.length < 10 || description.length > 50 || !price || !category || !req.file) {
        return res.status(400).send('Invalid input');
    }

    try {
        const count = await Product.countDocuments();
        const productId = `PROD${String(count + 1).padStart(3, '0')}`;
        const imagePath = `/public/${req.file.filename}`;

        const product = new Product({
            name,
            description,
            price,
            image: imagePath,
            category: category.toLowerCase(),
            productId,
            owner: req.user.userId
        });
        await product.save();
        res.send('Product added');
    } catch (error) {
        res.status(500).send('Server error',error);
        console.log("The error in the add products",error)
    }
};

export const updateProduct = async (req, res) => {
    const { name, description, price, category } = req.body;

    try {
        const product = await Product.findOne({ productId: req.params.id });
        if (!product) return res.status(404).send('Product not found');
        if (req.user.role !== 'admin' && product.owner !== req.user.userId) {
            return res.status(403).send('Not allowed');
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category ? category.toLowerCase() : product.category;
        if (req.file) product.image = `/public/${req.file.filename}`;

        await product.save();
        res.send('Product updated');
    } catch (error) {
        res.status(500).send('Server error');
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ productId: req.params.id });
        if (!product) return res.status(404).send('Product not found');

        if (req.user.role !== 'admin' && product.owner !== req.user.userId) {
            return res.status(403).send('Not allowed');
        }

        await Product.deleteOne({ productId: req.params.id });
        res.send('Product deleted');
    } catch (error) {
        res.status(500).send('Server error');
        console.log("The error in the deleteProduct", error);
    }
};

export const getAllProduct = async (req, res) => {
    const { page = 1, search, category, minPrice, maxPrice, sortBy } = req.query;
    const limit = 5;
    const skip = (page - 1) * limit;

    
    let query = {};
    if (search) query.name = new RegExp(search, 'i'); 
    if (category) query.category = category.toLowerCase(); 
    if (minPrice || maxPrice) query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice); 
    if (maxPrice) query.price.$lte = Number(maxPrice); 

    
    let sort = {};
    if (sortBy) {
        switch (sortBy) {
            case 'price_asc':
                sort.price = 1;
                break;
            case 'price_desc':
                sort.price = -1;
                break;
            case 'date_asc':
                sort.createdAt = 1; 
                break;
            case 'date_desc':
                sort.createdAt = -1;
                break;
            case 'name_asc':
                sort.name = 1;
                break;
            case 'name_desc':
                sort.name = -1;
                break;
            default:
                sort.createdAt = -1; 
        }
    } else {
        sort.createdAt = -1; 
    }

    try {
        const products = await Product.find(query)
            .select('name image price')
            .sort(sort)
            .skip(skip)
            .limit(limit);
        const total = await Product.countDocuments(query);
        res.json({ products, total, page: Number(page) });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

export const getProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ productId: req.params.id });
        if (!product) return res.status(404).send('Product not found');
        res.json(product);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

