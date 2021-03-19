import S3 from 'aws-sdk/clients/s3';
import { v4 as uuidv4 } from 'uuid';
import { catchAsync } from '../utils';
import { AWS_KEY_ID, AWS_SECRET_ACCESS_KEY } from '../config/contants';
import {
  respondWithSuccess,
  respondWithWarning,
} from '../helpers/reponseHandler';
import { addPaginatedInfo, paginate, paginatedResult } from '../utils/paginate';
import Models from '../models/index';

const { Product, Brand } = Models;

export const getPresignedUrl = catchAsync(async (req, res, next) => {
  const { id } = req.auth;
  const s3 = new S3({
    accessKeyId: AWS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    signatureVersion: 'v4',
    region: 'us-west-2',
  });

  const key = `${id}/${uuidv4()}.jpeg`;
  const params = {
    Bucket: 'snicks',
    Key: key,
    ContentType: 'image/jpeg',
  };
  const url = await s3.getSignedUrl('putObject', params);
  return respondWithSuccess(res, 200, 'presigned url generated successfully', {
    url,
    key,
  });
});

export const addProduct = catchAsync(async (req, res, next) => {
  const { id } = req.auth;
  const product = await Product.create({
    userId: id,
    ...req.body,
  });
  const { dataValues } = product;
  return respondWithSuccess(
    res,
    201,
    'Product created successfully',
    dataValues
  );
});

export const getAllProducts = catchAsync(async (req, res, next) => {
  const {
    limit, startIndex, page, endIndex
  } = paginate(req);
  const products = await Product.findAll({
    limit,
    offset: page,
    include: [
      {
        model: Brand,
        attributes: ['name'],
        as: 'brand'
      },
    ],
  });
  const paginatedInfo = await addPaginatedInfo({
    model: Product,
    limit,
    startIndex,
    endIndex,
    page,
  });
  if (!products.length) return respondWithWarning(res, 404, 'No products found');
  const packedResult = paginatedResult(paginatedInfo, products);
  return respondWithSuccess(
    res,
    200,
    'Products fetched successfully',
    packedResult
  );
});

export const getProduct = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findOne({
    where: { id: productId },
    include: [
      {
        model: Brand,
        attributes: ['name'],
        as: 'brand'
      }
    ],
  });
  if (!product) return respondWithWarning(res, 404, 'No product found');
  return respondWithSuccess(res, 200, 'Product fetched successfully', product);
});
