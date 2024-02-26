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
    const deleteItems = await Cart.deleteMany({ userId  });
    console.log(deleteItems + " ye hai deleted wale")
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
    const cartItems = await Cart.find({ userId : userId });

    return res.status(200).json(cartItems);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const removeFromCart = async (req, res) => {
  try {
    // Assuming the user's ID is stored in req.user.id after JWT verification
    const userId = req.user.id;
    const itemId = req.params.itemId; // Assuming the item's ID is passed as a URL parameter
    // Find the cart item associated with the user and delete it
    const deletedItem = await Cart.deleteMany({ userId : userId });

    // If no item was found and deleted, send a 404 response
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Return a 200 status with a message indicating the item was successfully removed
    return res.status(200).json({ message: 'Item removed from cart', item: deletedItem });
  } catch (error) {
    // If an error occurs, return a 500 status with the error message
    return res.status(500).json({ message: error.message });
  }
};

export { addToCart, viewCart, removeFromCart };


// export { addToCart, viewCart };