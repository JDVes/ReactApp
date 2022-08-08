
import { BrowserRouter,  Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import logo from './logo.svg';
import './App.css';
import Home from "./pages/Home";
import Add from './pages/Add';
import View from './pages/View';

function App() {
  return (

    <BrowserRouter>
    <div className="App">
      

    <ToastContainer />

      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/Add' element={<Add />} />
        <Route path='update/:id' element={<Add />} /> 
        <Route path='View/:id' element={<View />} />  

      </Routes>
      
        </div>
     </BrowserRouter>
   
    
  );
  

}

export default App;
