/** @format */

import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const Login = lazy(() => import("./pages/Login"));
const LayoutDashboard = lazy(() => import("./layouts/LayoutDashboard"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddProduct = lazy(() => import("./modules/products/AddProduct"));

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
        </Route>
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
