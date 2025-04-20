import axiosClient from "../clients/axiosClient";
import { API_URL } from "../../../config";
export const getCart = async () => {
  try {
    const response = await axiosClient.get("/carts");
    //console.log("Cart API Response:", response);
    return response.data;
  } catch (error) {
    console.error("Get Cart Error:", error);
    throw error;
  }
};

export const getCart1 = async (token) => {
  const response = await fetch(`${API_URL}/carts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  // console.log("Cart API Response:", data);
  return data.data;
};

export const addToCart = async (dishId, quantity = 1, force = false) => {
  try {
    //console.log("Dish ID:", dishId, "Quantity:", quantity);
    const response = await axiosClient.post("/carts", {
      dishId: dishId,
      quantity: quantity,
      force: force,
    });
    //console.log("Add to Cart Response:", response);
    return response.data;
  } catch (error) {
    console.error("Add to Cart Error:", error);
    throw error;
  }
};

export const updateCartItem = async (dishId, quantity) => {
  try {
    const response = await axiosClient.patch(
      `/carts/dish/${dishId}`, {
        quantity: quantity
      }
    );
    //console.log("Update Cart Response:", response);
    return response.data;
  } catch (error) {
    console.error("Update Cart Error:", error);
    throw error;
  }
};

export const removeCartItem = async (dishId) => {
  try {
    const response = await axiosClient.delete(`/carts/dish/${dishId}`);
    //console.log("Remove Cart Item Response:", response);
    return response.data;
  } catch (error) {
    console.error("Remove Cart Item Error:", error);
    throw error;
  }
};
