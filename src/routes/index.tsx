import { Routes, Route } from "react-router-dom";
import SearchPage from "../pages/SearchPage";
import AnimeDetailsPage from "../pages/AnimeDetailsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/anime/:id" element={<AnimeDetailsPage />} />
    </Routes>
  );
}
