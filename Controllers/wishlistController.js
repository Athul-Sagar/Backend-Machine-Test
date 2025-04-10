import Product from "../Models/ProductModel.js";
import Wishlist from "../Models/WishlistModel.js";




export const addToWishlist = async (req, res) => {
    const { productId } = req.body;

    try {
        let wishlist = await Wishlist.findOne({ userId: req.user.userId });
        if (!wishlist) wishlist = new Wishlist({ userId: req.user.userId, products: [] });

        if (wishlist.products.length >= 15) return res.status(400).send('Wishlist full');
        if (wishlist.products.includes(productId)) return res.status(400).send('Product already in wishlist');

        wishlist.products.push(productId);
        await wishlist.save();
        res.send('Added to wishlist');
    } catch (error) {
        res.status(500).send('Server error');
    }
};

export const removeFromWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ userId: req.user.userId });
        if (!wishlist) return res.status(404).send('Wishlist not found');

        wishlist.products = wishlist.products.filter(id => id !== req.params.productId);
        await wishlist.save();
        res.send('Removed from wishlist');
    } catch (error) {
        res.status(500).send('Server error');
    }
};

export const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ userId: req.user.userId });
        if (!wishlist) return res.json({ products: [] });

        const products = await Product.find({ productId: { $in: wishlist.products } });
        res.json({ products });
    } catch (error) {
        res.status(500).send('Server error');
    }
};
