/** @format */

import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const Dashboard = lazy(() => import("./pages/Dashboard"));
function App() {
  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route path="/" element={<Dashboard></Dashboard>}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
