import { Routes, Route } from "react-router-dom";
import User from "./User"
import Add from "./Add"
import Search from "./Search"
import Userlogin from "./Userlogin"
import Usersignup from "./Usersignup"
import Adminlogin from "./Adminlogin"
import PageState from './notes/PageState';



function App() {
  return (
    <>
    <PageState>
      <Routes>
        {/* <Route path='/' element={<Homepage />} /> */}
        <Route path='/' element={<User />} />
        <Route path='/add' element={<Add />} />
        <Route path='/search' element={<Search />} />
        <Route path='/userlogin' element={<Userlogin />} />
        <Route path='/usersignup' element={<Usersignup />} />
        <Route path='/adminlogin' element={<Adminlogin />} />
      </Routes>
    </PageState>
    </>
  );
}

export default App;
