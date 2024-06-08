import Order from '../../models/order';

const Create = async (req, res) => {
  const request = req.body;
  console.log(request)
  try {
    const { address, items } = req.body;

    let parsedItems;
    try {
      parsedItems = JSON.parse(items);
    } catch (parseError) {
      return res.status(400).json({ error: 'Invalid JSON format for items' });
    }

    const newOrder = new Order({
      user: req.user._id,
      address,
      items: parsedItems,
    });

    const validationError = newOrder.validateSync();
    if (validationError) {
      return res.status(400).json({ error: validationError.message });
    }

    await newOrder.save();

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
