import S3 from 'aws-sdk/clients/s3';
import { v4 as uuidv4 } from 'uuid';
import { catchAsync } from '../utils';
import { AWS_KEY_ID, AWS_SECRET_ACCESS_KEY } from '../config/contants';
import { respondWithSuccess } from '../helpers/reponseHandler';
import Models from '../models/index';

const { Product } = Models;

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
  return respondWithSuccess(res, 200, 'presigned url generated successfully', { url, key });
});

export const addProduct = catchAsync(async(req, res, next) => {
  const { id } = req.auth;
  const product = await Product.create({
    userId: id,
    ...req.body
  });
  const { dataValues } = product;
  return respondWithSuccess(res, 201, 'Product created successfully', dataValues);
})