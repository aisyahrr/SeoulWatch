import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Layoutpage from "./layout/Layoutpage";

function App() {
  return (
    <div className="bg-black min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layoutpage />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/detail/:type/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
