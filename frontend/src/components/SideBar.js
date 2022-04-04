import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faSquareCheck,
  faHandshakeAngle,
  faPenToSquare,
  faRightFromBracket,
  faXmark
} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import {Fade} from "react-awesome-reveal";
import linkStyle from "../assets/linkStyle";

const SideBar = ({
  setToggled,
  toggled,
  direction,
  setLoadingTasks,
  loadingTasks
}) => {
  const logoutUser = () => {
    window.localStorage.removeItem('token');
  }

  return (
      <>
        <Fade duration={3000} direction={direction}>
          <div className='sidebar-container'>

            <div className='pointer x-mark' onClick={() => setToggled(!toggled)}>
              <FontAwesomeIcon icon={faXmark}
                               className='fa-lg'/>
            </div>

            <h1 className='sidebar-logo'>ToDo App</h1>

            <div className='menu-item'>
              <FontAwesomeIcon icon={faSquareCheck}
                               className='fa-lg pr-2'/>
              <Link to='/my-tasks'
                    className='px-3'
                    style={linkStyle}
                    onClick={() => setLoadingTasks(!loadingTasks)}
              >My Tasks</Link>
            </div>

            <div className='menu-item'>
              <FontAwesomeIcon icon={faHandshakeAngle}
                               className='fa-sm pr-2'/>
              <Link to='/grab-a-task'
                    className='px-3'
                    style={linkStyle}
                    onClick={() => setLoadingTasks(!loadingTasks)}
              >Grab a Task</Link>
            </div>

            <div className='menu-item'>
              <FontAwesomeIcon icon={faPenToSquare}
                               className='fa-lg pr-2'/>
              <Link to='/add-task'
                    className='px-3'
                    style={linkStyle}>Add Task</Link>
            </div>

            <div className='menu-item'>
              <FontAwesomeIcon icon={faRightFromBracket}
                               className='fa-lg pr-2'/>
              <Link to='/'
                    onClick={logoutUser}
                    className='px-3'
                    style={linkStyle}>Logout</Link>
            </div>

          </div>
        </Fade>
      </>
  );
};

export default SideBar;
