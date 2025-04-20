# Cấu trúc thư mục Food Delivery App

src/
├── shared/                    # Các thành phần dùng chung cho cả customer và restaurant
│   ├── components/            # UI components dùng chung
│   │   └── common/            # Các component UI cơ bản (Button, Card, etc.)
│   ├── contexts/              # Contexts dùng chung (nếu có)
│   ├── hooks/                 # Custom hooks dùng chung
│   └── utils/                 # Utility functions dùng chung
├── customer/                  # Ứng dụng phía khách hàng
│   ├── api/
│   │   ├── clients/
│   │   │   └── axiosClient.js # API client cho khách hàng
│   │   └── services/          # Các service API cho khách hàng
│   ├── components/
│   │   ├── auth/              # Components xác thực khách hàng
│   │   ├── cart/              # Components giỏ hàng
│   │   ├── checkout/          # Components thanh toán
│   │   ├── layout/            # Components layout (Header, Footer)
│   │   ├── location/          # Components liên quan đến địa điểm
│   │   ├── orders/            # Components đơn hàng của khách
│   │   ├── profile/           # Components hồ sơ khách hàng
│   │   └── restaurants/       # Components hiển thị danh sách và chi tiết nhà hàng
│   ├── contexts/              # Contexts cho khách hàng
│   │   ├── AuthContext.jsx    # Context xác thực khách hàng
│   │   ├── CartContext.jsx    # Context giỏ hàng
│   │   ├── OrderContext.jsx   # Context đơn hàng
│   │   └── LocationContext.jsx # Context vị trí
│   └── hooks/                 # Custom hooks cho khách hàng
│       ├── useAuth.js         # Hook xác thực
│       ├── useCart.js         # Hook giỏ hàng
│       ├── useOrder.js        # Hook đơn hàng
│       └── useLocation.js     # Hook vị trí
├── restaurant/                # Ứng dụng phía nhà hàng
│   ├── api/
│   │   ├── clients/
│   │   │   └── restaurantAxiosClient.js # API client cho nhà hàng
│   │   └── services/          # Các service API cho nhà hàng
│   ├── components/
│   │   ├── auth/              # Components xác thực nhà hàng
│   │   ├── dashboard/         # Components trang tổng quan
│   │   ├── layout/            # Components layout (Sidebar, Header)
│   │   ├── menu/              # Components quản lý menu
│   │   ├── orders/            # Components quản lý đơn hàng
│   │   └── profile/           # Components hồ sơ nhà hàng
│   ├── contexts/              # Contexts cho nhà hàng
│   │   └── RestaurantAuthContext.jsx # Context xác thực nhà hàng
│   └── hooks/                 # Custom hooks cho nhà hàng
│       ├── useRestaurantAuth.js # Hook xác thực nhà hàng
│       └── useRestaurantOrders.js # Hook quản lý đơn hàng
├── assets/                    # Tài nguyên dùng chung (hình ảnh, fonts, etc.)
├── config/                    # Cấu hình ứng dụng
├── App.jsx                    # Component chính với routing
├── index.css                  # Global styles
├── main.jsx                   # Entry point
└── routes.jsx                 # Định tuyến tập trung