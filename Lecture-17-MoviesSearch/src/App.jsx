
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TvShows from "./Pages/TvShows";
import Trending from "./Pages/Trending";
import TopRated from "./Pages/TopRated";
import Upcoming from "./Pages/Upcoming";
import ApiDocs from "./Pages/ApiDocs";
import Support from "./Pages/Support";
import Blog from "./Pages/Blog";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Terms from "./Pages/Terms";
import Movies from './Componets/Movies';

function App() {
  return (
    <BrowserRouter>
      <Movies />
      <Routes>
        <Route path="/tv" element={<TvShows />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/api-docs" element={<ApiDocs />} />
        <Route path="/support" element={<Support />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
