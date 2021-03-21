import { catchAsync } from '../utils';
import Models from '../models/index';
import {
  respondWithSuccess,
  respondWithWarning,
} from '../helpers/reponseHandler';

const { Cart, Product } = Models;

export const addProductToCart = catchAsync(async (req, res, next) => {
  const { id: userId } = req.auth;
  const { productId } = req.params;
  const product = await Product.findOne({ where: { id: productId } });
  if (!product) return respondWithWarning(res, 404, 'Product Id not found');

  const alreadyInCart = await Cart.findOne({ where: { userId, productId } });
  let cartItem;
  if (alreadyInCart) {
    cartItem = await alreadyInCart.increment('quantity');
  } else {
    cartItem = await Cart.create({
      userId,
      productId,
      quantity: 1,
    });
  }

  return respondWithSuccess(
    res,
    201,
    'Item added to cart succesfully',
    cartItem
  );
});

export const getCartItems = catchAsync(async (req, res, next) => {
  const { id: userId } = req.auth;
  const cartItems = await Cart.findAll({ where: { userId } });
  if (!cartItems.length) respondWithWarning(res, 404, 'No items in cart');
  return respondWithSuccess(
    res,
    200,
    'cart items fetched successfully',
    cartItems
  );
});
