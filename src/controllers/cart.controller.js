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

export const deleteCartItem = catchAsync(async (req, res, next) => {
  const { id: userId } = req.auth;
  const { cartId } = req.params;
  const cartItem = await Cart.findByPk(cartId);
  if (!cartItem) return respondWithWarning(res, 404, 'no cart item found');
  const { dataValues } = cartItem;
  if (userId !== dataValues.userId) {
    return respondWithWarning(
      res,
      403,
      'you are not authorised to perform this action'
    );
  }
  await cartItem.destroy();
  return respondWithSuccess(res, 200, 'product removed from cart successfully');
});

export const updateCartItem = catchAsync(async (req, res, next) => {
  const { id: userId } = req.auth;
  const { cartId } = req.params;
  const { quantity } = req.body;
  const cartItem = await Cart.findByPk(cartId);
  if (!cartItem) return respondWithWarning(res, 404, 'no cart item found');
  const { dataValues } = cartItem;
  if (userId !== dataValues.userId) {
    return respondWithWarning(
      res,
      403,
      'you are not authorised to perform this action'
    );
  }
  cartItem.quantity = quantity;
  await cartItem.save();
  return respondWithSuccess(res, 200, 'cart updated successfully', cartItem);
});
