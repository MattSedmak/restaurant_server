import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bookingRoutes from './routes';

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

// let corsOptions = {
//   origin: ['http://localhost:3000'],
//   credentials: true,
//   methods: ['get', 'post', 'options', 'put', 'delete'],
// };

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

app.use(cors());
app.use(express.json());
app.use(bookingRoutes);

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.uyvmk.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set('useFindAndModify', false);

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
  )
  .catch((error) => {
    throw error;
  });
