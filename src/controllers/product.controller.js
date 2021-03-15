import { catchAsync } from '../utils';
import Models from '../models/index';

const { Product } = Models;

export const addProduct = catchAsync(async(req, res, next) => {
  const { me } = req.body;
})