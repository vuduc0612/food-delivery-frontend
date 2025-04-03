import { API_URL } from "../config";
import axiosClient from "./axiosClient";
export const fetchRestaurantById = async (id) => {
  try {
    const response = await axiosClient.get(`/restaurants/${id}`);
    //console.log("Restaurants API Response:", response.data);
    return response;
  } catch (error) {
    console.error("Get Restaurants Error:", error);
    throw error;
  }
};

export const fetchRestaurants = async () => {
  try {
    const response = await axiosClient.get("/restaurants");
    //console.log("Restaurants API Response:", response.data);
    return response;
  } catch (error) {
    console.error("Get Restaurants Error:", error);
    throw error;
  }
};
