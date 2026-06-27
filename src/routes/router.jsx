import { createBrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Route guards
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import SellerRoute from "./SellerRoute";

// Public pages
import Home from "../pages/Home/Home";
import AllProducts from "../pages/Products/AllProducts";
import ProductDetails from "../pages/Products/ProductDetails";
import Categories from "../pages/Products/Categories";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import NotFound from "../pages/NotFound";

// Dashboard — Buyer
import BuyerOverview from "../pages/Dashboard/Buyer/BuyerOverview";
import MyOrders from "../pages/Dashboard/Buyer/MyOrders";
import Wishlist from "../pages/Dashboard/Buyer/Wishlist";
import PaymentHistory from "../pages/Dashboard/Buyer/PaymentHistory";
import BuyerProfile from "../pages/Dashboard/Buyer/BuyerProfile";

// Dashboard — Seller
import SellerOverview from "../pages/Dashboard/Seller/SellerOverview";
import AddProduct from "../pages/Dashboard/Seller/AddProduct";
import MyProducts from "../pages/Dashboard/Seller/MyProducts";
import ManageOrders from "../pages/Dashboard/Seller/ManageOrders";
import SalesAnalytics from "../pages/Dashboard/Seller/SalesAnalytics";

// Dashboard — Admin
import AdminOverview from "../pages/Dashboard/Admin/AdminOverview";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageProducts from "../pages/Dashboard/Admin/ManageProducts";
import AdminOrders from "../pages/Dashboard/Admin/AdminOrders";
import PlatformAnalytics from "../pages/Dashboard/Admin/PlatformAnalytics";

// Payment
import Checkout from "../pages/Payment/Checkout";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <AllProducts /> },
      { path: "products/:id", element: <ProductDetails /> },
      { path: "categories", element: <Categories /> },
      { path: "about", element: <AboutUs /> },
      { path: "contact", element: <ContactUs /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "checkout/:productId",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // Buyer
      { index: true, element: <BuyerOverview /> },
      { path: "my-orders", element: <MyOrders /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "payment-history", element: <PaymentHistory /> },
      { path: "profile", element: <BuyerProfile /> },

      // Seller
      {
        path: "seller-overview",
        element: (
          <SellerRoute>
            <SellerOverview />
          </SellerRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <SellerRoute>
            <AddProduct />
          </SellerRoute>
        ),
      },
      {
        path: "my-products",
        element: (
          <SellerRoute>
            <MyProducts />
          </SellerRoute>
        ),
      },
      {
        path: "manage-orders",
        element: (
          <SellerRoute>
            <ManageOrders />
          </SellerRoute>
        ),
      },
      {
        path: "sales-analytics",
        element: (
          <SellerRoute>
            <SalesAnalytics />
          </SellerRoute>
        ),
      },

      // Admin
      {
        path: "admin-overview",
        element: (
          <AdminRoute>
            <AdminOverview />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-products",
        element: (
          <AdminRoute>
            <ManageProducts />
          </AdminRoute>
        ),
      },
      {
        path: "admin-orders",
        element: (
          <AdminRoute>
            <AdminOrders />
          </AdminRoute>
        ),
      },
      {
        path: "platform-analytics",
        element: (
          <AdminRoute>
            <PlatformAnalytics />
          </AdminRoute>
        ),
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
