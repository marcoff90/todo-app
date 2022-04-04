import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignUp from "./layouts/SignUp";
import Home from "./layouts/Home";
import Tasks from "./layouts/Tasks";
import Login from "./components/Login";
import GrabTask from "./layouts/GrabTask";
import AddTask from "./layouts/AddTask";

const App = () => {

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/my-tasks' element={<Tasks/>}/>
          <Route path='/grab-a-task' element={<GrabTask/>}/>
          <Route path='/add-task' element={<AddTask/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
