import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layoutpage from "./layout/Layoutpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layoutpage />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
