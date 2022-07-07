import Register from "./pages/register";
import Login from "./pages/login";
import MovieList from "./pages/movielist";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" index element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="movielist" element={<MovieList />} />
      </Routes>
    </div>
  );
}

export default App;
