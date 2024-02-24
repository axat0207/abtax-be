import { Cart } from "../models/add-to-cart.js";
import { User } from "../models/user.model.js";
const addToCart = async (req, res) => {
  const { formType, price } = req.body;

  try {
    if (!formType) {
      res.status(400).json({ message: "Please Provide Form type" });
    }
    if (!price) {
      res.status(400).json({ message: "Please Provide Price" });
    }
     
    const userId= req.user;

    const setCart = await Cart.create({
      userId: userId.id,
      formType,
      price,
    });

    return res.status(201).json(setCart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const viewCart = async (req, res) => {
  try {
    // Assuming the user's ID is stored in req.user.id after JWT verification
    const userId = req.user.id;
console.log(userId);
    // Find all cart items associated with the user
    const cartItems = await Cart.find({ userId });
console.log(cartItems+" knkn")
    return res.status(200).json(cartItems);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { addToCart, viewCart };
