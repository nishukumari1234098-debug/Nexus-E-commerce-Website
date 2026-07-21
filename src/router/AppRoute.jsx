import { Routes, Route } from "react-router-dom";

import Login from "../pages/public/Login";
import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";
import Home from "../pages/public/Home";
import ProtectedRoute from "./ProtectedRoute";
import Products from "../pages/public/Products";
import ProductDetails from "../pages/public/ProductDetails";
import Cart from "../pages/public/Cart";
import AdminDashboard from "../pages/admin/Dashboard";
import AdminProducts from "../pages/admin/AdminProducts";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Storefront Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="products" element={<Products />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
      </Route>

      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;