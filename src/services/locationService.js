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

export const getAddressFromCoords = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=vi`
    );
    
    if (!response.ok) {
      throw new Error('Không thể lấy thông tin địa chỉ');
    }

    const data = await response.json();
    
    // Format địa chỉ theo cấu trúc mong muốn
    const address = {
      full: data.display_name,
      street: data.address.road || data.address.pedestrian || '',
      ward: data.address.suburb || '',
      district: data.address.city_district || data.address.district || '',
      city: data.address.city || data.address.state || '',
      formatted: formatAddress(data.address)
    };

    return address;
  } catch (error) {
    throw new Error('Không thể lấy thông tin địa chỉ');
  }
};

// Hàm format địa chỉ theo cấu trúc Việt Nam
const formatAddress = (addressData) => {
  const parts = [];

  if (addressData.house_number) {
    parts.push(addressData.house_number);
  }

  if (addressData.road || addressData.pedestrian) {
    parts.push(addressData.road || addressData.pedestrian);
  }

  if (addressData.suburb) {
    parts.push(addressData.suburb);
  }

  if (addressData.city_district || addressData.district) {
    parts.push(addressData.city_district || addressData.district);
  }

  if (addressData.city || addressData.state) {
    parts.push(addressData.city || addressData.state);
  }

  return parts.join(', ');
}; 