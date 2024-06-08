import Order from '../../models/order';
import Boom from 'boom';
import OrderSchema from './validations';

const createOrder = async (req, res) => {
  try {
      const { address, items } = req.body;

      if (!address) {
          return res.status(400).json({ error: 'Address is required' });
      }

      const newOrder = new Order({
          user: req.user._id,  // Assuming user is authenticated and available in req.user
          address,
          items: JSON.parse(items),
      });

      await newOrder.save();

      res.status(201).json(newOrder);
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const List = async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate('user', '-password -__v').populate('items');

    res.json(orders);
  } catch (e) {
    next(e);
  }
};

const GetMyOrders = async (req, res, next) => {
  const { user_id } = req.payload;

  try {
    const orders = await Order.find({ user: user_id }).populate('items');

    res.json(orders);
  } catch (e) {
    next(e);
  }
};

export default {
  Create,
  List,
  GetMyOrders,
};
