
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Comments from "./components/Comments/Comments";
import Task from "./components/Task/Task";
import Login from "./components/Login/Login";

function App() {
  return (
    <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/task' element={<Task />} />
                <Route path='/comments/:category/:id' element={<Comments />} />
            </Routes>
        </BrowserRouter>
  )
}

export default App;
