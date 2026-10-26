import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Gallery from "./pages/Gallery";
import PieceDetail from "./pages/PieceDetail";
import Present from "./pages/Present";
import NotFound from "./pages/NotFound";
import WorkOrder from "./pages/WorkOrder";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Gallery />} />
        <Route path="piece/:slug" element={<PieceDetail />} />
        <Route path="work-orders" element={<WorkOrder />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      {/* Presentation mode is full-screen, so it sits outside the layout */}
      <Route path="present" element={<Present />} />
    </Routes>
  );
}
