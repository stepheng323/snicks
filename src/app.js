import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { PORT } from './config/contants';
import apiRouter from './routes/index';
import { respondWithWarning } from './helpers/reponseHandler';

const app = express();

const whitelist = [
  'http://localhost:3000',
];
const corsOptions = {
  origin(origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`${origin} Not allowed by CORS`));
    }
  },
  credentials: true,
};

app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(morgan('dev'));

app.use(apiRouter);

app.use('*', (req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

if (process.env.NODE_ENV === 'development') {
  app.use((error, req, res, next) => {
    respondWithWarning(res, error.status || 500, error.message, error);
  });
} else {
  app.use((error, req, res, next) => {
    respondWithWarning(res, error.status || 500, error.message, {});
  });
}

const port = PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));

export default app;
