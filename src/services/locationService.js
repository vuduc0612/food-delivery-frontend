// Lấy vị trí hiện tại của người dùng
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Trình duyệt không hỗ trợ định vị'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error('Vui lòng cho phép truy cập vị trí để tiếp tục'));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error('Không thể lấy vị trí của bạn'));
            break;
          case error.TIMEOUT:
            reject(new Error('Hết thời gian chờ lấy vị trí'));
            break;
          default:
            reject(new Error('Có lỗi xảy ra khi lấy vị trí'));
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  });
};

// Lấy địa chỉ từ tọa độ
export const getAddressFromCoords = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=vi`,
      {
        headers: {
          'User-Agent': 'YourAppName - contact@yourdomain.com'
        }
      }
    );

    if (!response.ok) throw new Error('Không thể lấy thông tin địa chỉ');

    const data = await response.json();
    const formattedAddress = formatAddress(data.address);

    return {
      full: data.display_name,
      street: data.address?.road || data.address?.pedestrian || '',
      ward: data.address?.suburb || '',
      district: data.address?.city_district || data.address?.district || '',
      city: data.address?.city || data.address?.state || '',
      formatted: formattedAddress,
      shortAddress: formattedAddress.split(',')[0].trim()
    };
  } catch (error) {
    console.error('Lỗi lấy địa chỉ:', error);
    return {
      full: 'Không xác định',
      street: '',
      ward: '',
      district: '',
      city: '',
      formatted: 'Không xác định',
      shortAddress: 'Không xác định'
    };
  }
};

// Tìm kiếm địa chỉ
export const searchAddresses = async (query) => {
  if (!query || query.length < 3) return [];

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=vn&limit=5&accept-language=vi`,
      {
        headers: {
          'User-Agent': 'YourAppName - contact@yourdomain.com'
        }
      }
    );

    if (!response.ok) throw new Error('Không thể tìm kiếm địa chỉ');

    const data = await response.json();
    return data.map(item => ({
      id: item.place_id,
      displayName: item.display_name,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      type: item.type,
      formatted: item.display_name,
      shortAddress: item.display_name.split(',')[0].trim()
    }));
  } catch (error) {
    console.error('Lỗi tìm kiếm địa chỉ:', error);
    return [];
  }
};

// Format địa chỉ
const formatAddress = (addressData = {}) => {
  const parts = [];

  if (addressData.house_number) parts.push(addressData.house_number);
  if (addressData.road || addressData.pedestrian) parts.push(addressData.road || addressData.pedestrian);
  if (addressData.suburb) parts.push(addressData.suburb);
  if (addressData.city_district || addressData.district) parts.push(addressData.city_district || addressData.district);
  if (addressData.city || addressData.state) parts.push(addressData.city || addressData.state);

  return parts.length > 0 ? parts.join(', ') : 'Không xác định';
};
