const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
  carId: { type: String, required: true },
  userId: { type: String, required: true },
  // Other wishlist fields
});

const WishlistModel = mongoose.model('Wishlist', wishlistSchema);

module.exports = WishlistModel;