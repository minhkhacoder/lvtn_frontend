/** @format */

import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const LoginPage = lazy(() => import("./pages/LoginPage"));
const LayoutDashboard = lazy(() => import("./layouts/LayoutDashboard"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddProduct = lazy(() => import("./modules/products/AddProduct"));
const AllProduct = lazy(() => import("./modules/products/AllProduct"));
const UpdateProduct = lazy(() => import("./modules/products/UpdateProduct"));
const AllOrders = lazy(() => import("./modules/orders/AllOrders"));
const OrderDetail = lazy(() => import("./modules/orders/OrderDetail"));

function App() {
  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route element={<LayoutDashboard></LayoutDashboard>}>
          <Route path="/" element={<Dashboard></Dashboard>}></Route>
          <Route
            path="/add-product"
            element={<AddProduct></AddProduct>}
          ></Route>
          <Route
            path="/all-products"
            element={<AllProduct></AllProduct>}
          ></Route>
          <Route
            path="/update-product/:id"
            element={<UpdateProduct></UpdateProduct>}
          ></Route>
          <Route path="/all-orders" element={<AllOrders></AllOrders>}></Route>
          <Route
            path="/order-detail/:orderId"
            element={<OrderDetail></OrderDetail>}
          ></Route>
        </Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
