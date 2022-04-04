import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faBars,
  faSquareCheck,
  faHandshakeAngle,
  faPenToSquare, faRightFromBracket
} from '@fortawesome/free-solid-svg-icons'
import {Fade} from "react-awesome-reveal";

const ToggledSidebar = ({setToggled, toggled, direction}) => {
  const width = window.innerWidth;
  return (
      <>
        <Fade duration={3000} direction={direction}>
          <div className='toggled-sidebar-container'>

            {
              width < 768 ?
                  <>
                    <div className='toggled-menu-item pointer'
                         onClick={() => setToggled(!toggled)}>
                      <FontAwesomeIcon icon={faBars} className='fa-lg'/>
                    </div>
                  </>
                  :
                  <>
                    <div className='toggled-menu-item'
                         onClick={() => setToggled(!toggled)}>
                      <FontAwesomeIcon icon={faBars} className='fa-lg'/>
                    </div>
                    <div className='toggled-menu-item'
                         onClick={() => setToggled(!toggled)}>
                      <FontAwesomeIcon icon={faSquareCheck}
                                       className='fa-lg pr-2'/>
                    </div>
                    <div className='toggled-menu-item'
                         onClick={() => setToggled(!toggled)}>
                      <FontAwesomeIcon icon={faHandshakeAngle}
                                       className='fa-lg pr-2'/>
                    </div>
                    <div className='toggled-menu-item'
                         onClick={() => setToggled(!toggled)}>
                      <FontAwesomeIcon icon={faPenToSquare}
                                       className='fa-lg pr-2'/>
                    </div>
                    <div className='toggled-menu-item'
                         onClick={() => setToggled(!toggled)}>
                      <FontAwesomeIcon icon={faRightFromBracket} className='fa-lg pr-2'/>
                    </div>
                  </>
            }
          </div>
        </Fade>
      </>
  );
};

export default ToggledSidebar;
