import { createContext, useContext, useState } from 'react';

const LocationContext = createContext();
const LOCATION_STORAGE_KEY = 'delivery_location';

export const useLocation = () => {
    const context = useContext(LocationContext);
    if (!context) throw new Error('useLocation phải dùng trong LocationProvider');
    return context;
};

export const LocationProvider = ({ children }) => {
    const [selectedLocation, setSelectedLocation] = useState(() => {
        const saved = localStorage.getItem(LOCATION_STORAGE_KEY);
        return saved ? JSON.parse(saved) : {
            address: 'Chọn địa chỉ giao hàng',
            shortAddress: '',
            fullAddress: '',
            coordinates: null
        };
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [onChangeCallback, setOnChangeCallback] = useState(null);
    const [onDeliveryFeeRecalculate, setOnDeliveryFeeRecalculate] = useState(null);

    const updateLocation = (location) => {
        try {
            setLoading(true);
            setError(null);

            const formatted = {
                address: location.formatted || location.address,
                shortAddress: location.shortAddress || location.street || (location.formatted ? location.formatted.split(',')[0].trim() : ''),
                fullAddress: location.displayName || location.full || location.formatted || location.address,
                coordinates: {
                    lat: parseFloat(location.lat || location.coordinates?.lat),
                    lng: parseFloat(location.lon || location.coordinates?.lng)
                }
            };

            setSelectedLocation(formatted);
            localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(formatted));

            if (onChangeCallback) onChangeCallback(formatted);
            if (onDeliveryFeeRecalculate) onDeliveryFeeRecalculate(formatted);
        } catch (err) {
            setError('Không thể cập nhật vị trí');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const clearLocation = () => {
        localStorage.removeItem(LOCATION_STORAGE_KEY);
        setSelectedLocation({
            address: 'Chọn địa chỉ giao hàng',
            shortAddress: '',
            fullAddress: '',
            coordinates: null
        });
    };

    return (
        <LocationContext.Provider value={{
            selectedLocation,
            updateLocation,
            clearLocation,
            loading,
            error,
            setOnChangeCallback,
            setOnDeliveryFeeRecalculate
        }}>
            {children}
        </LocationContext.Provider>
    );
};
