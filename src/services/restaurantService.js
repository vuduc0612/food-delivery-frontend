import { API_URL } from '../config';

export const fetchRestaurantById = async (id) => {
  const res = await fetch(`${API_URL}/restaurants/${id}`);
  if (!res.ok) {
    throw new Error('Không tìm thấy nhà hàng');
  }
  const data = await res.json();
  return data.data;
};

export const fetchRestaurants = async () => {
  const res = await fetch(`${API_URL}/restaurants`);
  if (!res.ok) {
    throw new Error('Không thể tải danh sách nhà hàng');
  }
  const data = await res.json();
  return data.data;
};  
