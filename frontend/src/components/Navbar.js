import {useState} from "react";
import ToggledSidebar from "./ToggledSidebar";
import SideBar from "./SideBar";

const Navbar = ({setLoadingTasks, loadingTasks}) => {
  const [toggled, setToggled] = useState(false);
  let width = window.innerWidth;
  let direction = width < 768 ? 'down' : 'left';

  return (
      <>
        {
          toggled ? <ToggledSidebar setToggled={setToggled}
                                    toggled={toggled}
                                    direction={direction}/>
              :
              <SideBar setToggled={setToggled}
                       toggled={toggled}
                       direction={direction}
                       setLoadingTasks={setLoadingTasks}
                       loadingTasks={loadingTasks}/>
        }
      </>
  );
};

export default Navbar;
