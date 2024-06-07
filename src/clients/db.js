import mongoose from 'mongoose';
import { env } from '../utils/env.js';

const user = env('MONGODB_USER');
const pwd = env('MONGODB_PASSWORD');
const url = env('MONGODB_URL');
const db = env('MONGODB_DB');

mongoose.connect(
  `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`
)
.then(() => {
  console.log('Mongo connection successfully established!');
})
.catch(err => {
  console.error('Failed to establish Mongo connection:', err);
});
