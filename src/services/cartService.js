import axiosClient from "./axiosClient";
import { API_URL } from "../config";
export const getCart = async () => {
  try {
    const response = await axiosClient.get("/orders/cart");
    //console.log("Cart API Response:", response);
    return response;
  } catch (error) {
    console.error("Get Cart Error:", error);
    throw error;
  }
};

export const getCart1 = async (token) => {
  const response = await fetch(`${API_URL}/orders/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const addToCart = async (dishId, quantity) => {
  try {
    console.log("Dish ID:", dishId, "Quantity:", quantity);
    const response = await axiosClient.post("/orders/cart", null, {
      params: { 
        dishId: dishId, 
        quantity: quantity 
      },
    });
    console.log("Add to Cart Response:", response);
    return response;
  } catch (error) {
    console.error("Add to Cart Error:", error);
    throw error;
  }
};

export const updateCartItem = async (dishId, quantity) => {
  try {
    const response = await axiosClient.put("/orders/cart", null, {
      params: {
        dishId: dishId,
        quantity: quantity,
      },
    });
    console.log("Update Cart Response:", response);
    return response;
  } catch (error) {
    console.error("Update Cart Error:", error);
    throw error;
  }
};

export const removeCartItem = async (dishId) => {
  try {
    const response = await axiosClient.delete(`/orders/cart/${dishId}`);
    console.log("Remove Cart Item Response:", response);
    return response;
  } catch (error) {
    console.error("Remove Cart Item Error:", error);
    throw error;
  }
};
