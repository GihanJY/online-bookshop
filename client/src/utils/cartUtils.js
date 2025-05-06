// src/utils/cartUtils.js
import Cookies from "js-cookie";
import axios from "axios";

/**
 * Adds a book to the cart (guest or logged-in).
 */
export const handleAddToCart = async (isLoggedIn, bookId, title, quantity) => {
  if (!bookId || typeof quantity !== "number" || quantity <= 0) {
    console.error("Invalid input parameters:", { bookId, quantity });
    return;
  }

  if (!isLoggedIn) {
    try {
      const existingCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
      const index = existingCart.findIndex((item) => item.bookId === bookId);

      if (index >= 0) {
        existingCart[index].quantity += quantity;
      } else {
        existingCart.push({ bookId, title, quantity });
      }

      localStorage.setItem("guest_cart", JSON.stringify(existingCart));
    } catch (error) {
      console.error("Error updating guest cart:", error);
    }
  } else {
    try {
      // Call API to add to cart
      const response = await axios.post('/api/users/cart', {
        bookId,
        title,
        quantity
      });
      
      // Update cookie with new cart
      Cookies.set("cart", JSON.stringify(response.data.cart), { expires: 1 });
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  }
};

/**
 * Returns the total item count from the cart.
 */
export const getCartItemCount = (isLoggedIn) => {
  try {
    let cart = [];

    if (isLoggedIn) {
      const cookieCart = Cookies.get("cart");
      if (cookieCart) {
        cart = JSON.parse(cookieCart);
      }
    } else {
      const guestCart = localStorage.getItem("guest_cart");
      if (guestCart && guestCart !== "null") {
        cart = JSON.parse(guestCart);
      }
    }

    return cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  } catch (error) {
    console.error("Error reading cart:", error);
    return 0;
  }
};
