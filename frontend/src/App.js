
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Comments from "./components/Comments/Comments";
import Product from "./components/Product/Product";
import Login from "./components/Login/Login";

function App() {
  return (
    <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/product' element={<Product />} />
                <Route path='/comments/:category/:id' element={<Comments />} />
            </Routes>
        </BrowserRouter>
  )
}

export default App;
