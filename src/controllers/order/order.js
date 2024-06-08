import Order from '../../models/order';
// import Boom from 'boom';
// import OrderSchema from './validations';

const Create = async (req, res) => {
  try {
    const { address, items } = req.body;

    // Check if address is provided
    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }

    // Parse JSON from items
    let parsedItems;
    try {
      parsedItems = JSON.parse(items);
    } catch (parseError) {
      return res.status(400).json({ error: 'Invalid JSON format for items' });
    }

    // Ensure user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Create new order
    const newOrder = new Order({
      user: req.user._id,
      address,
      items: parsedItems,
    });

    // Validate order with Mongoose schema
    const validationError = newOrder.validateSync();
    if (validationError) {
      return res.status(400).json({ error: validationError.message });
    }

    // Save order to database
    await newOrder.save();

    // Return successful response
    res.status(201).json(newOrder);
  } catch (e) {
    console.error('Internal server error:', e);
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
