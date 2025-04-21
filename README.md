# Food Delivery App - Frontend

A modern, user-friendly web application for food delivery services. This platform enables customers to browse restaurants, order food online, track deliveries in real-time, and allows restaurant owners to manage their menus and orders efficiently.
om/800x400?text=Food+Delivery+App+Screenshot
![Food Delivery App Screenshot](https://res.cloudinary.com/dyzx3woh4/image/upload/v1745229186/login_rrlf1u.png)

## Features

### For Customers
- **Restaurant Discovery**: Browse and search for restaurants by location, cuisine, or name
- **Menu Browsing**: View detailed restaurant menus with images, descriptions, and prices
- **Order Management**: Place orders, customize items, and track order status in real-time
- **User Profiles**: Save delivery addresses, payment methods, and order history
- **Reviews & Ratings**: Rate restaurants and share experiences

### For Restaurants
- **Menu Management**: Easily add, edit, or remove menu items
- **Order Processing**: Accept orders, update status, and manage delivery times
- **Real-time Dashboard**: View sales statistics, popular items, and customer trends
- **Availability Control**: Mark items as available/unavailable instantly
- **Customer Engagement**: Respond to reviews and offer promotions

## Installation

### Prerequisites
- Node.js (v14.0 or higher)
- npm (v6.0 or higher) or Yarn (v1.22 or higher)
- Git

### Setup Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/food-delivery-app-frontend.git
   cd food-delivery-app-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or with Yarn
   yarn install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   REACT_APP_API_URL=http://your-backend-api-url
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

## Usage

### Development Mode
To run the application in development mode with hot reloading:

```bash
npm run dev
# or with Yarn
yarn dev
```

The application will be available at `http://localhost:3000`.

### Production Build
To create a production-optimized build:

```bash
npm run build
# or with Yarn
yarn build
```

To serve the production build locally:

```bash
npm run start
# or with Yarn
yarn start
```

### Testing
Run the test suite:

```bash
npm run test
# or with Yarn
yarn test
```

## Project Structure

```
food-delivery-app-frontend/
├── public/                   # Static files
├── src/
│   ├── assets/               # Images, fonts, etc.
│   │   ├── common/           # Common components used across the app
│   │   ├── customer/         # Customer-specific components
│   │   └── restaurant/       # Restaurant-specific components
│   ├── customer/             # Customer application modules
│   │   ├── components/       # Customer UI components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── pages/            # Page components
│   │   └── api/              # API service integrations
│   ├── restaurant/           # Restaurant management modules
│   │   ├── components/       # Restaurant UI components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── pages/            # Page components
│   │   └── api/              # API service integrations
│   ├── context/              # React context providers
│   ├── hooks/                # Shared custom hooks
│   ├── utils/                # Utility functions
│   ├── routes/               # Application routes
│   ├── styles/               # Global styles and themes
│   ├── App.js                # Main application component
│   └── index.js              # Application entry point
├── .env                      # Environment variables
├── .eslintrc                 # ESLint configuration
├── .gitignore                # Git ignore file
├── package.json              # Project dependencies and scripts
└── README.md                 # Project documentation
```

## Technology Stack

- **Frontend Framework**: React.js
- **State Management**: React Context API and Hooks
- **Routing**: React Router
- **Styling**: React Bootstrap with custom CSS
- **HTTP Requests**: Axios
- **Maps Integration**: Open Street Maps API
- **Form Handling**: Formik with Yup validation
- **Testing**: Jest and React Testing Library


## 📫 Contact Information/Author

- **Developer**: Vu Huu Duc
- **Email**:vuhuuduc1206@gmail.com
- **GitHub**: https://github.com/vuduc0612
- **LinkedIn**: https://www.linkedin.com/in/vhduc/

---



