import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Desktop from "./pages/Desktop";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/desktop" element={<Desktop />} />
      </Routes>
    </Router>
  );
}

export default App;
